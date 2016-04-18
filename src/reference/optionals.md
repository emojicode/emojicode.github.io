# Optionals and Nothingness

## ✨ Nothingness

Nothingness is a value used to represent a missing value. Many methods, for
example, return nothingness on failure. Additionally any method that does not
explicitly declare a return type is assumed to return Nothingness.

To get Nothingness you use:

```
⚡️
```

While Nothingness is a completely valid type and value on its own, it’s normally
used in conjunction with *Optionals*.

## 🍬 Optionals

An optional is a way to make a type optional. This is like saying: either it’s
something of the delcared type, or it’s Nothingness. Optionals are very userful
in cases where a value might be missing or a method migh fail and return nothing
instead of a expected value.

To make a type optional you need to prepend a 🍬. Examples:

```
🍰 buildingAge 🍬🚂 👴The age of old buildings is often not known exactly.
🍰 petName 🍬🔡 👴Some pets have no name.
```

There are many methods that return Nothingness on failure. For instance the
method 🔬 of 🔡, which returns the symbol at the given index or Nothingness.

```
🍦 first 🔬 🔤Kumquat🔤 0
🍦 twelfth 🔬 🔤Kumquat🔤 11
```

As you can see `first` will now actually contain a symbol and `twelfth` will
only contain Nothingness.

The point of Optionals is providing more safety. This is achieved by forcing
the programmer to take special care of optionals as optionals cannot be used
like the they make optionals.

## 🍺 Unwrapping

If you want to use the value of `first` or `twelfth` from the example above
you could unwrap the optional using 🍺:

```
🍺 object
```

This tells Emojicode to check that the given value is not Nothingness and
returns it. If the value, however, is Nothingness the program will terminate
with an error message like:

```
🚨 Fatal Error: Unexpectedly found ✨ while unwrapping a 🍬.
```

Naturally unwrapping an optional without a check is not safe and should not
be done. See the sections below for safe ways.

## ☁️ Nothingness Test

You can use ☁️ to test if an optional is Nothingness.

```
☁️ value
```

☁️ returns true if *value* is Nothingness.

## 🍊🍦 Condition Assignment

An even more useful way to protect from Nothingness is the Condition Assingment.
You can combine 🍊 or 🍋 with 🍦 to one statement with this syntax:

```
🍊🍦 variableName value
```

or

```
🍋🍦 variableName value
```

This will unwrap and set the value of *value*  into the variable *variableName*
and execute the code block assigned if *value* is not Nothingness. If *value* is
not Nothingness the 🍊 or 🍋 statement will behave as if an expression evaluated
to true; otherwise the 🍊 or 🍋 statement will behave as if the expression
evaluated to false.

Example:

```
🍊🍦 string 🔲 sth 🔡 🍇
  😀 🍪🔤sth is a string with this content: 🔤 string🍪
🍉
```

## 🍻 Optional method call

Using 🍻 you can perform a method call on an object, without the need to check
if it’s actually Nothingness inside. The call will only be executed if *object*
is not Nothingness.

Syntax:

```
🍻 methodEmoji object [arguments ...]
```

🍻 returns the return of the method as optional.

You can of course encapsulate several 🍻 calls. E.g.

```
🍰 w 🍬🔡

🍻 😀 🍻 📝 w 🔟!
```
