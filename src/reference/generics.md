# Generics

*Generics* allow you to write code in which you can use a placeholder – variable
names – instead of actual type names, which will then be substituted with real
types when you use that code later. This is a really powerful feature and is a
great way to avoid code duplication.

## Defining a Generic Class

To define a Generic Class you define a class and append

<pre class="syntax">
🐚 $variable$ $type$
</pre>

for each generic argument the class shall take. This structure is called
*generic argument*. *variable* is the name of the argument. *type* is a generic
argument constraint and types provided for this argument must be compatible with
that constraint.

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

<pre class="negative-example">
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
</pre>

## Generic Methods and Intializers

It’s also possible to define a generic method, class method or intializer. A
generic procedure is a method, class method or intializer that takes generic
arguments which then can be used as argument types, as return types or as types
in the method body.

A good example from the standard library is 🍨’s 🐰 method. It is defined like
this:

```
🐖 🐰 🐚A⚪️ callback 🍇Element➡️A🍉 ➡️ 🍨🐚A 🍇
  👴 ...
🍉
```

Therefore the complete method syntax is:

<pre class="syntax">
$generic-arguments$-> $generic-argument$ | $generic-argument$ $generic-arguments$
$generic-argument$-> 🐚 $variable$ $type$
</pre>

As you can see above it takes one generic argument named `A` which is restricted
to subtypes of ⚪️, that is any type. Now, if you'd wish to call this method
you can know provide the generic type arguments after the object or class on
which on which you call the method:

```
🍦 list 🍨🔤aa🔤 🔤12345🔤🍆
🐰 list 🐚🔡 🍇 a 🔡 ➡️ 🔡
  🍎 🍪a 🔤!🔤🍪
🍉
```

Emojicode is, however, actually capable of automatically inferring the generic
arguments for you, so you could just write:

```
🐰 list 🍇 a 🔡 ➡️ 🔡
  🍎 🍪a 🔤!🔤🍪
🍉
```

and Emojicode will automatically provide `🔡` as generic argument for `A`.

## Generic Protocols

It’s also possible to define generic protocols. Generic protocols work
very similar to generic classes and the same compatibility rules apply.

A generic protocol which you might use is 🔂.

```
🐊 🔂🐚Element⚪️ 🍇
  🐖 🍡 ➡️ 🍡🐚Element
🍉
```

It takes one generic argument `Element` which determines the generic argument
for the iterator (🍡) the 🍡 method must return.

A class conforming to this protocol must pass a generic argument, like the
string class does for example:

```
🐇 📴 🍇
  🐊 🍡🐚🔣

  👴 ...
🍉

🐋 🔡 🍇
  🐊 🔂🐚🔣

  👴 ...

  🐖 🍡 ➡️ 📴 🍇
     👴 ...
  🍉
🍇
```

## Runtime Typing (Casting)

>!N Casting to generic types is not safe at the moment. It is possible,
>!N but if used incorrectly, it is evil due to the possibility to accomplish
>!N something like shown in “Compatibility” above. **Try to avoid it.**

At the moment it’s not possible to store the type information of instances of
generic classes at runtime. Therefore casts to classes with specific generic
arguments cannot be verified and are forbidden. You will be confronted with the
following error message if you try that anyway:

> Dynamic casts involving generic type arguments are not possible yet. Please
> specify the generic argument constraints of the class for compatibility with
> future versions.

>!H This is a 0.x limitation. Enhancements in the future will possibly
>!H remove this limitation.

When you perform a cast you must always specify the generic argument constraint
for each argument. Example:

<pre class="negative-example">
🍰 box ⚪️

🔲 box 🎁🐚🔡
</pre>

The above example will not compile. Instead you have to specify:

```
🍰 box ⚪️

🔲 box 🎁🐚🔵
```
