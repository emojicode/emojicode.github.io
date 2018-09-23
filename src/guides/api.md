# Foreign Function Interface and the C++ API

Emojicode offers an API that allows you to implement methods in another
language.

>!H Make sure you have read everything about [Packages](../reference/packages.html).

## Basics

Basically, Emojicode does not care at all about what language you implement
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
you want as you can statsify these requirements. Yet, if you need a little
bit of interaction with the Emojicode runtime or the s package types, the C++
API is required.

>!H Using the API can be very challenging sometimes and the API is subject to
>!H change. It is recommended that you implement
>!H everything that can be implemented in Emojicode in
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
does it return a value. Therefore we used `void` as the return type in C++. Our
method, however, does take an argument of type `runtime::ClassInfo*`.
This is because a type method in a class has the class as its context.

## Function Signatures

Depending on what type of function you implement in C++ there will be certain
additional arguments passed to your function in front of the arguments declared
in Emojicode. Moreover, you also need to return a value as expected by the
Emojicode compiler. The following table shows these requirements:

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

>!N You should never try to use an Emojicode type that was not mentioned in the
>!N above table and that you did not define yourself from C++.

### Box Storage

It is important to know that the Emojicode compiler will box values sometimes.
Boxed values are used with generics for instance. Boxed values cannot be used
from C++. To avoid any problems, do not implement methods that take
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

Every representation of an Emojicode class must inherit from the CRTP class
`runtime::Object`. Furthermore, you use the macro `SET_INFO_FOR` to specify
which Emojicode class the C++ class represents. The first argument to the macro
is the C++ type, the second is the Emojicode package in which the Emojicode
class is defined and the third is the Unicode code point of the name of the
Emojicode class in lower case.

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
    puts(cat->name->stdString().c_str());
}

SET_INFO_FOR(Cat, catsimulator, 1f431)
```
