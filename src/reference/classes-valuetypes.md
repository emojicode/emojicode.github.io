# Classes & Value Types

Emojicode features three kind of types that feature characteristics of
object-orientation: Classes, Value Types and Enumerations. This chapter is soley
dedicated to classes and value types. A [separate chapter](enums.html) is
devoted to enumerations, which have a lot in common with value types.

## Classes versus Value Types

There are two significant differences between classes and value types:

- Instances of classes are always allocated on the heap and are passed
  by reference. Instances of value types are, as their name suggests,
  passed by value.

- Classes feature inheritance while value types don’t.

This makes value types suitable when only the actual data represented matters
and not the identity of the object. In other words, you should use value types
when you only care about the values they carry and not about whether you have a
particular instance of the value type.

Dates or mathematical vectors are good examples of types that should be value
types, whereas a type representing a customer should be a class, as it does
matter with *which* customer you’re dealing and not just the data it holds.
Think of it like this: There may be many customers named “John Smith” but the
customers are still different people and therefore are represented by different
objects.

## Defining a Class

Let us define a class representing a customer:

```
🐇 👩‍💼 🍇

🍉
```

As mentioned previously, classes feature inheritance. We can therefore also
declare a subclass of our 👩‍💼 class:


```
🐇 👩‍🚀 👩‍💼 🍇

🍉
```

Some of our customers are astronauts, so we created the subclass 👩‍🚀.
To make a class a subclass, denote its superclass behind the new classes name.
If you don’t provide a superclass, the class doesn’t have one.

## Defining a Value Type

Naturally, we also need to maintain our customers credit card information to
be able to bill them. Credit card information is a great example of a value
type so let’s define one:

```
🕊 💳 🍇

🍉
```

The definition of a value type is quite similar to the definition of a class. We
just used 🕊 instead of 🐇. Furthermore, value types cannot have a supertype.

## Instance Variables

We have declared various types now, but so far these are pretty useless as they
do not store any information at all.

Let us change this by adding instance variables. The normal syntax for declaring
variables is used in value types and classes too:

```
🕊 💳 🍇
  🖍🆕 number 🔡
  🖍🆕 expiration_date 🔡
  🖍🆕 security_code 🔡
🍉
```

We have added some variables to store the credit card information. (We do not
maintain that this is a particularly good way of structuring credit card
information but this is just an example. 🙃)

```
🐇 👩‍💼 🍇
  🖍🆕 firstname 🔡
  🖍🆕 lastname 🔡
  🖍🆕 creditcard 💳
🍉

🐇 👩‍🚀 👩‍💼 🍇
  🖍🆕 days_in_space 🔢
🍉
```

We have also added some information to the normal customer 👩‍💼 and the astronaut
customer 👩‍🚀.

Instance variables are private to the instance and cannot be accessed from
outside but only in initializers and methods. If you want to access instance
variables from outside you have to write getters and setters. Instance variables
are also kept private from subclasses.

### Default Initialization Value

You can also specify a value to which an instance variable will be initialized:

```
🐇 👩‍💼 🍇
  🖍🆕 firstname 🔡 ⬅️ 🔤Susan🔤
  🖍🆕 lastname 🔡 ⬅️ 🔤Rodgers🔤
  🖍🆕 creditcard 💳 ⬅️ 🆕💳🆕 🔤48829284848291🔤 🔤12/22🔤 🔤513🔤❗️
🍉
```

Note that the expressions are not evaluated in the context of the initializer.
Furthermore, these expressions are always evaluated when an
initializer is called.

## Syntax

We have summarized the syntax here as it is a great deal of definitions and
we didn’t want to clutter the previous sections.

```syntax
$type-definition$-> [$documentation-comment$] [🌍] [🔏] [📻] $type-definition-main$
$type-definition-main$-> $class$ | $value-type$ | $extension$ | $protocol$ | $enum$
$class$-> 🐇 $type-identifier$ [$generic-parameters$] [$superclass$] $type-body$
$type-body$-> 🍇 $type-body-declarations$ 🍉
$type-body-declarations$-> $type-body-declaration$ | $type-body-declaration$ $type-body-declarations$
$type-body-declaration$-> $type-body-attributes$ $type-body-declaration-main$
$type-body-attributes$-> [$documentation-comment$] [⚠️] [🔏] [✒️] [🐇] [🖍] [🔑] [🛅] [$access-level$]
$type-body-declaration-main$-> $instance-variable-declaration$ | $method$ | $initializer$
$type-body-declaration-main$-> $protocol-conformance$ | $enum-value$
$type-body-declaration-main$-> $deinitializer$
$instance-variable-declaration$-> $declaration$ [⬅️ $expression$]
$superclass$-> $type$
$value-type$-> 🕊 $type-identifier$ [$generic-parameters$] $type-body$
$initializer$-> 🆕 [$initializer-emoji-id$] [$init-error$] [$init-parameters$] $body$
$initializer-emoji-id$-> --🛅 --🍼 --📻 $emoji-id$
$init-parameters$-> $init-parameter$ | $init-parameter$ $init-parameters$
$init-parameter$-> [🍼] $variable$ $type$
$init-error$-> 🚨 $type$
$body$-> $block$ | $external-link-name$
$access-level$-> 🔓 | 🔒 | 🔐
```

## Initializers

Initializers are responsible to prepare an instance for use and when you
create a new instance of the type.

In an initializer all instance variables must be initialized. Remember that
variables of an optional type are automatically initialized to no value,
which is also true for instance variables.

Let us define an initializer:

```!
🕊 💳 🍇
  🖍🆕 number 🔡
  🖍🆕 expiration_date 🔡
  🖍🆕 security_code 🔡

  🆕 a_number 🔡 an_expiration_date 🔡 a_security_code 🔡 🍇
    a_number ➡️🖍number
    an_expiration_date ➡️🖍expiration_date
    a_security_code ➡️🖍security_code
  🍉
🍉
```

Now that was some tedious work, assigning all that instance variables. Because
it is common to initialize instance variables from parameters, Emojicode
provides a shortcut: 🍼.

🍼 is placed in front of the variable name of an
parameters. Its value is then copied into the instance variable with the same
name:

```
🆕 🍼 number 🔡 🍼 expiration_date 🔡 🍼 security_code 🔡 🍇🍉
```

This is much better. Let us add an initializers to 👩‍💼 as well.

```
🐇 👩‍💼 🍇
  🖍🆕 firstname 🔡
  🖍🆕 lastname 🔡
  🖍🆕 creditcard 💳

  🆕 🍼 firstname 🔡 🍼 lastname 🔡 🍼 creditcard 💳 🍇🍉
🍉
```

Before implementing an initializer for 👩‍🚀 we must review one additional rule:
If you’re writing an initializer for class that has a superclass you must call
an initializer of the superclass. ⤴️ is used for that:

```
🐇 👩‍🚀 👩‍💼 🍇
  🖍🆕 days_in_space 🔢

  🆕 🍼 days_in_space 🔢 firstname 🔡 lastname 🔡 creditcard 💳 🍇
    ⤴️🆕 firstname lastname creditcard❗️
  🍉
🍉
```

Let us take a closer look at ⤴️ : The first thing it expects is the name of the
initializer of the superclass you wish to call.

## Instantiation

We have defined a value type and two classes, defined how to inititalize them,
but we have yet to actually instantiate (get an instance) of them. Instatiation
is performed with 🆕.

Its syntax is:

```syntax
$instantiation$-> 🆕 $type-expr$ $initializer-id$ [$arguments$] $mood$
$initializer-id$-> $initializer-emoji-id$ | 🆕
```

Let us instantiate a credit card information 💳:

```
🆕💳🆕 🔤48829284848291🔤 🔤12/22🔤 🔤513🔤❗️ ➡️ credit_card
```

Diretly after 🆕 comes 💳, the name of the type we want to instantiate.

Then the name of the initializer is expected. Since we did not provide a name
for the initializer above, it was automatically named 🆕. So we use 🆕 as the
initializer name.

The following expressions are argumetns to the initializer. ❗️ denotes the
end of the arguments.

Having instantiated a credit card, we can also instantiate a customer:

```
🆕👩‍💼🆕 🔤Mickey🔤 🔤Mouse🔤 credit_card❗️ ➡️ customer_mouse
🆕👩‍🚀🆕 3216 🔤Jean-Luc🔤 🔤Picard🔤 credit_card❗️ ➡️ astronaut_picard
```

### Named Initializer

For completeness, let’s add an initializer with a name:

```
🐇 👩‍💼 🍇
  🖍🆕 firstname 🔡
  🖍🆕 lastname 🔡
  🖍🆕 creditcard 💳

  🆕 🍼 firstname 🔡 🍼 lastname 🔡 🍼 creditcard 💳 🍇🍉

  🆕 🧜‍♀️ 🍼 firstname 🔡 🍼 creditcard 💳 🍇
    🔤Mermaid🔤 ➡️ 🖍lastname
  🍉
🍉
```

In the above example, you can see an initializer named 🧜‍♀️. In contrast to the
other initializer, it does not take the lastname. Instead it initializes
`lastname` to the string `Mermaid`.

We can use the 🧜‍♀️ initializer like this:

```
🆕👩‍💼🧜‍♀️ 🔤Ariel🔤 credit_card❗️ ➡️ ariel
```

## Methods

Methods are functionality bound to a specific type: a class or value type.

The syntax to define a method is:

```syntax
$method$-> $identification$ [$generic-parameters$] [$parameters$] [$return-type$] $body$
$identification$-> $mood$ $emoji-id$ | $binary-operator$
$mood$-> ❗️ | ❓ | ➡️
$parameters$-> $parameter$ | $parameter$ $parameters$
$parameter$-> $variable$ $type$
$return-type$-> ➡️ $type$
```

Let us define a method for 👩‍💼 to print an invoice:

```
❗️ 💸 total 💯 🍇
  😀 🔤Invoice🔤❗️
  😀 🍪 🔤To 🔤 firstname 🔤 🔤 lastname 🍪❗️
  😀 🍪 🔤Total: 🔤 🔡total 2❗️ 🍪❗️
  😀 🍪 🔤Your credit card will be charged. 🔤 🍪❗️
🍉
```

### Returning Values

Methods can, of course, also return a value. Unless you declare a return type,
the method is assumed to not return a value.

Let us add a method to 💳 that returns a value:

```
❗️ 🔖 ➡️ 🔡 🍇
  ↩️ number
🍉
```

This method simply returns the credit card number. It uses the return statement
↩️ to return the value from the method.

```syntax
$return$-> ↩️ $expression$ | ↩️↩️
```

### Returning from Methods without Return Value

You can also return from a method that does not have a return type at any point
using `↩️↩️`.

For example, this method will never print `Cheap prices!` because it immediately
returns:

```
❗️ 🛎 🍇
  ↩️↩️
  😀 🔤Cheap prices!🔤❗️
🍉
```

### Method Moods

In Emojicode every method has a mood. The methods we have previously defined,
are of imperative mood as we used ❗️. The other mood is interrogative.
Interrogative methods are defined with ❓ instead.

The mood is like part of the name of the method. You can have an interrogative
and imperative method with the same basic name.

Let us define an interrogative method for the 👩‍🚀 class:

```
❓ 🚀 ➡️ 👌 🍇
  ↩️ days_in_space ▶️ 0
🍉
```

This method returns true if the astronaut ever boarded a rocket. We can define
an imperative method with the same name that allows us to change the number
of days the astronaut spent in space:

```
❗️ 🚀 days 🔢 🍇
  days ➡️ 🖍days_in_space
🍉
```

### Calling Methods

We have defined two methods, but we have yet to fully understand how to call
a method.

We’ll have a look at some examples first:

```
💸 astronaut_picard 109.12❗️
💸 customer_mouse 59.00❗️
🚀 astronaut_picard❓ 💭 Was he ever in space?
🚀 astronaut_picard 6390❗️ 💭 Change the number of days to 6390
```

As you can see above, the syntax to call a method is special:

```syntax
$method-call$-> $emoji-id$ $callee$ [$generic-arguments$] [$arguments$] $mood$
$callee$-> $expression$
$arguments$-> $expression$ [$arguments$]
```

If an emoji occurs that is not reserved for a built-in statement or expression
(e.g. ↩️ or 🚨), it is considered a method call. The compiler then expects an
expression, evaluating to a value that has method with the provided name. Then
arguments are expected until either ❗️ or ❓ occurs.

A method call expression evaluates to the value the method return. If the
method does not declare a return type, the call expression returns a value of
type *no return*, which is neither compatible to any type nor does it offer any
functionality.

### This Context

You often will want to get the instance on which the method was called, this is
the object or the value. This is what 🐕 is for.

🐕 returns the current value, whose method or initializer is being called.

For example, we could add a method to the 👩‍🚀 class that bills an astronaut if
has traveled to space:

```
❗️ 🛸 🍇
  ↪️ 🚀 🐕❓ 🍇
    💸🐕 100❗️
  🍉
🍉
```

Note that in an initializer, you can’t use 🐕 before the object is fully
initialized, that is before all instance variables were set and the
superinitializer was called. If this was allowed, you could call methods on the
instance which might access instance variable that had not been initialized yet.

```syntax
$this$-> 🐕
```

## Assignable Methods

You can also define instance methods to which values can be assigned.

Consider that to get a value from a list the `🐽` method is used as in this
example:

```
🐽 a_list 1❗️
```

It would be very intuitive, if we could — to assign a value — write this:

```
🔤Coco🔤 ➡️ 🐽 a_list 1❗️
```

And, indeed, we can. This works, because Emojicode allows us to define methods
that can be assigned to. Although this might sound complicated to you, in fact,
it isn’t. Take a look at this example, in which an assignee method is defined.

```
❗️ 🐽 index 🔢 ➡️ 🍬Element 🍇
  💭 ...
🍉

➡️ 🐽 assigned_value Element index 🔢 🍇
  💭 ...
🍉
```

In this example two methods are defined. The first one is rather obviously just
the getter we used before. The second method, on the other hand, uses the
assignment operator (➡️) instead of ❗️. This indicates to the compiler that this
method should be called, when an assignment to a method of the name `🐽` occurs.

The first argument of the assignee method is always the value that is being
assigned. It must not be provided on the right hand side of the assignment, as
we have seen in the assignment example before. The method itself than is free
to do whatever it needs to do with one limitation: It may not return a value.

```syntax
$method-assignment$-> $expression$ ➡️ $method-call$
```

## Mutability of Value Types

We have seen examples of methods that modify class objects, but we have not seen
any examples of changing the instance variables of a value type. There’s a good
reason why: Value types instance cannot be arbitrarily modified.

Methods of value types that wish to mutate instance variables must be attributed
with 🖍. Let us define a method for the 💳 type that allows us to update the
card’s security code:

```
🖍❗️🗝 code 🔡 🍇
  code ➡️🖍security_code
🍉
```

If we hadn’t used the 🖍 attribute, the compiler would emit an error when
compiling this. Of course, we can only call a method marked with 🖍 on 🐕 if
the method we are in is attributed with 🖍 too. Thus the following would
not work:

```!
🕊 💳 🍇
  🖍🆕 number 🔡
  🖍🆕 expiration_date 🔡
  🖍🆕 security_code 🔡

  🖍❗️🗝 code 🔡 🍇
    code ➡️🖍security_code
  🍉

  ❗️🦠 code 🔡 🍇
    🗝🐕 🔤000🔤❗️ 💭 We cannot call a mutating method from a non-mutating one.
  🍉
🍉
```

We have defined a mutating method. We should call it as well, which brings us
to another important aspect of value type mutability:

Only value types in a mutable variables are mutable.

Let’s see an example:

```
🆕💳🆕 🔤48829284848291🔤 🔤12/22🔤 🔤513🔤❗️ ➡️ 🖍🆕credit_card
🗝credit_card❗️
```

This is perfectly fine, while the below example will not compile as
`credit_card` is not mutable:

```!
🆕💳🆕 🔤48829284848291🔤 🔤12/22🔤 🔤513🔤❗️ ➡️ credit_card
🗝credit_card❗️
```

Since instance variables are always mutable, you can always call mutating
methods on the values of instance variables.

## Type Methods

It’s possible to define type methods which are called on the type rather than on
an instance of the type. Still, type methods are also inherited by subclasses.

Type methods are defined like normal methods but with the 🐇 attribute. As for
example:

```
🐇 🍕 🍇
  📗 Return available pizza dishes. 📗
  🐇❗️ 📜 ➡️ 🍨🐚🔡🍆 🍇
    ↩️ 🍨 🔤Margherita🔤 🔤Tonno🔤 🔤Quattro Formaggi🔤 🍆
  🍉
🍉

🕊 💳 🍇
  📗 Returns some credit card providers. 📗
  🐇❗️ 🏢 ➡️ 🍨🐚🔡🍆 🍇
    ↩️ 🍨 🔤Visa🔤 🔤MasterCard🔤 🔤Discover🔤 🍆
  🍉
🍉
```

We can call our type methods like this:

```
📜🐇🍕❗️
🏢🕊💳❗️
```

This calls the type method 📜 on the class 🍕, which we just defined above.
In class type methods, 🐕 represents the type value on which the method was
called. To learn more about what this means please see
[Types As Values](typevalues.html).

## Access Levels

*Access Levels* describe from which context a method or initializer can be
called. There are three access levels:

- 🔓: The method or initializer can be accessed from everywhere.
- 🔒: The method or initializer may only be accessed within the type and package it was defined.
- 🔐: The method or initializer may only be accessed within the type it was defined or within a class that inherits from that class that defined this method.

The following example cannot be compiled, as 🙋 is a private method and can
therefore not be called from 🏁.

```!
🐇 🐟 🍇
  🆕 🍇🍉

  🔒 ❗️ 🙋 🍇
    😀 🔤I’m a fish.🔤❗️
  🍉
🍉

🏁 🍇
  🆕🐟🆕❗️ ➡️ fish
  🙋 fish❗
🍉
```

If you do not specify an access level the method will default to 🔓, unless
[it overrides another method](inheritance.html#overriding-methods).

## Final Classes

The attribute 🔏 marks a class as final. A final class cannot be subclassed or
an compiler error will be raised.

>!H Marking a class as final not only makes your intent clear but can also
>!H lead to performance improvements. Although the
>!H compiler tries to automatically detect final classes, it cannot do so in
>!H packages that export types.

The following example will raise a compiler error as 🐟 is attributed with 🔏.

```!
🔏 🐇 🐟 🍇
  🆕 🍇🍉
🍉

🐇 🐡 🐟 🍇

🍉
```

## Deprecation

From time to time methods or initializers need to be deprecated. Emojicode
allows you to mark a method or initializer as deprecated with the ⚠️ attribute.

The compiler will emit a warning wherever a deprecated method or initializer is
used.
