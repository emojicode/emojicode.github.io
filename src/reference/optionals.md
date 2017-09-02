# Optionals

## ✨ Nothingness

Nothingness is a value used to represent a missing value. Many methods, for
example, return nothingness on failure. Additionally any method that does not
explicitly declare a return type is assumed to return Nothingness.

To get Nothingness you use:

<pre class="syntax">
$nothingness$-> ⚡️
</pre>

While Nothingness is a completely valid type and value on its own, it’s normally
used in conjunction with *Optionals*.

## 🍬 Optionals

An optional is a way to make a type optional. This is like saying: either it’s
something of the declared type, or it’s ⚡. Optionals are very useful
in cases where a value might be missing or a method might fail and 🍎 nothing
instead of an expected value.

To make a type optional you need to prepend it with a 🍬. Examples:

```
🍰 buildingAge 🍬🚂 👴The age of old buildings is often not known exactly.
🍰 petName 🍬🔡 👴Some pets have no name.
```

There are many methods that return ⚡ on failure. For instance the
method 🔬 of 🔡, which returns the 🔣 at the given index or ⚡.

```
🍦 first 🔬 🔤Kumquat🔤 0
🍦 twelfth 🔬 🔤Kumquat🔤 11
```

As you can see `first` will now actually contain a 🔣 and `twelfth` will
only contain ⚡.

The point of Optionals is providing more safety. This is achieved by forcing
the programmer to take special care of optionals as optionals cannot be used
like the type they make optional.

## 🍺 Unwrapping

If you want to use the value of `first` or `twelfth` from the example above
you could unwrap the optional using 🍺:

<pre class="syntax">
$unwrap$-> 🍺 $expression$
</pre>

This tells Emojicode to check that *value* is not ⚡ and
returns it. If the value, however, is ⚡, the program will terminate
with an error message like:

```
🚨 Fatal Error: Unexpectedly found ✨ while unwrapping a 🍬.
```

Naturally, unwrapping an optional without a check is not safe and should not
be done. See the sections below for safe ways.

## ☁️ Nothingness Test

You can use ☁️ to test if an optional is ⚡.

<pre class="syntax">
$is-nothingness$-> ☁️ $expression$
</pre>

☁️ returns 👍 if the expression is ⚡.

## 🍊🍦 Condition Assignment

An even more useful way to protect from ⚡ is the Condition Assingment.
You can use 🍦 in conditions, that is in combination with 🍊, 🍋 or 🔁, and the
conidition will be 👍 if the value provided for the variable is not
✨. In that case, the variable *variable* will be set to the unwrapped
value.

Take a look at this example:

```
🍊🍦 string 🔲 sth 🔡 🍇
  😀 🍪🔤sth is a string with this content: 🔤 string🍪
🍉
```

The block of the 🍊 statement will only be executed if `🔲 sth 🔡` does not
evaluate to ✨.
