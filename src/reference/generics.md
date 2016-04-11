# Generics

*Generics* allow you to write code in which you can use a placeholder – variable
names – instead of actual type names, which will then be substitued with real
types when you use that code later. This is a really powerful feature and is a
great way to avoid code duplication.

## Defining a Generic Class

To define a Generic Class you define a class and append

```
🐚 name type
```

for each generic argument the class shall take. This structure is called
*generic argument*. *name*  must be the name of the argument and *type* any type
name.

*type  is a generic argument constraint and types provided for this argument
*must be compatible with that constraint.

In the class body you can reference to the generic type arguments by its name.

See this example for a “box” that can store objects.

```
🐇 🎁 🐚 T 🔵 🍇

  🍰 content T

  🐈 ✂️ =content T 🍇
    🍮 content =content
  🍉

  🐖 🎉 ➡️ T 🍇
    🍎 content
  🍉

🍉
```

## Subclassing a Generic Class

Naturally you can subclass a generic class. Like in any other circumstance you
have to provide values for the superclass’s generic arguments. For instance:

```
🐇 ☑️ 🎁 🐚 🔡 🍇

🍉
```

If the subclass itself takes a generic argument this argument can be used as
argument for the superclass:

```
🐇 🌟 🐚 A 🔵 🎁 🐚 A 🍇

🍉
```

## Compatibility

Generic classes with arguments are only compatible if they have exactly the
same arguments. So `🍨🐚🔡` is only compatible to `🍨🐚🔡` but not to
`🍨🐚⚪️` as one might expect.

The following example will **not** compile and illustrates why this
kind of type conversion is not allowed.

```
🍦 listOfStrings 🍨 🔤Curiosity🔤 🔤Doesn’t🔤 🍆

🍰 listOfSomethings 🍨🐚⚪️
🍮 listOfSomethings listOfStrings
👴 Our list of strings is now suddenly a list of somethings
👴 (remember listOfSomethings points to the same list as listOfStrings)

🐻 listOfSomethings 13 👴 Add an integer

🔂 string listOfStrings 🍇
  👴 The program would crash as there’s an integer in our list of strings
  😀 string
🍉
```

## Runtime Typing (Casting)

>!H This is a 0.x limitation. Enhancements in the future will possibly remove this limitation.

At the moment it’s not possible to store the type information of instances of generic classes at runtime. Therefore casts to classes with specific generic arguments cannot be verified and are forbidden. You will be confronted with the following error message if you try that anyway:

> Dynamic casts involving generic type arguments are not possible yet. Please specify the generic argument constraints of the class for compatibility with future versions.

When you perform a cast you must always specify the generic argument constraint for each argument. Example:

```
🍰 box ⚪️

🔲 box 🎁🐚🔡
```

The above example will not compile. Instead you have to specify:

```
🍰 box ⚪️

🔲 box 🎁🐚🔵
```

## Generic Methods

It’s also possible to define a generic method. A generic method is a method
that takes generic arguments which then can be used as argument types, as return
types or as types in the method body.

A good example from the standard library is 🍨’s 🐰 method. It is defined like
this:

```
🐖 🐰 🐚A⚪️ callback 🍇Element➡️A🍉 ➡️ 🍨🐚A 🍇
  👴 ...
🍉
```

Therefore the complete method syntax is:

```
🐖 name [(🐚 name type) ...] [(variable type) ...] [➡️ returnType] 🍇

🍉
```

As you can see above it takes one generic argument named `A` which is restricted
to subtypes of ⚪️, that is any type. Now, if you'd wish to call this method
you need to specify the generic type argument `A`.

```
🍦 list 🍨🔤aa🔤 🔤12345🔤🍆
🐰 list 🐚🔡 🍇 a 🔡 ➡️ 🔡
  🍎 🍪a 🔤!🔤🍪
🍉
```

The formal syntax to call a method with generic type arguments is:

```
methodEmoji object (🐚 typeArgument)... [arguments ...]
```
