# Foreign Function Interface and the C++ API

Emojicode offers an API that allows you to implement methods in another
language.

>!H Make sure you have read everything about [Packages](../reference/packages.html).

## Basics

Basically, Emojicode does not care about what language you implement
native functions in. Let’s say you have define a type method like this:

```
🌍 🐇 🐱 🍇
  🐇❗️ 🎙 📻 🔤catsimulatorMeow🔤
🍉
```

All this tells the compiler is that it should not care about how 🎙 works but
it can assume that when linking a function named `catsimulatorMeow` will be
available that matches the declaration.

Furthermore, the compiler expects this function to be callable via the C
calling convention.

This means that you can theoretically implement that method in any language
you want as you can meet these requirements. Yet, if you need a little
bit of interaction with the Emojicode runtime or the s package types, the C++
API is required.

>!H Using the API can be very challenging sometimes and the API is subject to
>!H change. Implement everything that can be implemented in Emojicode in
>!H Emojicode.

## Implementing a Type Method

Let us get started by implementing the `catsimulatorMeow` in C++:

```c++
#include <emojicode/runtime/Runtime.h>

extern "C" void catsimulatorMeow(runtime::ClassInfo*) {
    puts("Meow!");
}
```

The method as we declared it in Emojicode does neither take arguments nor
does it return a value. So we used `void` as the return type in C++. Our
method, however, does take an argument of type `runtime::ClassInfo*`.
This is because a type method in a class has the class as its context.

## Function Signatures

Depending on the type of function you implement certain additional arguments are
passed to your function. Moreover, you also need to return a value as expected
by the Emojicode compiler. The following table shows these requirements:

| Type | Kind of function | Additional Arguments | Expected Return
|------|------------------|----------------------|----------------
| Class | Type method | `runtime::ClassInfo*` | as declared
| Class | Method | Callee Object | as declared
| Class | Initializer | Initialized Object unless class is foreign | Initialized Object
| Value Type | Type method | none | as declared
| Value Type | Method | Pointer to Callee Value | as declared
| Value Type | Initializer | Pointer to Initialized Value | `void`

In order to be able to find the correct function signature, you’ll also need to
map from Emojicode types to the proper C++ type. This table should help you:

| Emojicode Type | C++ Type
|----------------|----------
| 🔢 | `runtime::Integer`
| 💯 | `runtime::Real`
| 💧 | `runtime::Byte`
| 👌 | `runtime::Boolean`
| 🔣 | `runtime::Symbol`
| any enumeration | `runtime::Enum`
| 🍇🍉 | `runtime::Callable<...>`
| 🍬 | `runtime::SimpleOptional<...>`
| 🔡 | `s::String*`
| 📇 | `s::Data*`
| custom class | pointer to appropriate `runtime::Object<T>` subclass
| custom value type | pointer to appropriate struct

Please see the C++ documentation for more detailed documentation on the
mentioned types. The next section will discuss how you can represent class and
value types in C++.

>!N Never use an Emojicode type that was not mentioned in the
>!N above table and that you did not define yourself from C++.

### Box Storage

It is important to understand that the Emojicode compiler will box values
sometimes. Boxed values are used with generics for instance. Boxed values cannot
be used from C++. To avoid any problems, do not implement methods that take
arguments of a generic type or return a generic type in C++.

## C++ Types for Emojicode Types

You can define C++ types that match Emojicode types you defined, to interact
with them from Emojicode.

In order to interact with objects you have to create a C++ copy of the class.
For example:

```
🌍 🐇 🐱 🍇
  🖍🆕 name 🔡
🍉
```

would translate to the following in C++:

```c++
#include <emojicode/s/String.h>
#include <emojicode/runtime/Runtime.h>

class Cat : public runtime::Object<Cat> {
public:
    s::String *name;
};

SET_INFO_FOR(Cat, catsimulator, 1f431)
```

Every representation of an Emojicode class must inherit from the class
`runtime::Object`. Furthermore, you use the macro `SET_INFO_FOR` to specify
which Emojicode class the C++ class represents. The first argument to the macro
is the C++ type. The second is the Emojicode package in which the Emojicode
class is defined. The third is the Unicode code point of the name of the
Emojicode class in lower case. We call such a C++ class a *mirror class* as it
mirrors the Emojicode class definition.

Value Types can be represented by simple structs:

```
🕊 💳 🍇
  🖍🆕 number 🔡
  🖍🆕 expirationDate 🔡
  🖍🆕 securityCode 🔡
🍉
```
```c++
struct CreditCard {
  s::String *number;
  s::String *expirationDate;
  s::String *securityCode;
};
```

With this knowledge, we’ll extend the 🐱 class:

```
🌍 🐇 🐱 🍇
  🖍🆕 name 🔡

  🆕 🍼 name 🔡 🍇🍉

  ❗️ 🎙 📻 🔤catsimulatorCatPrint🔤
🍉
```

```c++
#include <emojicode/s/String.h>
#include <emojicode/runtime/Runtime.h>

class Cat : public runtime::Object<Cat> {
public:
    s::String *name;
};

extern "C" void catsimulatorCatPrint(Cat *cat) {
    puts(cat->name->stdString().c_str());  // This is slow, don't do this
}

SET_INFO_FOR(Cat, catsimulator, 1f431)
```

What follows are some more examples of Emojicode initializer/method declarations
and C++ functions:

```
❗️ 🔍 search 📇 offset 🔢 ➡️ 🍬🔢 📻 🔤sDataFindFromIndex🔤
```
```c++
extern "C" runtime::SimpleOptional<runtime::Integer> sDataFindFromIndex(Data *data, Data *search, runtime::Integer offset)
```

```
🐇❗️ 🚪 status 🔢 📻 🔤sSystemExit🔤
```
```c++
extern "C" void sSystemExit(runtime::ClassInfo*, runtime::Integer code)
```

```
❗️ 📓 ➡️ 💯 📻 🔤sRealSin🔤
```
```c++
extern "C" runtime::Real sRealSin(runtime::Real *real)
```


## Borrowing and Escaping Use

For performance reasons the Emojicode compiler analyses all methods to
determine whether they just *borrow* a value or let it *escape*. A value is
considered to escape, if you assign the value to an instance variable or if in
another way to store it that another thread could access it after you function
returned.

If you let a value escape in a method or initializer you implement in C++ it is
crucial that you attribute the argument with 🛅. If you let the callee itself
escape, attribute the function with 🛅. Example:

```
🛅 🆕 🛅 callback 🍇🍉 📻 🔤sThreadNew🔤
```

## Managing Memory

### Arguments

Emojicode manages memory with reference counting. It is guaranteed that all
objects that are passed into any Emojicode method whether implemented in C++
or not will be retained for the duration of the call. This means that you do
not need to explicitly retain any of the objects provided to your method. If
the value does not outlive the call.

>!H Callables are objects and thus are reference counted.

If you, however, make a copy of the value or otherwise use the value in a way
that makes use of it after the function has returned (i.e. starting another)
thread you need to explicitly retain and release it appropriately.

Take the following simplified example from the s package:

```c++
extern "C" Thread* sThreadNew(runtime::Callable<void> callable) {
    // ...
    callable.retain();
    std::thread([thread, callable]() {
        callable();
        callable.release();
    });
    // ...
}
```

When the callable is passed to `sThreadNew` it is guaranteed to have a reference
count of at least 1. Yet we want to call the callable on another thread. Due to
the way threading works, this call will occur before or after `sThreadNew` has
returned. We therefore have to retain `callable` so it is not deleted when
`sThreadNew` returns. In order not to produce a leak, we must also release it
once we no longer need it.

>!N If you need to retain a value somewhere this is a clear sign that you also
>!N let the value escape.

### Return

An object returned from a function must have a reference count of 1 or greater.

## Instantiating Emojicode Classes from C++

If you define a mirror C++ class for an Emojicode class and appropriately
used the `SET_INFO_FOR` macro, you can create instances of the class in
Emojicode.

Here is the mirror class for 🔡 for example:

```c++
class String : public runtime::Object<String>  {
public:
    String(const char *string);

    // ...

    runtime::MemoryPointer<char> characters;
    runtime::Integer count;

    // ...
};

SET_INFO_FOR(String, s, 1f521)
```

You can then create an instance of this class using the class method `init`
inherited from `runtime::Object<T>`. `init` forwards all arguments to the
subclasses constructor. So we could create an Emojicode string from a C++
string by doing:

```c++
String::init("Test");
```

This works because the constructor `String(const char *string)` was defined
for the `String` class above.

>!N If you do not define an appropriate constructor for a mirror class,
>!N it is possible to create an improperly initialized instance, which will
>!N cause undefined behavior. **Avoid instantiation from C++.**

An instance returned from `init` always has a reference count of 1. This means
that you can, for instance, immediately return it.

## Foreign Classes

As said before, implement everything that can be implemented in Emojicode, in
Emojicode. For instance, the s package implements the basic data structures
like 🍨 and 🍯 entirely in Emojicode. Substantial parts of 🔡 are implemented
in Emojicode too, only the parts that have to deal with complex logic and use a
a third-party library are implemented in C++.

The 🔡 class is therefore defined in Emojicode like this:

```
🌍 🐇 🔡 🍇
  🖍🆕 bytes 🧠
  🖍🆕 count 🔢

  💭 ...
🍉
```

Sometimes, however, a class has to store something that cannot be represented
in Emojicode, because it is a platform dependent value or system resource for
example. An example from the s package is the 🧵 class. Threads are very
platform dependent and there is no safe way to represent `std::thread` in
Emojicode. Thus, there is no way to fully define the class 🧵 in Emojicode. This
is where *foreign classes* come in. Foreign classes are defined by attributing
them with 📻. The 🧵 is defined like this:

```
🌍 📻 🐇 🧵 🍇
  💭 ...
🍉
```

This tells the compiler that the exact definition of the class is unknown.
Consequently, you must not declare any instance variables or any initializer
that is implemented in C++.

The class defines its initializer like this:

```c++
🌍 📻 🐇 🧵 🍇
  🆕 🛅 callback 🍇🍉 📻 🔤sThreadNew🔤

  💭 ...
🍉
```

On the C++ side the following happens:

```c++
class Thread : public runtime::Object<Thread> {
public:
    std::thread thread;
};

extern "C" Thread* sThreadNew(runtime::Callable<void> callable) {
    auto thread = Thread::init();
    // ...
    return thread;
}

SET_INFO_FOR(Thread, s, 1f9f5)
```

Note that `sThreadNew` does not take `Thread*` or any other pointer as
first argument like initializers would do normally. Naturally, no code for
object allocation can be generated by the Emojicode compiler. Thus, we create
the instance ourselves by calling `Thread::init()`, which we can do, since we
have a full definition of the class. We return this value at the end, like any
initializer does.

>!H Do not abuse foreign classes. If the class can be defined in Emojicode,
>!H define it there (too).

If your foreign class stores an object that requires destruction define a
private method for destruction that you implement in C++. Then call that method
from the destructor you define in C++:

```c++
extern "C" void sThreadDestruct(Thread *thread) {
    thread->~Thread();  // Manually call the destructor
}
```
```
♻️ 🍇
  ♻️🐕❗️
🍉

🔒❗️♻️ 📻 🔤sThreadDestruct🔤
```
The destructor cannot be directly implemented in C++.

>!N The C++ destructor of a foreign class is not called by default when the
>!N object is deleted!

## Can I Create a List or Dictionary from C++?

No. Not at this time.

## How to Link to Shared Libraries?

See [Specifying Shared Libaries To Link](/docs/reference/packages.html#specifying-shared-libaries-to-link).

## How do I do …?

Please check if the [s package](https://github.com/emojicode/emojicode/tree/master/s)
does something similar. It is a great resource for examples.
If not please ask in the chat or open an issue on GitHub.
