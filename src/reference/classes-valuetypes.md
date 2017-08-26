# Classes & Value Types

Emojicode features three kind of types that feature characteristics of object-
orientation: Classes, Value Types and Enumerations. This chapter is soley
dedicated to classes and value types. A [separate chapter](enums.html) is
devoted to enumerations, which have a lot in common with value types.

Object-orientation can be a very broad term, but can be summarized to four
concepts:

- Dynamic lookup: An object on which a method is called dynamically executes
  its method. This allows inheritance and overriding methods in classes.
- Abstraction: The implementation details are hidden and a set of public
  methods is provided that can manipulate that hidden data.
- Subtyping means that if an object has all of the functionality of a given
  type b it can be used in the context of type b. Emojicode accomplishes
  this using [protocols](protocols.md).
- Inheritance is the ability to reuse the definition of one type for another.

It should be noted that only classes take advantage of all concepts above, while
value types and enumerations only provide abstraction and subtyping.

## Classes versus Value Types

There are significant differences between classes and value types:

- Instances of classes are always allocated on the heap and are passed
  by reference. Instances of value types are, as their name suggests,
  passed by value.
- Classes feature inheritance while value types don’t.
- Value Type methods are statically dispatched.

This makes value types suitable when only the actual data represented matters
and not the identity of the object. In other words, you should use value types
when you only care about the values they carry and not about whether you have a
particular instance of the value type.

Dates or mathematical vectors are good examples of types that should be value
types, whereas a type representing a customer should be a class, as it does
matter with which particular customer instance you’re dealing, since every
instance represents exactly one customer.

This is again contrary to the example of a date or a vector: You can't think of
them as “the *one* you’re dealing with”. They are abstract ideas and only
exist in our brains. You could write them on a piece of paper, but then again
the piece of paper would be an instance of a class, which stores the date.

## Defining a Class

The syntax to define a class is:

<pre class="syntax">
$class$-> 🐇 $type-identifier$ [$generic-parameters$] [$superclass$] $type-body$
$type-body$-> 🍇 $type-body-declarations$ 🍉
$type-body-declarations$-> $type-body-declaration$ | $type-body-declaration$ $type-body-declarations$
$type-body-declaration$-> $type-body-attributes$ $type-body-declaration-main$
$type-body-attributes$-> [$documentation-comment$] [⚠️] [🔏] [$access-level$] [✒️] [🐇] [🖍] [🔑]
$type-body-declaration-main$-> $declaration$ | $method$ | $initializer$
$type-body-declaration-main$-> $protocol-conformance$ | $enum-value$
$superclass$-> $type$
</pre>

If you omit *superclass* the class doesn’t have a superclass.

For example, the code below defines a class named 🐟, that has no superclass.

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
$value-type$-> 🕊 $type-identifier$ [$generic-parameters$] $type-body$
</pre>

>!H The defined types are immediately available in the namespaces provided.
>!H Please see [Types](types.html) to gain a deeper
>!H understanding of namespaces and their use in declarations.

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

This example defines a value type named 📆 that represents a date:

```
🕊 📆 🍇
  🍰 day 🚂
  🍰 month 🚂
  🍰 year 🚂
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
$initializer$-> 🐈 [$init-error$] $name$ [$init-parameters$] $block$
$init-parameters$-> $init-parameter$ | $init-parameter$ $init-parameters$
$init-parameter$-> [🍼] $variable$ $type$
$init-error$-> 🚨 $type$
</pre>

In an initializer **all instance variables must be initialized**. (Remember that
variables of an optional type are automatically initialized to Nothingness,
which is also true for instance variables.)

Furthermore, if you’re initializing a class instance whose class has a
superclass you **must call an initializer** of the superclass . The 🐐 keyword is
used to call a superinitializer:

<pre class="syntax">
$superinitializer$-> 🐐 $superinitializer$ [$arguments$]
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
$instantiation$-> 🔷 $type$ $initializer$ [$arguments$]
</pre>

*initializer* must be the name of the initializer you
want to use. Naturally, you need to provide the correct number of appropriate
arguments.

To get a 🐟 instance for example, you would use:

```
🔷🐟🏞 2 🔤Billy🔤
```

## Methods

Methods are functionality bound to a specific type: a class or value type.

The syntax to define a method is:

<pre class="syntax">
$method$-> 🐖 $method-emoji$ [$generic-parameters$] [$parameters$] [$return-type$] $block$
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
$return$-> 🍎 $expression$
</pre>

Let’s look at another example from the 🐟 class that uses 🍎:

```
🌮 Determines whether this fish should retire. 🌮
🐖 👨 ➡️ 👌 🍇
  🍎 ▶️ age 4
🍉
```

This method returns true if the fish is older than four years.
Let’s also define a method for the 📆 value type:

```
🌮 Whether the year of the date is a leap year. 🌮
🐖 🍁 ➡️ 👌 🍇
  🍎 🎉 😛🚮 year 4 0 🎊 ▶️🚮 year 100 0 😛🚮 year 400 0
🍉
```

There’s a [list of reserved emojis](#reserved-emojis) of emojis which can’t be
used as method names, that can be found at the end of this chapter.

### Calling Methods

The syntax to call a method is special:

<pre class="syntax">
$method-call$-> $method-emoji$ $callee$ [$generic-arguments$] [$arguments$]
$callee$-> $expression$
$arguments$-> $expression$ | $expression$ $arguments$
</pre>

*method-emoji* is the name of the method you wish to call. *callee* is the
instance whose method should be called. Of course all arguments must be provided
as required.

Let’s take a look at an example using the 🐟 class:

```
🍦 michaelTheFish 🔷🐟🏞 3 🔤Michael🔤
🏊 michaelTheFish 300

🍊 👨 michaelTheFish 🍇
  😀 🔤Michael will retire!🔤
🍉
```

And here is a similar example with the 📆 value type, that prints “It’s a leap
year” if the content of the variable *date* represents a leap year:

```
🍊 🍁 date 🍇
  😀 🔤It’s a leap year🔤
🍉
```

>!H It’s worth highlighting again: Every emoji that is not a language defined
>!H statement or expression is a method call!

## This Context

You often will want to get the instance on which the method was called, this is
the object or the value. This is what 🐕 is for.

🐕 returns the current value, whose method or initializer is being called.

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
$type-method-call$-> 🍩 $method-emoji$ $type$ [$generic-arguments$] [$arguments$]
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

## Assignment by Call

*Assignment by Call* is a way of quickly replacing the content of a variable
with the result of a method call on its value. E.g.

```
🍮 counter 1
🍮➕ counter 1
```

At the end of the code snippet `counter` will be 2. The second line works
exactly like `🍮 counter ➕ counter 1`.

Any method can be used in an Assignment by Call as long as it returns the type
of the variable. Note that the method can take any number of arguments. The
following example would print the value `fries`, for instance.

```
🍮 string 🔤onion french fries🔤
🍮🔪 string 13 5
😀 string
```

## Access Levels

*Access Levels* describe from which context a method, class method or initializer can be called. There are three access levels:

<pre class="syntax">
$access-level$-> 🔓 | 🔒 | 🔐
</pre>

- 🔓: The method, initializer, or class method can be accessed from everywhere.
- 🔒: The method, initializer, or class method may only be accessed within the class it was defined.
- 🔐: The method, initializer, or class method may only be accessed within the class it was defined or within a class that inherits from that class.

## Deprecation

From time to time methods or initializers need to be deprecated. Emojicode
allows you to mark a method or initializer as deprecated with the ⚠️ attribute.

The compiler will emit a warning wherever a deprecated method or initializer is
used.

## Identity Check

😜 can be used to determine whether two objects references point to the same
object in memory.

This isn’t an equality check: Two objects might represents the same value but
they are still two different object not sharing the same memory location. To
determine equality use 😛 if available.

<pre class="syntax">
$identity-check$-> 😜 $expression$ $expression$
</pre>

😜 returns true if the result of both expression are references to the same
memory location. Naturally, the expressions’ results must be compatible to 🔵.
