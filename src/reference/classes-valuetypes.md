# Classes & Value Types

Emojicode features two types that support object-orientation: **Classes and
Value Types.**

## Classes versus Value Types

There are significant difference betweeen classes and value types:

- **Instances of classes** are always allocated on the heap and are **passed
  by** reference. **Instances of value types** are, as their name suggests,
  **passed by value.**

- Classes feature inheritance while value types don’t.

>!H Defining a value type yourself isn’t really useful in 0.3. It’s still
>!H helpful to know about value types in order to extend them.

## Definition Syntax

The syntax to define a class is the following:

```
🐇 class [superclass] 🍇

🍉
```

*class* must be a type identifier. *superclass* must be a type identifier
identifying the superclass. If *superclass* is omitted the class doesn’t have a
superclass. You can subclass any existing class.

The syntax to define a value type is the following:

```
🕊 valueType 🍇

🍉
```

*valueType* must be a type identifier.

As for example the code below defines a 🐟 class, that has no superclass.

```
🐇 🐟 🍇

🍉
```

## Instance Variables

In the class body the 🍰 syntax can be used to declare variables. These variables
are then local to the class instances.

When a class is created a scope is created in which the instance variables
live. This scope is always available to methods and in initializers as top
scope.

The example below defines a 🐟 class with instance variables.

```
🐇 🐟 🍇
  🍰 age 🚂
  🍰 speedInM/s 🚀
  🍰 name 🍬🔡  👴 Fish kept in aquariums often have names
🍉
```

Instance variables are local to the class **cannot be accessed from outside**
the class. If you want to modify or access them from outside the class you have
to write **getters and setters**.

It’s also noteworthy that instance variables are **private to the class** in
which they were defined. Subclasses can’t access their superclasses instance
variables and also have to use corresponding getters and setters.

As for the moment value types do not support instance variables.

## Initializers

Initializers are responsible to prepare an instance for use and is called to
instantiate an class.

The syntax to define an initializer is:

```
🐈 name [(variable type) ...] 🍇

🍉
```

In the initializer you **must set all instance variables** that are not
optionals to an appropriate value. You **must also call an initializer** of your
class’s superclass given the class has a superclass. 🐐 must be used to call
superinitializers:

```
🐐 superinitializer [arguments ...]
```

As a result objects are guaranteed fully initialized.

The following example shows an initializer for the 🐟 class:

```
🐈 🏞 age. 🚂 name. 🍬🔡 🍇
  🍮 age age.
  🍮 name name.
  🍮 speedInM/s 0
🍉
```

This initializer initializes all variables to appropriate values. `age` and
`name` were initialized to values passed by arguments. `speedInM/s` was set to
a default value.

Value type initializers work quite similarly, with one big difference: In
contrast to class initializers they return a value. This is due to the fact that
value types only represent *primitive* values. The following is an example for
an initializer for 🚂, which is a value type.

## Instantiation

To get an instance of a class or value type, you must *instantiate* it.

To instantiate a class or value type 🔷 is used.

Its syntax is:

```
🔷 typeName initializerName [arguments ...]
```

*typeName* must be a type identifier identifying the class or value type you
want to instantiate. *initializerName* must be the name of the initializer you
want to use. Naturally, you need to provide the correct number of appropriate
arguments.

To get a 🐟 instance for example, you would use:

```
🔷🐟🏞 2 🔤Billy🔤
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
🌮 Tries to lure a fish at the given age with pizza. 🌮
🍬 🐈 🍕 age. 🚂 🍇
  🍊 ◀️ age. 1 🍇
    👴 You can’t lure fish younger than one year with pizza
    🍎 ⚡️
  🍉
  🍮 age age.
  👴 ...
🍉
```

As you can see in the above example you use 🍎 in combination with ⚡️ to
return nothingness. Using such an initializer with 🔷 gives you, of course, an
optional.

## Methods

Methods are functionality bound to a specific type: a class or value type.

The syntax to define a method is:

```
🐖 name [(variable type) ...] [➡️ returnType] 🍇

🍉
```

Here’s an example from the 🐟 class:

```
🌮 Swim the given distance within one hour. 🌮
🐖 🏊 distanceInMeters 🚀 🍇
  🍮 speedInM/s ➗ distanceInMeters 3600
🍉
```

Every methods return a value. As you can see in the syntax definition, you can
declare a *returnType* for the method. If you don’t declare a return type the
return type defaults to ✨. 🍎 is used to explicitly return a value:

```
🍎 returnValue
```

Let’s look at another example from the 🐟 class that uses 🍎:

```
🌮 Determines whether this fish should retire. 🌮
🐖 👨 ➡️ 👌 🍇
  🍎 ▶️ age 4
🍉
```

You can’t use the names of language statements as method names since you
won’t be able to call the method if you do so. You can find a [list of these
reserved emojis](#reserved-emojis) at the end of this chapter.

### Calling Methods

The syntax to call a method is special:

```
methodEmoji value [arguments ...]
```

*methodEmoji* is the name of the method you wish to call. *value* is the
instance whose method should be called. Of course all arguments must be provided
as required.

>!H This means that any emoji that is not used with a language construct
>!H is a method call!

Example:

```
🍦 michaelTheFish 🔷🐟🏞 3 🔤Michael🔤
🍊 👨 michaelTheFish 🍇
  😀 🔤Michael will retire!🔤
🍉
```

## This Context

You often will want to get the value on which the method was called, this is
the object or the value. 🐕 is your friend here:

```
🐕
```

The 🐕 returns the current value, whose method or initializer is being called.

Here, for instance, a method of 🐟 is shown which calls another method to
determine whether the fish on which the method was called should retire or can
sign a new contract:

```
🌮 Signs a new contract of employment. 🌮
🐖 🖊 🍇
  🍊 👨 🐕 🍇
    😀 🔤Sorry, I’d prefer to retire.🔤
  🍉
  🍓 🍇
    😀 🔤I hope they’ll pay me twice as much.🔤
  🍉
🍉
```

>!N In an initializer, you can’t use 🐕 before the object is fully initialized,
>!H that is before all instance variables were set and the superintializer was
>!N called.

## Calling Super Methods

Inside a method you can use this syntax to call the super method:

```
🐿 methodEmoji [arguments ...]
```

This simply calls the super method named *methodEmoji* and returns it value.

You should of course only use this method if it’s really needed.

## Type Methods

It’s possible to define type methods which are called on the type instead of
being called on the instances of this type.

Type methods are defined like normal methods but with the 🐇 attribute. As for
example:

```
🐇🐖 🍗 🍇
  😀 🔤Howdy!🔤

  🍎 0
🍉
```

Since type methods don’t execute in an object context the use of 🐕 is illegal.
Type method on classes are also inherited by subclasses.

### Calling Type Methods

The syntax to call a type method is:

```
🍩 methodEmoji type [arguments ...]
```

Example:

```
🍩 🌍 💻
```

This calls the type method 🌍 on the class 💻. 💻 is a class defined
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
