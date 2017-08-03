# Error Handling

Proper mechanisms to handle errors are an integral part of modern program
languages. Being a modern language, Emojicode provides a sophisticated but
light-weight way to handle errors.

## The 🚨 Type

Emojicode provides a special type: 🚨. A 🚨 type is always composed pf two other
types: An enumeration that serves as the *error enumeration*, which indicates
the kind of error if an error occurs, and a contained type, i.e. the type that
is present if no error arises.

For instance, a method that normally returns a 🔡 can declare that it will
return an instance of 🏜 in case of an error like this:

```
🐖 🙅 ➡️ 🚨🏜🔡 🍇
```

An instance of a 🚨 type therefore either contains an error in the form of an
enumeration value or a value of the contained type.

## The 🚨 Statement

An error can only ever be created and raised inside a function. In a function
the 🚨 statement, which works similar to 🍎, is used to create the error and
return it from the function. Its syntax is:

<pre class="syntax">
$error$-> 🚨 $expression$
</pre>

The expression must evaluate to an instance of the error enumeration. The
example below shows a class, which stands for a microphone. It hash a method
called 🎬 that in some cases might fail, in which an error is returned:

```
🦃 ⛰ 🍇
  🔘🔋
  🔘🌊
🍉

🐇 🎤 🍇
  🍰 battery 🚀

  👴 ...

  🐇🐖 🎬 ➡️ 🚨⛰🔡 🍇
    🍊 ◀️ battery 0.1 🍇
      🚨🔷⛰🔋 👴 Too low battery, return an error
    🍉
    🍎 🔤Ladies and gentlemen...🔤 👴 Everything fine, we return a string
  🍉
🍉
```

## Error Initializer

Since initializers can fail too, Emojicode also allows initializers to return
errors. The error enumeration is declared after the 🐈 like this:

```
🐈 🚨⛰ 🦀 frequency 🚀 🍇
```

A contained value must not be provided, as the contained value is obviosuly
the type instantiated.

Here's an example of an initializer that returns an error:

```
🦃 ⛰ 🍇
  🔘🔋
  🔘🌊
🍉

🐇 🎤 🍇
  🐈 🚨⛰ 🦀 frequency 🚀 🍇
    🍊 ◀️ frequency 520 🍇
      🚨🔷⛰🌊 👴 frequency must be greater than 520 MHz so return an error
    🍉
    👴 ...
  🍉
🍉
```

## 🥑 Error Check Control

Emojicode provides a control flow mechanism that is specifically designed for
error checking:

<pre class="syntax">
$error-check-control$-> 🥑 $variable$ $expression$ $block$ 🍓 $variable$ $block$
</pre>

The 🥑 works in a straight-forward way. If the expression evaluates to an 🚨
instance that does not represent an error, the first block is executed an the
variable is set to the value contained in the 🚨. If, however, the 🚨 does
represent an error the 🍓 block is entered its variable is set to the error
enumeration instance.

Example:

```
🥑 fileData 🍩📇📄 🔤textDocument.txt🔤 🍇
  😀 🍪🔤Read 🔤 🔡 🐔 fileData 10 🔤 bytes🔤 🍪
🍉
🍓 error 🍇
  😀 🔤😢 Could not read file🔤
🍉
```

## 🚥 Test for Errors

To test whether an 🚨 instance represents an error the 🚥 expression is used.

Syntax:

<pre class="syntax">
$is-error$-> 🚥 $expression$
</pre>

🚥 returns 👍 if the value is an error or 👎 false if its not an error and
contains a value.

## 🚇 Perfect Extraction

If you are sure that an 🚨 instance will never represent an error you can use
the 🚇 expression to the take contained value without prior error checking.

Syntax:

<pre class="syntax">
$perfect-extraction$-> 🚇 $expression$
</pre>

If, though, the 🚨 instance represents an error at runtime the program will
abort with a run-time error similar to:

```
🚨 Fatal Error: Unexpectedly found 🚨 with value 2.
```

## Compatibility of the 🚨 Type

🚨 types are intentionally not compatible to other types to enforce prompt error
handling. 🚨 types are only compatible to other types with the exact same error
enumeration and contained type.
