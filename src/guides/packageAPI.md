# The Package API

The package API allows to write a package whose logic can be implemented (partly
if needed) in C++. This allows you to expand Emojicode’s capabilities, like
accessing special system APIs.

>!H Make sure that you have read [Packages](../reference/packages.html) and
>!H understand how packages work.

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
the corresponding native methods, class methods and initializers.

Your package must provide a so-called linking table. The linking table is simply
a long list of functions. The Real-Time Engine then links these functions by
looking up an index provided with 📻 at a method declaration. You'll learn more
about this in a minute. Note, however, that not all methods might be linked at
all due to optimiziations.

We call this procedure *Run-Time Native Linking*.

As long as you carefully follow semantic versioning – you must do this –, this
architecture allows you to incrementally improve your package and allows the
user to install minor updates while no program relying on an older version of
your package will ever break. Major versions can exist alongside.

## Minimal Setup

To get started import the API header of the latest Emojicode version:

	#include "EmojicodeReal-TimeEngine/EmojicodeAPI.hpp"

This header defines some of the interfaces you will use. For specific tasks,
however, you’ll have to include additional headers.

### Version, Linking Table, Class Preparation

Your package must provide the following symbols:

```
Emojicode::PackageVersion version(0, 1);

LinkingTable {

};

extern "C" void prepareClass(Emojicode::Class *klass, EmojicodeChar name) {

}
```

The purpose of `version` should be pretty obvious: It represents the version of
the package. The Real-Time Engine uses this value for verification.

`LinkingTable` is actually a macro that expands to an array definition. You’re
going to list C++ functions that will be the function bodies of methods or
initializers available from Emojicode in this array.

`prepareClass` is a function that is called for every class defined in your
package. This is the place where you have to setup the class and this is also
your change to store the class pointer somewhere for later use (e.g. allocating
an object of a class).

## Implementing a handler function

<s>
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
#include <openssl/sha.h>

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
  used with C APIs as they are just a continuous space in memory.

  Newly allocated arrays are guaranteed to be completely zeroed.

2. The stack is accessed and the variable at index 0 is retrieved. The stack in
  Emojicode stores the variables of a procedure call and therefore also the
  arguments passed to your procedure. The arguments are begin at index 0.

  The stack stores, as most data structures, `Something`s. Something is either
  the value of a value type or an object reference. Something also stores the
  type of the value.

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
FunctionFunctionPointer handlerPointerForMethod(EmojicodeChar cl, EmojicodeChar symbol, MethodType t) {
    switch (cl) {
        case 0x1f4ef: //📯
            return cryptoSHA256;
    }
    return NULL;
}
```

We haven’t yet discussed the `handlerPointerForMethod` provider function in
detail. For instance, it should be mentioned that the third argument indicates
whether the requested method is a type or an instance method. We haven’t used
this value above as our package provides a single method at the moment and there
was no need to check whether that’s a type method. Otherwise we should have
compared `t` against `INSTANCE_METHOD` and `TYPE_METHOD` and used `symbol`,
which is the name of the method, to find the correct method.

</s>

## Clashing with the Garbage Collector

One thing that is really important when creating a package binary is to take
of the Garbage Collector. While we all love the Garbage Collector, it may
become your enemy when creating a package binary. Read on to learn why.

### Invocation and Functioning

The Garbage Collector in Emojicode can be invoked when performing any of these
actions, which we call *Garbage Collector Invoking Action*:

- Allocating memory
- Calling a callable or method
- any other function that performs any of the actions above; refer to the
  documentation in the header files

The Garbage Collector will invalidate any object to which it cannot find a
reference. The Garbage Collector is, of course, not capable of detecting any
reference to objects you held in C++ variables. Hence you must store all object
references at a safe place before performing a GCIA.

### Retaining Objects


>!H The Garbage Collector works in a special way: It copies all referenced,
>!H still required objects into a new space in memory. The “original” objects
>!H stay untouched. (They are overwritten in the next cycle.) This can lead to
>!H very hard-to-track-down bugs if you are accidentally using a reference to
>!H the “original” but now invalidated object. Watch out for the Garbage
>!H Collector!

### Garbage Collection and Threading

Garbage Collection in an multi-threaded environment like Emojicode requires
further care. The Garbage Collector can only run while all threads are paused
(“stop the world”). While this will not affect you and your code usually, you
should actually think about this when you implement time consuming activities.
Unlike pure Emojicode functions, the Real-Time Engine has no control about your
code and so it’s your task to ensure that your procedures does not block Garbage
Collector cycles. If your procedure takes exceptionally long, you should
consider using:

```
void allowGC();
void disallowGCAndPauseIfNeeded();
```

By calling `allowGC` you allow the Garbage Collector to run at any time while
you are doing work. After the handler is finished with its work, it’s absolutely
necessary to call `disallowGCAndPauseIfNeeded`.

>!N Between a call to `allowGC` and `disallowGCAndPauseIfNeeded` you **must
>!H not perform any allocations or other kind of GCIA** and you
>!H or any called function **must not call `allowGC`** again. Additionally, the
>!H Garbage Collector might move any objects. Make sure you don’t rely
>!H **on any** — not even those retained — objects between these two function
>!H calls.

For the sake of completeness, `void pauseForGC();` should be mentioned, which we
recommend you rather not use. It’s exactly the function that is called between
execution of different Emojicode instructions to determine whether a Garbage
Collector pause was requested. Please see the header files for further
information.

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
the object. We’ll return the size of `SHA256_CTX` here for our 📯 class:

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
of representing `SHA256_CTX`. Of course, we need to also implement our
initializer:

```
void cryptoSHA256Initalizer(Thread *thread) {
    SHA256_CTX *sha26 = stackGetThisObject(thread)->value;
    SHA256_Init(sha26);
}
```

An initializer handler is slightly different from a method handler as it returns
`void`. If you want a Nothingness initializer to return Nothingness, you can set
the value field of the this object to `NULL`, like so:
`stackGetThisObject(thread)->value = NULL;`. This is the only case in which you
may assign the `value` field.

Our initializer above does nothing special. It casts the pointer to the value
field to a `SHA256_CTX` pointer and calls `SHA256_Init`.

Now the implementations for the methods 📇 and 📩 follow:

```
Something cryptoSHA256Append(Thread *thread) {
    SHA256_CTX *sha256 = stackGetThisObject(thread)->value;
    Data *data = stackGetVariable(0, thread).object->value;
    SHA256_Update(sha256, data->bytes, data->length);
    return NOTHINGNESS;
}

Something cryptoSHA256Final(Thread *thread) {
    SHA256_CTX *sha256 = stackGetThisObject(thread)->value;

    Object *output = newArray(SHA256_DIGEST_LENGTH);
    SHA256_Final(output->value, sha256);

    stackPush(somethingObject(output), 0, 0, thread);  // 1.
    Object *obj = newObject(CL_DATA);
    Data *outData = obj->value;
    outData->length = SHA256_DIGEST_LENGTH;
    outData->bytesObject = stackGetThisObject(thread);  // 2.
    outData->bytes = outData->bytesObject->value;
    stackPop(thread);  // 3.

    return outData;
}
```

There’s nothing special going on in `cryptoSHA256Append`, but there are a few
things in `cryptoSHA256Final` to be discussed:

1. As you already know from *Clashing with the Garbage Collector* we need to
  store the `output` array in the stack before allocating another object.
2. Remember that we have pushed a stack frame in which the `output` array is the
  this object. We retrieve it here and put it into the `bytesObject` field.
3. Last but not least: The stack frame which was previously pushed is now
  popped.

Finally, let’s return these handlers:

```
FunctionFunctionPointer handlerPointerForMethod(EmojicodeChar cl, EmojicodeChar symbol, MethodType t) {
    switch (cl) {
        case 0x1f4ef: //📯
            switch (symbol) {
                case 0x1f4c7: //📇
                    return cryptoSHA256Append;
                case 0x1f4e9: //📩
                    return cryptoSHA256Final;
                case 0x1f4ef: //📯
                    return cryptoSHA256;
            }
    }
    return NULL;
}

InitializerFunctionFunctionPointer handlerPointerForInitializer(EmojicodeChar cl, EmojicodeChar symbol) {
    switch (cl) {
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

In some cases you'll work with resources that need to be freed after they are no
longer used. Often you’ll then offer an API and let the user do the freeing
himself. However, it’s can be desirable to free or ensure the resource was
freed, when the Garbage Collector abandons an object.

You can register an object for deinitalization with this function:

```
void registerForDeinitialization(Object *object);
```

You must have provided a deinitializer for the object’s class (set
`klass->deinit` in `prepareClass`).

Note that deinitalization should only be considered a fall back as there’s
no guarantee the garbage collector will ever be triggered while the program
is running.

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

Below you can see part of 🍨’s marking function:

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
`mark`, which updates this field to point to the new object (and some other
garbage collector related stuff).
