# Inheritance and Overriding

>!N This chapter has not been revised for Emojicode Symphonic alpha yet.

Inheritance allows instances of a more concret class to be treated like
instances of a less concrete class. When you subclass a class, the subclass
inherits all methods and type methods. Initializers are only inherited under
special conditions.

## Initializer Inheritance

In Emojicode, initializers are only inherited by subclasses if the subclass
meets these criteria:

- The subclass does not define any instance variables.
- The subclass does not define any initializer.

If the subclass doesn’t fullfil these criteria, the subclass doesn’t inherit
any initializers.

## Required Initializers

Sometimes it’s desired that all subclasses of a class have a specific
initializer. In this case, a required initializer can be used.

An initializer can be marked as required witt the 🔑 attribute. Subclasses must
implement all initializers marked with 🔑 themselves if they aren't eligible
for initializer inheritance. These initializer again must then be marked with
🔑, thereby enforcing that all descendants of the original class provide the
required intalizer.

This example defines an initializer 🌱 all descendants of 🌼 must provide:

```
🐇 🌼 🍇
  🔑 🐈 🌱 🍇 👴 Every flow can be constructed by seeding it

  🍉
🍉

🐇 🌻 🌼 🍇
  👴 The sunflower just inherits the initializers
🍉

🐇 🌺 🌼 🍇
  👴 The hibiscus additionally stores its color
  🍰 color 🔡

  👴 Therefore, we must implement 🌱 ourselves and set color to some default
  🔑 🐈 🌱 🍇
    🍮 color 🔤red🔤
    🐐 🌱
  🍉

  👴 An initializer to get an hibiscus with a specific color
  🐈 🎨 🍼 color 🔡 🍇
    🐐 🌱
  🍉
🍉
```

## Overriding Methods

A subclass can override a method defined in a superclass, that is providing
a new implementation of it.

A method is overriden by redeclaring it in the subclass with the ✒️ attribute.
As for example:

```
🐇 🌼 🍇
  🐖 ⏰ time 🔢 🍇
    👴 Open and close the blossom according to the time...
  🍉
🍉

🐇 🌻 🌼 🍇
  ✒️ 🐖 ⏰ time 🔢 🍇
    👴 Sunflowers also rotate to face the sun....
    🐿 ⏰ time 👴 Open and close like other flowers; see below
  🍉
🍉
```

The same logic applies to type methods.

## Calling Super Methods

Inside a method you can use this syntax to call the super method:

```syntax
$super$-> ⤴️ $emoji-id$ [$arguments$]
```

This simply calls the super method named *method-emoji* and returns it value.
You have already seen an example above.

## Promises

You must watch out not to break the superclass’s *promises* when overrding
methods. Promises are a set of rules that ensure that the methods and required
intializers of a class can be used the same way as the ones of the superclass –
a main characteristic of object orientation. These promises are:

- The method or initializer of the subclass must take the same number of
  arguments.
- The return type of the method or initializer of the subclass must be the
  same or a subtype of the return type of the overriden method or intializer.
- The arguments of the method or initializer of the subclass must be of the same
  type or a super type of the argument types of the overriden method or
  intializer.
- The method or initializer of the subclass must have the same accessibility
  or be more accessible.
