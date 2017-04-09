# Classes & Value Types

Emojicode features two kind of types that feature object-orientation:
**Classes and Value Types.**

## Defining a Class

The syntax to define a class is

<pre class="syntax">
🐇 $class$ $[superclass]$ 🍇

🍉
$superclass$-> $type-identifier$
$class$-> $type$
</pre>

If you omit *superclass* the class won’t have a superclass.

As for example the code below defines a 🐟 class, that has no superclass.

```
🐇 🐟 🍇

🍉
```

We can now subclass this 🐟 class and declare a 🐡 class that represents a
blowfish – a more concrete type of fish:

```
🐇 🐡 🐟 🍇

🍉
```

## Defining a Value Type

The syntax to define a value type is the following:

<pre class="syntax">
🕊 $value-type$ 🍇

🍉
$value-type$-> $type-identifier$
</pre>

>!H The defined types are immediately available in the namespaces provided
>!H in *value-type* or *class*. Please see [Types](types.html) to gain a deeper
>!H understanding of namespaces and their use in declarations.

## Classes versus Value Types

There are significant difference betweeen classes and value types:

- **Instances of classes** are always allocated on the heap and are **passed
  by** reference. **Instances of value types** are, as their name suggests,
  **passed by value.**

- Classes feature inheritance while value types don’t.

## Instance Variables

To store information in your type instances, instance variables are used. The
🍰 syntax is used to declare an instance variable.

The example below defines a 🐟 class with instance variables.

```
🐇 🐟 🍇
  🍰 age 🚂
  🍰 speedInM/s 🚀
  🍰 name 🍬🔡  👴 Fish kept in aquariums often have names
🍉
```

When a type is instantiated a scope is created in which the instance variables
live. This scope is always available in methods and initializers.

Instance variables are **private to the instance** and **cannot be accessed from
outside**. If you want to allow modification or access of an instance variable
from outside a class or value type you have to write **getters and setters**.
Note that instance variables are also kept private from subclasses.

## Initializers

Initializers are responsible to prepare an instance for use and are called to
instantiate a type, that is gaining an instance of the given type.

The syntax to define an initializer is:

<pre class="syntax">
🐈 $name$ $[init-parameters]$ 🍇

🍉
$init-parameters$-> $init-parameter$ | $init-parameter$ $init-parameters$
$init-parameter$-> [🍼] $variable$ $type$
</pre>

In an initializer **all instance variables must be initialized**. (Remember that
variables of an optional type are automatically initialized to Nothingness,
which is also true for instance variables.)

Furthermore, if you’re initializing a class instance whose class has a
superclass you **must call an initializer** of the superclass . The 🐐 keyword is
used to call a superinitializer:

<pre class="syntax">
🐐 $superinitializer$ $[arguments]$
</pre>

By enforcing these rules, Emojicode can guarantee that any instance of any type
is always fully initialized when obtained from the intializer.

The following example is an initializer for the 🐟 class:

```
🐈 🏞 ageGiven 🚂 nameGiven 🍬🔡 🍇
  🍮 age ageGiven
  🍮 name nameGiven
  🍮 speedInM/s 0
🍉
```

This initializer initializes all variables to appropriate values. `age` and
`name` were initialized to values passed by arguments. `speedInM/s` was set to
a default value.

Value type initializers work quite similarly, with one big difference: In
contrast to class initializers they return a value. This will change in a
further version of Emojicode.

### Initializing Instance Variables from Arguments

Because it’s so common that instance variables are initialized from arguments,
there’s a shortcut to this: 🍼. 🍼 can be used in front of the variable name of an
argument and then automatically copies the value passed into the instance
variable with the same name.

The example above improved with 🍼:

```
🐈 🏞 🍼 age 🚂 🍼 name 🍬🔡 🍇
  🍮 speedInM/s 0
🍉
```

## Instantiation

To get an instance of a class or value type, you must *instantiate* it.
🔷 is used for instantiation.

Its syntax is:

<pre class="syntax">
🔷 $type$ $initializer$ $[arguments]$
</pre>

*initializer* must be the name of the initializer you
want to use. Naturally, you need to provide the correct number of appropriate
arguments.

To get a 🐟 instance for example, you would use:

```
🔷🐟🏞 2 🔤Billy🔤
```

## Nothingness Initializers

There are some cases where a initializer can fail. For instance, an initializer
that should open a file, will fail if the file does not exist.

These kind of initializers are called *Nothingness Initializers* and they can
return, as their name suggests, nothingness.

To declare a Nothingness Initializer, the 🍬 attribute is used. Example:

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

As you can see in the above example, you use 🍎 in combination with ⚡️ to
return nothingness. Using such an initializer with 🔷 naturally gives you an
optional.

## Methods

Methods are functionality bound to a specific type: a class or value type.

The syntax to define a method is:

<pre class="syntax">
🐖 $method-emoji$ $[parameters]$ $[return-type]$ 🍇

🍉
$parameters$-> $parameter$ | $parameter$ $parameters$
$parameter$-> $variable$ $type$
$return-type$-> ➡️ $type$
</pre>

Here’s an example from the 🐟 class:

```
🌮 Swim the given distance within one hour. 🌮
🐖 🏊 distanceInMeters 🚀 🍇
  🍮 speedInM/s ➗ distanceInMeters 3600
🍉
```

Every methods return a value. As you can see in the syntax definition, you can
declare return types. If no return type was declared the return type
defaults to ✨. 🍎 is used to explicitly return a value:

<pre class="syntax">
🍎 $value$
</pre>

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

<pre class="syntax">
$method-emoji$ $value$ $[arguments]$
</pre>

*method-emoji* is the name of the method you wish to call. *value* is the
instance whose method should be called. Of course all arguments must be provided
as required.

>!H This means that any emoji that is not used with a language construct
>!H is a method call!

Example:

```
🍦 michaelTheFish 🔷🐟🏞 3 🔤Michael🔤
🏊 michaelTheFish 300
🍊 👨 michaelTheFish 🍇
  😀 🔤Michael will retire!🔤
🍉
```

## This Context

You often will want to get the value on which the method was called, this is
the object or the value. 🐕 is your friend here:

<pre class="syntax">
🐕
</pre>

The 🐕 returns the current value, whose method or initializer is being called.

Here, for instance, a method of 🐟 is shown, which calls another method to
determine whether the fish on which the method was called should retire or can
sign a new contract of employment:

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

Note that in an initializer, you can’t use 🐕 before the object is fully
initialized, that is before all instance variables were set and the
superinitializer was called. If this was allowed, you could call methods on the
instance which might access instance variable that had not been initialized yet.

## Type Methods

It’s possible to define type methods which are called on the type rather than
on an instance of the type.

Type methods are defined like normal methods but with the 🐇 attribute. As for
example:

```
🐇 🍕 🍇
  🌮 Returns the available pizzas. 🌮
  🐇🐖 📜 ➡️ 🍨🐚🔡 🍇
    🍎 🍨 🔤Margherita🔤 🔤Tonno🔤 🔤Quattro Formaggi🔤 🍆
  🍉
🍉
```

Since type methods don’t execute in an object context the use of 🐕 is illegal.
Type methods are also inherited by subclasses.

### Calling Type Methods

The syntax to call a type method is:

<pre class="syntax">
🍩 $method-emoji$ $type$ $[arguments]$
</pre>

Example:

```
🍩 📜 🍕
```

This calls the type method 📜 on the class 🍕, which we just defined above.

## Reserved Emojis

These emojis cannot be used as method names:

<pre class="syntax">
$method-emoji$-> $emoji$ except $reserved-emoji$
$reserved-emoji$-> 🍮|🍩|🍰|🍨|🍯|🍦|🍫|🍳|🍪|🍭
$reserved-emoji$-> 🍺|🍻|🔁|🔂|🍊|🍋|🍇|🍉|🍓|🍆
$reserved-emoji$-> 🍌|🍎|🔲|🔳|⬜️|🔷|🐕|⚡️|☁️|🐚
$reserved-emoji$-> 🔤|👵|🔟|👍|👎|👴
</pre>


## Access Modifiers

*Access Modifiers* describe from which context a method, class method or initializer can be called. There are three access modifiers, which can be applied to methods, initializers, and class methods.

- 🔓: The method, initializer, or class method can be accessed from everywhere.
- 🔒: The method, initializer, or class method may only be accessed within the class it was defined.
- 🔐: The method, initializer, or class method may only be accessed within the class it was defined or within a class that inherits from that class.

## Object Address Compare

😜 can be used to determine whether two objects have the same memory address
and are thus really the same object. This isn’t an *equality* check: Two
objects might represents the same value but they are still two different object
not sharing the same memory location. To determine equality use 😛 if available.

<pre class="syntax">
😜 $object$ $object$
$object$-> $value$
</pre>

😜 returns true if both *object*s are references to the same memory location.

*object* must be a 🔵.
