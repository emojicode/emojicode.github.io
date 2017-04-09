# Error Handling

Proper mechanisms to handle errors are an integral part of modern program
languages. Being a modern language, Emojicode provides a sophisticated but
light-weight way to handle errors.

## The 🚨 Type

Emojicode provides a special error type that is denoted by 🚨. 🚨 is always
followed by two other types: An enumeration that serves as the error enumeration
indicating the kind of error if one occurs and a contained type – the type that
is present if no error arises.

For instance, a method that normally returns a 🔡 can declare that it will
return an instance of 🏜 in case of an error will declare its return type
like this:

```
🐖 🙅 ➡️ 🚨🏜🔡 🍇
```

### Compatibility of the 🚨 Type

🚨 types are intentionally not very compatible to enforce prompt error handling
and to prevent errors from being passed round too easily. 🚨 types are only
compatible to other types with the exact same error enumeration and contained
type.

## The 🚨 Statement

Inside a method whose return type is an 🚨 type the 🚨 can be used to return
an error:

```
🦃 🏜 🍇
  🔘🔋
  🔘🍟
🍉

🐇 👩‍🎤 🍇
  🐇🐖 🙅 ➡️ 🚨🏜🔡 🍇
    🚨🔷🏜🔋
  🍉
🍉
```

## 🚥 Test for Errors

If you want to make sure that an instance of 🚨 does not represent an error
but does contain a value you can use the 🚥 expression.

Syntax:

<pre class="syntax">
🚥 $expression$
</pre>

🚥 returns 👍 if the value is an error or 👎 false if its not an error and
contains a value.

## 🥑 Error Check Control

<pre class="syntax">
🥑 $variable$ $expression$
  $block$
🍓 $variable$
  $block$
</pre>

## 🚇 Perfect Values

If you are sure that an 🚨 instance will never represent an error you can use
the 🚇 expression to the take contained value without prior error checking.

Syntax:

<pre class="syntax">
🚇 $expression$
</pre>

If, tough, the 🚨 instance represents an error at runtime the program will
abort with a run-time error similar to:

```
🚨 Fatal Error: Unexpectedly found 🚨 with value 2.
```
