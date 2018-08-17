# Generics

Generics allow you to write code in which you can use a placeholder – variable
names – instead of an actual type, which will then be substituted with real
types when you use that code later. This is a really powerful feature and is a
great way to avoid code duplication.

## Defining a Generic Type

To define a generic class or value type provide generic parameters after
the name of the type. A generic parameter consits of a name, which can then be
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
a generic type parameter. Type contstraints are useful as they allow you to
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

It’s also possible to define a generic method, type method or intializer. A such
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
  ↩️ 🍪a 🔤!🔤🍪
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
  ↩️ 🍪a 🔤!🔤🍪
🍉
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

A class conforming to this protocol must pass a generic argument, like the
string class does for example:

```
🐇 🌳🐚Element⚪🍆️ 🍇
  🐊 🍡🐚Element🍆

  💭 ...
🍉

🐋 🔡 🍇
  🐊 🔂🐚🍬🔣

  💭 ...

  ❗️ 🍡 ➡️ 🌳🐚🍬🔣🍆 🍇
    💭 ...
  🍉
🍇
```

## Runtime Typing (Casting)

>!N Casting to generic types is not safe at the moment. It is possible,
>!N but if used incorrectly, it is evil due to the possibility to accomplish
>!N something like shown in “Compatibility” above. **Try to avoid it.**

>!H This is a 0.x limitation. Enhancements in the future will possibly
>!H remove this limitation.

At the moment it’s not possible to store the type information of instances of
generic classes at runtime. Therefore casts to classes with specific generic
arguments cannot be verified and are forbidden.
