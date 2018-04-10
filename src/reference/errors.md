# Error Handling

Proper mechanisms to handle errors are an integral part of modern programming
languages. Being a modern language, Emojicode provides a sophisticated but
light-weight way to handle errors.

## The 🚨 Types

Emojicode provides special types to handle errors. Those are called 🚨 types or
error types. An error type is always composed of two other types: An enumeration
that serves as the *error enumeration*, which indicates the kind of error if an
error occurs, and a contained type, i.e. the type that is present if no error
arises.

For instance, a method that normally returns a 🔡 can declare that it will
return an instance of 🏜 in case of an error like this:

```
❗️ 🙅 ➡️ 🚨🏜🔡 🍇
```

An instance of a 🚨 type therefore either contains an error in the form of an
enumeration value or a value of the contained type.

## The 🚨 Statement

An error can only ever be created and raised inside a function. In a function
the 🚨 statement, which works similar to ↩️, is used to create the error and
return it from the function.

```syntax
$error$-> 🚨 $expression$
```

The expression must evaluate to an instance of the error enumeration. The
example below shows a class, which stands for a microphone. It has a method
called 🎬 that might fail in some cases, in which an error is returned:

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

Since initializers can fail too, Emojicode allows initializers to return
errors. The error enumeration is declared after the 🆕 like this:

```
🆕 🚨⛰ 🦀 frequency 🚀 🍇
```

A contained value must not be provided, as the contained value is obviously
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

### Error Initializers and Super Initializer Calls

Note that if you call a super initializer that could raise an error, your
initializer must also declare that it can return an error. The error enumeration
of your initializer and the super initializer must be identical.

If the super initializer then returns an error, your initializer will also
return immediately with the same error.

## 🥑 Error Check Control

Emojicode provides a control flow mechanism that is specifically designed for
error checking:

```syntax
$error-check-control$-> 🥑 $variable$ $expression$ $block$ 🍓 $variable$ $block$
```

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

```syntax
$is-error$-> 🚥 $expression$
```

🚥 returns 👍 if the value is an error or 👎 false if its not an error and
contains a value.

## Unwrapping Errors

As with optionals, you can use 🍺 to unwrap an error, that is to fetch its
contained value without any prior checking. If the error, however, does not
contain a value but does represent an error state the program will panic.
