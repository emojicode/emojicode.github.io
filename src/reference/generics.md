# Generics

Generics allow you to write code in which you can use a placeholder – variable
names – instead of an actual type, which will then be substituted with real
types when you use that code later. This is a really powerful feature and is a
great way to avoid code duplication.

## Defining a Generic Type

To define a generic class or value type, provide generic parameters after
the name of the type. A generic parameter consists of a name, which can then be
used instead of a type inside the class or value type, and a type constraint.

```syntax
$generic-parameter$-> $variable$ $type$
$generic-parameter-list$-> $generic-parameter$ [$generic-parameter-list$]
$generic-parameters$-> 🐚 $generic-parameter-list$ 🍆
```

See this example for a box type that can store objects of a specified type. Note
that inside the class body `T` is used as a type.

```
🐇 🎁 🐚T🔵🍆 🍇
  🖍🆕 something T

  🆕 ✂️ 🍼 something T 🍇🍉

  ❗️ 🎉 ➡️  T 🍇
    ↩️ something
  🍉
🍉
```

The following example demonstrates how to instantiate a generic class:

```
🆕🎁🐚🔡🍆✂️ 🔤Been wishin' for you🔤❗
```

### Type Constraint

The type constraint constrains which types can be supplied as an arguments for
a generic type parameter. Type constraints are useful as they allow you to
treat values of a generic type as if they were an instance of the type
constraint.

## Subclassing a Generic Class

Naturally you can subclass a generic class. Like in any other circumstance you
have to provide values for the superclass’s generic parameters. For instance:

```
🐇 ☑️ 🎁🐚🔡🍆 🍇

🍉
```

If the subclass itself takes a generic argument this argument can be used as
argument for the superclass:

```
🐇 🌟🐚A🔵🍆 🎁🐚A🍆 🍇

🍉
```

## Compatibility

Two generic types are only compatible if they were provided with exactly the
same arguments. So `🍨🐚🔡🍆` is only compatible to `🍨🐚🔡🍆` but not to
`🍨🐚⚪️🍆` as one might expect.

## Generic Methods and Intializers

It’s also possible to define a generic method, type method or intializer. Such a
method, type method or intializer takes generic arguments which then can be used
as argument types, as return types or as types in the body.

A good example from the standard library is 🍨’s 🐰 method. It is defined like
this:

```
❗️ 🐰 🐚A⚪🍆️ callback 🍇Element➡️A🍉 ➡️ 🍨🐚A🍆 🍇
  💭 ...
🍉
```

As you can see above has one generic parameter named `A` which is restricted
to subtypes of ⚪️, that is any type. Now, if you'd wish to call this method
you can know provide the generic type arguments after the object or class on
which on which you call the method:

```
🍨🔤aa🔤 🔤12345🔤🍆 ➡️ list
🐰 list 🐚🔡🍆 🍇 a 🔡 ➡️ 🔡
  ↩️ 🔤🧲a🧲!🔤
🍉
```

The grammar for generic arguments is:

```syntax
$generic-argument-list$-> $type$ [$generic-argument-list$]
$generic-arguments$-> 🐚 $generic-argument-list$ 🍆
```

Emojicode is, however, capable of automatically inferring the generic
arguments for you, so we can just write:

```
🐰 list 🍇 a 🔡 ➡️ 🔡
  ↩️ 🔤🧲a🧲!🔤
🍉❗️
```

and Emojicode will automatically provide `🔡` as generic argument for `A`.

## Generic Protocols

It’s also possible to define generic protocols. Generic protocols work
very similar to generic classes and the same compatibility rules apply.

A generic protocol which you might use is 🔂.

```
🐊 🔂🐚Element⚪🍆️ 🍇
  ❗️ 🍡 ➡️ 🍡🐚Element🍆
🍉
```

It takes one generic argument `Element` which determines the generic argument
for the iterator (🍡) the 🍡 method must return.

## Disabling Generic Dynamism

The decorator 🎍🛢 can be used with a class or value type to disable generic
dynamism, like in the example below.

```
🎍🛢 🔏 🐇 🍧🐚Element ⚪🍆️ 🍇
  💭 ...
🍉
```

Every time you instantiate a generic class, the types you provided as generic
arguments will be stored in the newly created instance, which enables casting
with generics, for example. This, however, requires additional time and space.
In special cases it can thus be useful to disable this feature.

If you disable generic dynamism, casting to this type is no longer possible.

