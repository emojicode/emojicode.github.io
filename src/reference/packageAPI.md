# Appendix II: Package API

The package API allows to write a package whose logic can be implemented (partly
if needed) in C. This allows you to expand Emojicode’s capabilities, like
accessing special system APIs.

>!H Make sure that you have read [Packages](packages.html) and understand how
>!H packages work.

The C API is specific to the Real-Time Engine. APIs of other Emojicode Engines
may be different.

## Native Binaries

Native binaries are static libraries, which are always suffixed `.so`, and are
placed alongside the package’s `header.emojic` in its directory. If the cat
simulator from previous examples used a native binary, the Package Search Path
would look something like:

```
...
├── cat-simulator -> /usr/local/EmojicodePackages/cat-simulator-v0
└── cat-simulator-v0
    ├── cat-simulator.so
    └── header.emojic
```

## Run-Time Native Linking

When starting up and loading a program, the Real-Time Engine dynamically loads
the static library and basically links all native methods of your package with
the corresponding native methods, class methods and initializers. The Real-Time
Engine does this by asking you to provide a C function for each procedure which
you declared is implemented natively. It’s noteworthy, however, that
optimizations might cause that not all methods are compiled into the final
program and therefore not all native methods your package provides will ever be
requested.

We call this procedure *Run-Time Native Linking*.

As long as you carefully follow semantic versioning – you must do this –, this
architecture allows you to incrementally improve your package and allows the
user to install minor updates while no program relying on an older version of
your package will ever break. Major versions can exist alongside.

## Minimal Setup

You’ll want to your package binary of by creating a single source file. The name
doesn’t really matter, but it has become a habit to name it after you package.
The file in this example will be named `crypto.c` as the package is named
`crypto` as well.

To get started the API header of the latest Emojicode version is required.

	#include "EmojicodeAPI.h"

This header defines Emojicode’s public interfaces you will use. It also
includes relevant C standard libraries like `stdlib.h`, `stdio.h`, `stdbool.h`,
`stdint.h` and `stddef.h`.

If you need to work with Strings and Lists you must also include
`EmojicodeString.h` and `EmojicodeList.h` respectively. Working with data
structures can prove to be difficult, though.

### Implementing all provider functions

There are a bunch of functions you must implement or the Real-Time Engine
will ultimately crash when loading your package. These are the functions which
are used to get the handles to the C implementations of the procedures declared
as native, but also a few others.

```
#include "EmojicodeAPI.h"

PackageVersion getVersion() {
    // Return the version of the package
    return (PackageVersion){0, 1};
}

ClassMethodHandler handlerPointerForClassMethod(EmojicodeChar className, EmojicodeChar methodName) {
    // Return a function pointer to the corresponding class method
    return NULL;
}

MethodHandler handlerPointerForMethod(EmojicodeChar className, EmojicodeChar methodName) {
    // Return a function pointer to the corresponding method
    return NULL;
}

InitializerHandler handlerPointerForInitializer(EmojicodeChar className, EmojicodeChar initializerName) {
    // Return a function pointer to the corresponding initializer
    return NULL;
}

// Discussed later on, but important

Marker markerPointerForClass(EmojicodeChar class) {
    return NULL;
}

uint_fast32_t sizeForClass(Class *class, EmojicodeChar name) {
    return 0;
}

Deinitializer deinitializerPointerForClass(EmojicodeChar className) {
    return NULL;
}
```

The purpose of `getVersion` should be pretty clear: Return the version of the
package. The Real-Time Engine uses this to verify everything matches.
`handlerPointerForClassMethod`, `handlerPointerForMethod` and
`handlerPointerForInitializer` are called to get the handles as discussed
earlier. Returning `NULL` should actually never happen, by the way. We’ll
analyze how such a handler looks and what it does exactly in a moment.
`markerPointerForClass`, `sizeForClass` and `deinitializerPointerForClass` are
important too but we’ll discuss them a bit later.

These functions are called *provider functions*.

## Implementing a handler function

We want to implement a handler function for our `crypto` package whose header
looks like this:

```
🌍 🐇 📯 🍇
  🌮 Returns the SHA256 hash for the given chunk of data. 🌮
  🐇🐖 📯 data 📇 ➡️ 📇 📻
🍉
```

We now implement a function to achieve this:

```
Something cryptoSHA256(Thread *thread) {
    Object *output = newArray(SHA256_DIGEST_LENGTH);  // 1.
    Data *data = stackGetVariable(0, thread).object->value;  // 2.

    SHA256_CTX sha256;  // 3. OpenSSL API
    SHA256_Init(&sha256);
    SHA256_Update(&sha256, data->bytes, data->length);
    SHA256_Final(output->value, &sha256);

    stackSetVariable(0, somethingObject(output), thread);  // 4.

    Object *obj = newObject(CL_DATA);  // 5.
    Data *outData = obj->value;  // 6.
    outData->length = SHA256_DIGEST_LENGTH;
    outData->bytesObject = stackGetVariable(0, thread).object;
    outData->bytes = outData->bytesObject->value;
    return somethingObject(obj);  // 7.
}
```

Let’s walk through this function.

1. First an *array* which can hold the hash is
  allocated. It’s very important to differentiate arrays and lists. Arrays are
  only accessible from C and are never exposed through any Emojicode API. Do not
  store arrays into any other data structure and do not pass arrays into any
  functions. Lists are the general purpose sequential data structure that is
  accessible from Emojicode and are of course implemented using arrays.

  Arrays are often used in C code because they are cheaper then lists and can be
used with any C API as they are just a continuous space in memory.

  Newly allocated arrays are guaranteed to be completed zeroed.

2. The stack is accessed and the variable at index 0 is retrieved. The stack in
  Emojicode stores the variables of a procedure call and therefore also the
  arguments passed to your procedure. The arguments are begin at index 0.

  The stack stores, as most data structures, `Something`s. Something is either
  a primitive value (boolean, integer, double) or an object reference. Something
  also stores the type of the value.

  As 📇 is an object we access the `object` field of the Something representing
  the first argument and then access the value field. To understand this step
  we need to take a closer look at objects.

  Objects can have, apart from their instance variables etc., a `value` field
  which has a specific size. This is also what the provider function
  `sizeForClass` is good for. This function specifies the size of the value
  field for the class. The value field can then be populated with whatever
  needed or casted to a specific type whenever needed. This is also what
  happens here. We access the data field of the object, which has is (has the
  size) of a `Data` struct.

3. The OpenSSL API is used to calculate the SHA256 digest. The output is
  directly stored into the value field of the `output` array, which is as large
  as specified when creating the array.

4. We need to store the output in the stack because we’re going to perform
  another allocation. The exact reason for this is discussed in Clashing with
  the Garbage Collector

5. We allocate a new data object. At this point it’s really important to note
  that allocation is *not* initialization. `newObject` just allocates memory
  and attaches a class. Some classes, however, require that their instances
  are initialized. You can find information about whether a class needs
  initialization in the corresponding header files. Emojicode objects tend to be
  designed in a way so that they don’t need initialization.

6. The value field of the data object is casted to `Data` and appropriate fields
  are set.

7. A procedure must always return `Something`. Therefore the data object is
  wrapped an returned.

(SHA256 could of course be implemented in Emojicode, but it’s better to rely
on well-tested libraries like OpenSSL in cryptography.)

Finally, the `handlerPointerForClassMethod` function should return the function
when the handler for 📯 is requested:

```
ClassMethodHandler handlerPointerForClassMethod(EmojicodeChar className, EmojicodeChar methodName) {
    switch (className) {
        case 0x1f4ef: //📯
            return cryptoSHA256;
    }
    return NULL;
}
```

## Clashing with the Garbage Collector

One thing that is really important when creating a package binary is to take
of the Garbage Collector. While we all love the Garbage Collector, it may
become your enemy when creating a package binary. Read on to learn why.

### Invocation and Functioning

The Garbage Collector in Emojicode can be invoked when
performing any of these actions:

- Allocating memory
- Calling a callable or method
- special functions perform some of the actions above; refer to the
  documentation in the header files

The Garbage Collector will invalidate any object to which it cannot find a
reference. It is only capable of searching the stack (where all Emojicode
variables live). If you kept a reference to an object in a C variable, you could
not be sure whether the reference is still valid after an allocation, since the
allocation could have caused a Garbage Collection cycle. Using an invalid
reference is evidently undefined behavior and can lead to very strange behavior.
Hence you should put all object references you need later on into the stack
before performing any operation that could invoke the Garbage Collector. You
then of course need to retrieve that object reference from the stack after the
operation is finished, as the reference could have been updated. To recap:

1. Store all object references of objects you need in the stack.
2. Perform the Garbage Collector invoking operation(s).
3. Retrieve the probably new object references from the stack.

>!H The Garbage Collector works in a special way: It copies all referenced,
>!H still required objects into a new space in memory. The “original” objects
>!H stay untouched. (They are overwritten in the next cycle.) This can lead to
>!H very hard-to-track-down bugs if you are accidentally using a reference to
>!H the “original” but now invalidated object. Watch out for the Garbage
>!H Collector!

### The Stack

In order to do this properly a deeper knowledge of the stack is absolutely
required.

The stack in Emojicode is a stack of *stack frames*. A stack frame has a field
representing the context of a method or initializer and up to 256 *variable
slots*.

When a native procedure is called, a stack frame which has as many variable
slots as arguments expected is reserved. The arguments are then placed in
order of occurrence in the variable slots, starting at index 0.

If you no longer need an argument, you can use its slot just as you like, for
instance to store an object reference before performing a GC-invoking operation.
(Like we did in the example above at 4.) Nonetheless, you’ll often need
additional slots. In this case you can *push* a new stack frame:

```
void stackPush(void *this, uint8_t variableCount, uint8_t argCount, Thread *thread);
void stackPop(Thread *thread);
```

If you use `stackPush` you can also use the `this` to store an object reference.
As the `this` field doesn’t count towards the variable count, a call to
`stackPush` like this would be completely fine:

```
Object *bytesObject = newArray(length);  // To provide a bit of context
stackPush(bytesObject, 0, 0, thread);
```

To get the `this` value you can use `Object* stackGetThis(Thread *);`, which
automatically casts the value to an object pointer.

If you for whatever reason don’t use the `this` field you can also store a
`NULL` pointer. (The Garbage Collector is capable of detecting whether a `this`
value is an object reference or something different.) Make sure to provide 0
to `argCount` and an appropriate value to `variableCount`. You can then set
and get the variables of the current stack frame with `stackGetVariable` and
`stackSetVariable` as seen before.

It goes without saying that the stack must be kept balanced, so before returning
from the function handler make sure that you have popped all stack frames you
previously have pushed.

### Garbage Collection and Threading

Garbage Collection in an multi-threaded environment like Emojicode requires
further care. The Garbage Collector can only run while all threads are paused
(“stop the world”). While this will not affect your code most of times, you
should actually think about this when you implement time consuming activities.
Unlike with Emojicode procedures, the Real-Time Engine has not much control
about your code and so it’s your task to ensure that your procedures do
not block Garbage Collector cycles. If your procedure takes exceptionally long,
you should consider using:

```
void allowGC();
void disallowGCAndPauseIfNeeded();
```

By calling `allowGC` you allow the Garbage Collector to run at any time while
you are doing work. After the handler is finished with its work, it’s absolutely
necessary to call `disallowGCAndPauseIfNeeded`.

>!N Between a call to `allowGC` and `disallowGCAndPauseIfNeeded` you must
>!H not perform any allocations or other kind of GC-invoking operations and you
>!H or any called function may not call `allowGC` again.

If you now wonder what “exceptionally long” is, I must admit, that this is
difficult to say. Anything above 100ms could be considered exceptionally long
as it is already human noticeable. Of course one cannot say for sure, how fast
a given piece of code will execute on another machine, but you get the point.

For completeness also `void pauseForGC(pthread_mutex_t *mutex);` should be
mentioned, which you should rather not use. It’s exactly the function that
is called between execution of different Emojicode instructions to determine
whether a Garbage Collector pause was requested. Please see the header files
for further information.

## Something

As mentioned earlier Something is either a primitive value (boolean, integer,
double) or an object reference and keeps track of the primitive type of the
value.

To wrap something into a `Something` you should rely on the appropriate macros:

```
somethingObject(o)
somethingInteger(o)
somethingSymbol(o)
somethingBoolean(o)
somethingDouble(o)
EMOJICODE_TRUE
EMOJICODE_FALSE
NOTHINGNESS
```

You should unwrap `Something` with these macros:

```
unwrapInteger(o)
unwrapBool(o)
unwrapSymbol(o)
unwrapDouble(o)
```

>!H *Unwrapping* is simply retrieving the value from the `Something` wrapper.
>!H You must make sure that you only unwrap an integer if the `Something` wraps
>!H an integer and so on.

To get the object reference from a `Something` access the `object` field
directly.

To determine whether a `Something` represents Nothingness use:

```
bool isNothingness(Something sth);
```

## Backing a class

We have yet discussed a class method, but we haven’t yet implemented a class
that is backed by some C data structure and that needs initialization.

The class we’ll implement a class that looks like this:

```
🌮 An SHA256 hash 🌮
🌍 🐇 📯 🍇
  🌮 The default initializer to get a 📯 instance. 🌮
  🐈 🆕 📻
  🌮 Appends the given chunk of data to the hash. 🌮
  🐖 📇 data 📻
  🌮 Returns the hash. 🌮
  🐖 📩 ➡️ 📇 📻
  🌮 Returns the SHA256 hash for the given chunk of data. 🌮
  🐇🐖 📯 data 📇 ➡️ 📇 📻
🍉
```

First of all, `sizeForClass` must return the size of the value that is stored by
the object. We’ll return the size of `SHA256_CTX` here for our posthorn class:

```
uint_fast32_t sizeForClass(Class *class, EmojicodeChar name) {
    switch (name) {
        case 0x1f4ef: //📯
            return sizeof(SHA256_CTX);
    }
    return 0;
}
```

Whenever a 📯 instance is now allocated, a value area will be reserved capable
of represesnting `SHA256_CTX`. Of course, we need to also implement our
intializer:

```
void cryptoSHA256Initalizer(Thread *thread) {
    SHA256_CTX *sha26 = stackGetThis(thread)->value;
    SHA256_Init(sha26);
}
```

An initialzer handler is slightly different from a method handler as it returns
nothing. If you want a Nothingness initializer to return Nothingness, you can
set the value field of the this object to `NULL`, like so:
`stackGetThis(thread)->value = NULL;`. This is the only case in which you may
assign the `value` field.

Our intializer above does nothing special. It casts the pointer to the value
field to a `SHA256_CTX` pointer and calls `SHA256_Init`.

Now the implementations for the methods 📇 and 📩 follow:

```
Something cryptoSHA256Append(Thread *thread) {
    SHA256_CTX *sha256 = stackGetThis(thread)->value;
    Data *data = stackGetVariable(0, thread).object->value;
    SHA256_Update(sha256, data->bytes, data->length);
    return NOTHINGNESS;
}

Something cryptoSHA256Final(Thread *thread) {
    SHA256_CTX *sha256 = stackGetThis(thread)->value;

    Object *output = newArray(SHA256_DIGEST_LENGTH);
    SHA256_Final(output->value, sha256);

    stackPush(output, 0, 0, thread);  // 1.
    Object *obj = newObject(CL_DATA);
    Data *outData = obj->value;
    outData->length = SHA256_DIGEST_LENGTH;
    outData->bytesObject = stackGetThis(thread);  // 2.
    outData->bytes = outData->bytesObject->value;
    stackPop(thread);  // 3.

    return outData;
}
```

There’s nothing special going on in `cryptoSHA256Append`, but there are a few
things in `cryptoSHA256Final` to be discussed:

1. As you already know from *Clashing with the Garbage Collector* we need to
  store the `output` array in the stack before allocating another object.
2. Remeber that we have pushed a stack frame in which the `output` array is the
  this object. We retrieve it here and put it into the `bytesObject` field.
3. Last but not least: The stack frame which was previously pushed is now
  popped.

Finally, let’s return these handlers:

```
MethodHandler handlerPointerForMethod(EmojicodeChar className, EmojicodeChar methodName) {
    switch (className) {
        case 0x1f4ef: //📯
            switch (methodName) {
                case 0x1f4c7: //📇
                    return cryptoSHA256Append;
                case 0x1f4e9: //📩
                    return cryptoSHA256Final;
            }
    }
    return NULL;
}

InitializerHandler handlerPointerForInitializer(EmojicodeChar className, EmojicodeChar initializerName) {
    switch (className) {
        case 0x1f4ef: //📯
            return cryptoSHA256Initalizer;
    }
    return NULL;
}
```

## Compiling The Package

>!H This step will be drastically simplified as we’re developing a package
>!H manager. Until it is finished you need to take care of compiling yourself,
>!H however.

To compile a package this should be a good starting point. `-undefined
dynamic_lookup` is Mac OS X only, remove it for any other OS.

```
gcc -O3 -iquote . -std=c11 -Wno-unused-result -fPIC -c crypto.c -o crypto.o
gcc -shared -fPIC -undefined dynamic_lookup crypto.o -o crypto.so
```

## Deinitialization

There are two provider functions we haven’t yet discussed: `markerPointerForClass`
and `deinitializerPointerForClass`.

If you return a deinitializer handler from `deinitializerPointerForClass` for a
class it will be called before an instance from the given class is abandoned and
invalidated, thus no longer accessible.

## Marking

`markerPointerForClass` is also important. If you store an object reference
within the value data structure, you obviously need to tell the garbage
collector about it. You do this by returning a *marker* for your class.

>!N It’s important that you write a proper marker function when your class
>!N stores references to objects in its value area.

The marker is a function that is called by the garbage collector when it
inspects an object and copies it into a new location in memory. This function
must inform the garbage collector of any object references kept within the
object currently marked, which is passed to marker function.

For every object reference you need to call `mark` and pass a reference **to the
field which contains the object reference**. This is really important because
the `mark` function actually changes the value of the field to which your
references points.

Below you can see part of the list’s marking function:

```
void listMark(Object *self){
    List *list = self->value;
    if (list->items) {
        mark(&list->items);
    }
    // ...
}
```

As `list->items` is an object reference, a pointer to this field is passed to
`mark` which updates this field to point to the new object (and some other
garbage collector related stuff).
