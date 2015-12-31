# Types

Emojicode is a strongly type language and therefore has very strict rules concerning types.

Types are defined by classes, protocols, enums and primitives. Each type belongs to a namespace in which it has a unique name. The default namespace 🔴 provides a few special types which are discussed in this chapter. Seperate chapters are devoted to classes, protocols and enums.

## Primitives

Primitives are a special kind of type as they cannot be defined in code. They are built into the language and therefore also directly known by the compiler. As with class types you can call methods on primitives, you, however, cannot inherit from primitives or extend them. Methods of primitive types are known as *primitive methods*.

You have already gotten to know most primitive types in [The Basics](basics.html). They are:

- 🚂
- 🚀
- 👌
- 🔣
- ✨ (You’ll learn more about this primitive in [Optionals](optionals.html).)

## 🔶 Namespaces

As already mentioned each type belongs to a namespace whose name is exactly one Emoji.

When a type is expected you can either only use the name of the type and the compiler will assume the type belongs to the default namespace 🔴 or you can use the namespace accessor:

    🔶 namespace name

This identifies type *name* of namespace *namespace*. Both must be exactly one identifier.

This is an example of explicitly referring to the 🔡 class of 🔴:

    🔶🔴🔡

You can use this syntax everywhere you would specify a type name, thus also when declaring a type. The example below declares the class 🎁 in the namespace 🎅:

    🐇 🔶🎅🎁 🍇

    🍉

Unlike in other languages source code files always belong to the default namespace 🔴, with the exception of package header files.

All standard library types are available in the default namespace 🔴.

## 🔲 Down Casting

If you are sure that a value is of a more specific type, whose specific methods you wish to call, you must downcast the value. If at runtime the value is not of the type specified Nothingness will be returned.

Syntax:

	🔲 something type

*something* and *type* must be types.

For instance, here a value of a mixed list is downcasted:

    🍮 list 🍦 14 🔤catwalk🔤 🍆
    🍮 string 🔲 🐽 list 1 🔡

    😀 string

## ⚪ Something

Something is a special type as it is compatible to *all* other types. Because of this you cannot call methods or perform any  actions on ⚪.

You can however use 🔲 to cast ⚪ objects to meaningful types.

It is an abstract type and therefore only known at compile-time. Therefore you cannot cast to ⚪ at run-time.

⚪ is different from 🔵 as primitives are not compatible to 🔵 because they aren’t instances of classes.

## 🔵 SomeObject

SomeObject is compatible to *all* instances.

It is an abstract type and therefore only known at compile-time. Therefore you cannot cast to 🔵 at run-time.

You cannot call methods on 🔵.
