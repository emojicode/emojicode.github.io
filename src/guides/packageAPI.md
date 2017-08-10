# The Package API

The package API allows to write a package whose logic can be implemented  in
C++. This allows you to expand Emojicode’s capabilities, like accessing special
system APIs.

Make sure that you have read [Packages](../reference/packages.html) and
understand how packages work.

>!H This guide is work in progress.

## Native Binaries

Native binaries are dynamic libraries, which are always suffixed `.so`, and are
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
the static library and basically links all methods of your package with
the corresponding functions from the dynamic library.

Your package must provide a so-called linking table. The linking table is simply
a long list of functions. The Real-Time Engine then links these functions by
looking up an index provided with 📻 at a method declaration. You'll learn more
about this in a minute. This procedure is called *Run-Time Native Linking*.

## Minimal Setup

To get started import the API header of the latest Emojicode version:

```C++
#include "EmojicodeReal-TimeEngine/EmojicodeAPI.hpp"
```

This header defines some of the interfaces you will use. For specific tasks,
however, you’ll have to include additional headers.

### Version, Linking Table, Class Preparation

Your package must provide the following symbols:

```C++
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
your chance to store the class pointer somewhere for later use (e.g. allocating
an object of a class).

## Preparing a class

To see how preparing classes work, let’s have a look at the sockets package’s
`prepareForClass`:

```C++
extern "C" void prepareClass(Emojicode::Class *klass, EmojicodeChar name) {
    switch (name) {
        case 0x1f3c4: //🏄
            klass->valueSize = sizeof(int);
            break;
        case 0x1f4de: //📞
            CL_SOCKET = klass;
            klass->valueSize = sizeof(int);
            break;
    }
}
```

You can see that a switch statement has been used to identify the class that was
passed to the function and that the `valueSize` member of the classes are set.
This variable specifies the amount of space Emojicode will additionally (in
addition to the basic size of the object and its instance variables) allocate.
This space is called *value area* and can be used to store custom data. The
sockets package uses the value area to store file descriptors there, which have
the size of an integer.

You’ll also note that one of the classes was assigned to a global variable:
`CL_SOCKET = klass;`. If you need any of the classes, for instance to allocate
an instance of it later, it’s important that you keep save it somewhere. The
socket package uses a global variable. E.g.

```C++
static Emojicode::Class *CL_SOCKET;

// ...

void serverAccept(Thread *thread) {
    // ...
    Emojicode::Object *socket = newObject(CL_SOCKET);
    // ...
}
```

## Using the Package API

First of all, let’s have a look at a socket initializer. A fair amount of crazy
POSIX socket stuff is going on here; it has partly been removed and we’ll just
ignore what’s left and focus on the package API calls.

```C++
void socketInitWithHost(Thread *thread) {
    const char *host = Emojicode::stringToCString(thread->variable(0).object);
    struct hostent *server = gethostbyname(host);
    if (server == nullptr) {
        thread->returnErrorFromFunction(errnoToError());
        return;
    }

    // ... crazy POSIX socket stuff ...

    int socketDescriptor = socket(AF_INET, SOCK_STREAM, 0);
    if (socketDescriptor == -1 || connect(socketDescriptor /* ... */) {
        thread->returnErrorFromFunction(errnoToError());
        return;
    }
    *thread->thisObject()->val<int>() = socketDescriptor;
    thread->returnOEValueFromFunction(thread->thisObject());
}
```

This initializers shows off a few important aspect of writing a package
function:

- First of all, a package function always returns void and takes one parameter
  of type `Thread *`. It’s a convention to name it `thread`.

- On the first line of the function you can see that the
  function `stringToCString` is used to convert an Emojicode string object
  to a `const char*`. This method uses the Emojicode memory allocator and its
  return must not be freed.

- You can see that the argument that’s passed to `stringToCString` is the
  content of a variable: `thread->variable(0).object`. This variable represents
  the first argument. All arguments are stored on the stack in the order they
  are passed to the function. The first argument is therefore always at index 0.
  Note that these indexes actually represent stack indexes and are measured
  in Emojicode words. We’ll talk about that in detail shortly.

  Just remember for now, that `thread->variable` returns a `Value`.

- You can see that in case of an error (if `server` is a null pointer),
  the method `returnErrorFromFunction` is called on the thread. It’s used to
  return an error value from a function. We’ll talk about returning in a second
  too.

- `*thread->thisObject()->val<int>() = socketDescriptor;` is interesting as
  well. Here the current object’s value area is accessed. The `val<T>()`
  method returns a pointer to the value area as a pointer to `T`. The
  `socketDescriptor` value is then written to that pointer.

- Finally, the method `thread->returnOEValueFromFunction` is called and the
  method object is returned.

The next sections will cover theses APIs in detail.

### Value and the Emojicode Word

In Emojicode every value you’ll work with will come wrapped into a `Value` and
you’ll have to wrap it in a `Value when you pass it to Emojicode. Conveniently,
wrapping often takes place implicitly with these constructors:

```C++
union Value {
    // ...
    Value(bool raw) : raw(raw) {}
    Value(Object *object) : object(object) {}
    Value(double doubl) : doubl(doubl) {}
    // ...
};
```

As you can see `Value` is just a union and has various data members:

```C++
EmojicodeInteger raw;
EmojicodeChar character;
double doubl;
Object *object;
Class *klass;
Value *value;
```

You can use them to access the value inside the `Value` like the function above
did, but be carefully to only use the matching member, i.e. only use `doubl`
when the value actually represents a double.

Emojicode measures the size of types in Emojicode words, which are normally
64-bit. `Value` represent a value that is exactly one Emojicode word long. Note
that the Emojicode Engine can only operate with values that are exactly one word
long. That’s also the reason why `Value` is used all the time.

### The Stack

It’s important that you understand how the Emojicode stack works. You’ll
normally only use it to get the arguments passed to your function. The important
methods for it are:

```C++
Value variable(int index) const { return *variableDestination(index); }
Value* variableDestination(int index) const;
```

The body of `variable` has been included to show, that it just dereferences
the return of `variableDestination`.

When retrieving an argument you must calculate its index by summing up all
sizes of the preceding arguments. Primitives (boolean, integers, symbols, object
references) are exactly one word long. Optionals and error types are one word
larger than the contained value. All other types have the size of summing up
all instance variables.

You can also ask the compiler for the index of a variable by using the `-S`
command line option. E.g.

```bash
emojicodec -S 🍕🤕p0 v7.emojic
```

would print

```
ℹ️ Variable p0 is 6 words large and has index 10
```

### Returning

To return from a function you have to call an appropriate return function.

>!H It’s crucial that you call a return function before your C++ function
>!H actually returns.

The thread class provides several return methods:

```C++
void returnFromFunction();
void returnFromFunction(Value value);
void returnNothingnessFromFunction();
void returnOEValueFromFunction(Value value);
void returnErrorFromFunction(EmojicodeInteger error);
```

The first method is to be used when you didn’t declare that the method returns
anything. The second one should be used when you returned a simple return value
like a string, integer or boolean. `returnOEValueFromFunction` must be used when
the declared return of the function is an error or optional and you want to
return the contained type, i.e. no error occurred and you do not want to return
nothingness. If you want to return nothingness and declared the return type as
optional you should use `returnNothingnessFromFunction`. If you need to indicate
an error use `returnErrorFromFunction`, to which you need to pass the value of
the error enumeration instance you want to pass.

## Clashing with the Garbage Collector

One thing that is really important when creating a package binary is to take
of the Garbage Collector. While we all love the Garbage Collector, it may
become your enemy when creating a package binary.

### Invocation of the Garbage Collector

The Garbage Collector in Emojicode can be invoked when performing any of these
actions, which we call *Garbage Collector Invoking Action* (abbr. GCIA):

- Allocating memory
- Calling a callable or method
- any other function that performs any of the actions above; refer to the
  documentation in the header files

The Garbage Collector will invalidate any object to which it cannot find a
reference. The Garbage Collector is, of course, not capable of detecting any
reference to objects you hold in C++ variables. Hence you must store all object
references at a safe place before performing a GCIA, which is achieved by
retaining.

### Retaining Objects

There are two important Thread methods for retaining and releasing objects:

```C++
RetainedObjectPointer retain(Object *object);
void release(int n);
```

To retain an object, you pass it to `retain`. E.g.

```C++
auto co = thread->retain(newArray(sizeof(EmojicodeChar)));
```

`RetainedObjectPointer` implements the `->` operator so you can and should use
it as if it was an object pointer. Note that while the `RetainedObjectPointer`
itself stays valid, pointers you get to values inside the object it points to,
e.g. `co->val<EmojicodeChar>()` do **not** stay valid across garbage collector
cycles. You should always retrieve them from the retained pointer after
performing a GCIA.

When you no longer need the object you **must** release it by calling `release`:

```C++
thread->release(1);
```

Not that retaining and relasing works like a stack, thats means the last object
you retained will be released when calling `release`. You can release multiple
retained objects at once by calling `release` with the number of objects
you want to release.

>!H The Garbage Collector works in a special way: It copies all referenced,
>!H still required objects into a new space in memory. The “original” objects
>!H stay untouched temporarily. This can lead to very hard-to-track-down bugs
>!H if you are accidentally using a reference to the “original” but now
>!H invalidated object.

### Garbage Collection and Threading

Garbage Collection in an multi-threaded environment like Emojicode requires
further care. The Garbage Collector can only run while all threads are paused
(“stop the world”). While this will not affect you and your code usually, you
should actually think about this when you implement time consuming activities.
Unlike pure Emojicode functions, the Real-Time Engine has no control about your
code and so it’s your task to ensure that your procedures does not block Garbage
Collector cycles. If your procedure takes exceptionally long, you should
consider using:

```C++
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
execution of different Emojicode instructions to determine whether the Garbage
Collector requested that the thread pause. Please see the header files for further
information.

## Compiling The Package

This should be agood starting point.

 `-undefined dynamic_lookup` is macOS only, remove it for any other OS.

```bash
g++ -O3 -std=c++14 -fPIC -c your_package.c -o your_package.o
g++ -shared -fPIC -undefined dynamic_lookup your_package.o -o your_package.so
```

If you don’t shrink from using a build system like CMake, make sure to also
check out how the files package etc. are built in the Emojicode main repository.

## Deinitialization

In some cases you'll work with resources that need to be freed after they are no
longer used. Often you’ll then offer an API and let the user do the freeing
himself. However, it’s can be desirable to free or ensure the resource was
freed, when the Garbage Collector abandons an object.

You can register an object for deinitalization with this function:

```C++
void registerForDeinitialization(Object *object);
```

You must have provided a deinitializer for the object’s class (set
`klass->deinit` in `prepareClass`).

Note that deinitalization should only be considered a fall back as there’s
no guarantee the garbage collector will ever be triggered while the program
is running.

## Marking

It is also very important that you set an appropriate marking function if
you store object pointers in the value area. To set a marking function for a
class, assign it’s `mark` member variable to the function.

>!N It’s important that you write a proper marker function when your class
>!N stores references to objects in its value area.

The marker is a function that is called by the garbage collector when it
inspects an object and copies it into a new location in memory. This function
must call appropriate members of the mark family for every objects reference.
The mark functions are:

```C++
void mark(Object **of);
void markValueReference(Value **valuePointer);
void markBox(Box *box);
```

`mark` must be used when you have stored a simple object pointer. Pass it
a pointer to where the pointer is actually located in memory.

You must call `markValueReference` when you store a reference to a value type
instance and pass it a pointer to where the reference is stored. Note that this
is only necessary with value type references. It’s unlikely you’re every going
to deal with them.

Finally, you must call `markBox` with a pointer to the box to mark it. This is
necessary because a box might store it’s content remotely and a value type
contained in the box might keep an object reference itself.

Below you can see part of 🍨’s marking function:

```C++
void listMark(Object *self) {
    auto *list = self->val<List>();
    if (list->items) {
        mark(&list->items);
    }
    for (size_t i = 0; i < list->count; i++) {
        markBox(&list->elements()[i]);
    }
}
```
