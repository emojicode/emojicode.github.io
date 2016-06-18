# Classes

Emojicode is object orientated and allows you to create class types. This
chapter discusses classes, instantiation, promises and class extensions.

## 🐇 Defining a New Class

The syntax to create a new class is the following:

```
🐇 class [superclass] 🍇

🍉
```

When you define a new class you are also creating a new type.

*class* must be an Emoji. superclass the class’s superclass. If superclass is
omitted the class does not have a superclass. You can subclass any existing
class.

## Instance Variables

When a class is created a scope is created in which the *instance variables*
live. This scope is always available to methods and in initializers as top
scope. You can declare variables in this scope by using the 🍰 syntax in the
class body.

```
🐇 📷 🍇
  🍰 megapixels 🚂
  🍰 manufacturer 🔡
  🍰 flashOn 👌
🍉
```

As the name suggests instance variables are just variables inside a scope. They
**cannot be accessed from outside** the class. If you want to modify or access
them from outside the class you have to write **getters and setters**.

It’s also noteworthy that instance variables are **private to the class** in
which they were defined. Subclasses can’t access their superclasses instance
variables.

Example:

```
🐇 📷 🍇
  🍰 megapixels 🚂
  🍰 manufacturer 🔡
  🍰 flashOn 👌

  🐖 💾 🍇
    😀 🍪🔤We are now taking a photo with a camera manufactured by 🔤 manufacturer 🍪
    🍊 flashOn 🍇
      😀 🔤Don’t close your eyes!🔤
    🍉
  🍉
🍉
```

>!H Please note that the class defined in this example is not useful as it
>!H is missing an initializer.

## Initializers

An initializer performs all required steps to make an object ready for use and
is called to instantiate an class.

The syntax is:

```
🐈 name [(variable type) ...] 🍇

🍉
```

The *name* must be an emoji. Then any number of `variable type` can follow.
These define the parameters the initializer takes. *variable* must be a valid
variable name and *type* and valid type.

An initializer for our 📷 class could look like this:

```
🐈 💳 @flashOn 👌 @megapixels 🚂 🍇
  🍮 manufacturer 🔡Pana cotta🔡
  🍮 megapixels @megapixels
  🍮 flashOn @flashOn
🍉
```

As you can see this initializer sets `manufacturer` to a default value, and sets
`flashOn` and `megapixels` based on an argument. Notice how `@flashOn` and
`@megapixels` were used in the argument list. If we had used `flashOn` or
`megapixels` we would have shadowed the instance variables, and thus we would
not have been able to set them.

>!N In the initializer you **must** set all instance variables that are not optionals to an appropriate value.
>!N
>!N You **must** also call an initializer of your class’s superclass, given the class has a superclass. To do this you use 🐐:
>!N ```
>!N 🐐 superinitializer [arguments ...]
>!N ```
>!N This guarantees that the object is fully initialized.

## Instantiation

Now that we have declared an initializer we can get an instance of our class. To
instantiate a class 🔷 is used.

Its syntax is:

```
🔷 className initializerName [arguments ...]
```

*className must be the name of the class you want to instantiate.
*initializerName must be the name of the initializer you wan to use. Naturally
*you need to provide the correct number of appropriate arguments.

To create a 📷 instance we would do:

```
🔷📷💳 👎 25
```

## Required Initializers

By default subclasses are not required to implement the initializers of their
parent classes. This means that a parent class may define a initializer which no
subclass has.

Sometimes a class may need to enforce its descendants to implement a specific
initializer. In such cases the 🔑 attribute should be used. A class must
implement all initializers defined in its superclass that were marked with 🔑.

This example defines an initializer 🔨 all subclasses of 🚪 must provide:

```
🐇 🚪 🍇
  🔑 🐈 🔨 🍇
    👴 Do some initialization here...
  🍉
🍉
```

An initializer implementing a required initializer must mark itself with 🔑 too.


## Nothingness Initializers

There are some cases where a initializer can fail. For instance a initializer
that should open a file, will fail if the file does not exist.

These kind of initializers are called *Nothingness Initializers* and they can
return, as their name suggests, nothingness.

To declare a Nothingness Initializer you use the 🍬 attribute. Example:

```
🍬 🐈 🍕 🍇
  🍊 ▶️ 🌡 573.15 🍇
    👴 The pizza burned if the temperature was above 573.15K
    🍎 ⚡️
  🍉
🍉
```

As you can see in the above example you use the 🍎 in combination with ⚡️ to
return nothingness. Using such an initializer with 🔷 gives you, of course, an
optional.

## Methods

The method syntax is:

```
🐖 name [(variable type) ...] [➡️ returnType] 🍇

🍉
```

You can declare a *returnType* for the method. If you don’t declare a return
type the return type defaults to ✨. Indeed ✨ will be returned if you never use a
🍎. To return a value one uses 🍎:

```
🍎 returnValue
```

When the method is called all statements are executed. The method runs in an own
scope whose top scope is the object scope.

>!H Don’t use the names of language constructs as method names. You won’t be
>!H able to call the method if you do so. You can find a [list of these reserved
>!H emojis](#reserved-emojis) at the end of this chapter.

You’ve already seen this method:

```
🐖 💾 🍇
  😀 🍪🔤We are now taking a photo of 🔤 megapixels 🔤megapixels.🔤🍪
  🍊 flashOn 🍇
    😀 🔤Don’t close your eyes!🔤
  🍉
🍉
```

It does not take any arguments and has no return value.

A method like this might be more interesting:

```
🐖 ✉️ to 🔡 subject 🔡 ➡️ 👌 🍇
  👴 code to send an email, sets variable emailSent?
  🍎 emailSent?
🍉
```

This method is named ✉️ and takes two arguments: `to` and `subject`. It returns a 👌.

### Calling Methods

The syntax to call a method is a bit different:

```
methodEmoji object [arguments ...]
```

*methodEmoji is the name of the method you wish to call. object is the object
*instance whose method will be called. Of course all arguments must be provided
*as required.

>!H This means that any emoji that is not used with a language construct
>!H is a method call!

Example:

```
✉️ myCamera 🔤someone@emojicode.org🔤 🔤Important Photo🔤
```

## 🐕 This Object

Syntax:

```
🐕
```

The 🐕 returns the current object, whose method or initializer is being called.

Example:

```
👴 Automatically takes a photo of fireworks
🐖 🎆 🍇
  👴 launch it
  💥 fireworkInterface
  👴 take the photo
  💾 🐕
🍉
```

>!N In an initializer you cannot use 🐕 before the object is fully initialized.
>!N You must set all instance variables first and you must have called the
>!N super initializer.

## Calling Super Methods

Inside a method you can use this syntax to call the super method:

```
🐿 methodEmoji [arguments ...]
```

This simply calls the super method named *methodEmoji* and returns it value.

You should of course only use this method if it’s really needed.

## Class Methods

You can also define class methods which are methods that are called on the class
instead of calling them on an instance.

Class methods are simply methods with the 🐇 attribute which turns them into
class methods. E.g.

```
🐇🐖 🏁 ➡️ 🚂 🍇
  😀 🔤Howdy!🔤

  🍎 0
🍉
```

Class methods are identical to instance methods, except that they are called on
the class itself using 🍩. Since these methods don’t execute in an object context
the use of 🐕 is illegal.

### Calling Class Methods

The syntax to call a class method is:

```
🍩 methodEmoji class [arguments ...]
```

Example:

```
🍩 🌍 💻
```

This calls the class method 🌍 on the class 💻. 💻 is a class defined
in the s package. The 🌍 method will return the *current working
directory*.

## Overriding Methods and Initializers

You can override methods and initializers by redeclaring them in a subclass leaded by ✒️.

### Promises

You must watch out not to break the superclass’s *promises*. Promises are a set of rules that ensure that the class’s routines can be used the same way as its superclass’s routines – a main characteristic of object orientation. These promises are:

- The new routine must take the same number of arguments.
- The return type of the new routine must be the same or a subtype of the super method’s return type.
- The arguments of the new routine must be of the same type or a super type of the super method’s argument type.

### Preventing Overriding

The 🔏 attribute prevents overriding a method, initializer or class method in a
subclass. Example:

```
🔏 🐖 🐸 ➡️ 🚂 🍇
  🍎 34
🍉
```

Any attempt to override a method, initializer or class method attributed with 🔏
will lead to a compiler error.

## 🐓 The Class

Inside a class 🐓 stands for the type on which a method or intializer is called.

You can use 🐓 for flexible and powerful solutions, like shown below.

```
🐇 🐟 🍇
  🐇🐖 🎛 ➡️ 🐓 🍇
    🍎 🔷🐓🆕
  🍉

  🔑 🐈 🆕 🍇🍉

  🐖 🙋 🍇
    😀 🔤I’m a fish.🔤
  🍉
🍉

🐇 🐡 🐟 🍇
  ✒️ 🔑 🐈 🆕 🍇
    🐐 🆕
  🍉

  ✒️ 🐖 🙋 🍇
    😀 🔤I’m a blowfish.🔤
  🍉
🍉

🐇 📺 🍇
  🐇🐖 🏁 ➡️ 🚂 🍇
    🙋 🍩🎛🐟 👴 Prints "I’m a fish."
    🙋 🍩🎛🐡 👴 Prints "I’m a blowfish."
    🍎 0
  🍉
🍉
```

As you can see from the example 🐓 can be used in a method or initializer
declaration and always stands for the class on which a method or initializer is
called. 🐓 can also be used inside a class method body where it refers to the
class on which it was called.

>!N 🐓 **must not** be used in the body of a method or initializer.

>!N Because 🐓 could be used in class methods, which can execute on subclasses
>!N that do not have all non-required initializers, you can only use required
>!N initializers to instantiate 🐓.

## Access Modifiers

*Access Modifiers* describe from which context a method, class method or initializer can be called. There are three access modifiers, which can be applied to methods, initializers, and class methods.

- 🔓: The method, initializer, or class method can be accessed from everywhere.
- 🔒: The method, initializer, or class method may only be accessed within the class it was defined.
- 🔐: The method, initializer, or class method may only be accessed within the class it was defined or within a class that inherits from that class.

## Reserved Emojis

These emojis cannot be used as method names:

🍮🍩🍰🍨🍯🍦🍫🍳🍪🍭🍺🍻🔁🔂🍎🍊🍋🍇🍉🍓🍆🍌🔲🔷🐕⚡️☁️🐚⏭⏩

These emojis are reserved at lexer level and can therefore not be used for method or class names:

🔤👵🔟👍👎👴
