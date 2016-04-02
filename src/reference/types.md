# Types and Namespaces

Emojicode is a strongly type language and therefore has very strict rules
concerning types.

Types are defined by classes, protocols, enums and primitives. Seperate chapters
are devoted to classes, protocols and enums.

## Primitives

Primitives are a special kind of type as they cannot be defined in code. They
are built into the language and therefore also directly known by the compiler.
As with class types you can call methods on primitives, you, however, cannot
inherit from primitives or extend them. Methods of primitive types are known as
*primitive methods*.

You have already gotten to know most primitive types in
[The Basics](basics.html). They are:

- 🚂
- 🚀
- 👌
- 🔣
- ✨ (You’ll learn more about this primitive in [Optionals](optionals.html).)

## Namespaces

Each type when defined is loaded into a namespace. Per definition the type
doesn’t bascially belong to this namespace but is reachable through this
namespace. A type may actually even be reachable through multiple namespaces.

>!H The facts above play a very important role when importing other packages.

Everywhere where a type name is expected you can either just use the name of
the type without explicitely specifying a namespace and the type will be assumed
to be reachable thorugh the default namespace 🔴, or you can explicitely specify
a namespace with the namespace accessor:

```
🔶 namespace name
```

This identifies type *name* of namespace *namespace*. Both must be exactly one identifier.

This is an example of explicitly referring to the 🔡 class in 🔴:

```
🔶🔴🔡
```

You can use this syntax everywhere you would specify a type name, thus also when
declaring a type. The example below declares the class 🎁 and makes it available
in namespace 🎅:

```
🐇 🔶🎅🎁 🍇

🍉
```

## 🔲 Down Casting

If you are sure that a value is of a more specific type, whose specific methods you wish to call, you must downcast the value. If at runtime the value is not of the type specified Nothingness will be returned.

Syntax:

```
🔲 something type
```

*something* and *type* must be types.

Here for instance, a value from a parsed JSON string is downcasted:

```
🍦 object 🗞 🔤"catwalk"🔤
🍦 string 🍺 🔲 object 🔡

😀 string
```

Output:

```
catwalk
```

## ⚪ Something

Something is a special type as it is compatible to *all* other types. Because of this you cannot call methods or perform any  actions on ⚪.

You can however use 🔲 to cast ⚪ objects to meaningful types.

It is an abstract type and therefore only known at compile-time. You cannot cast
to ⚪ at run-time.

## 🔵 Someobject

SomeObject is compatible to *all* instances of classes, but not to primitive
values.

You cannot call methods on 🔵.

It is an abstract type and therefore only known at compile-time. You
cannot cast to 🔵 at run-time.
