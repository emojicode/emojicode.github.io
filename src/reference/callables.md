# Callables

Emojicode supports a type called *callables*. Callables are like methods (or
more generally functions) that can be passed like any other object.

## Type

The type of a callable is denoted using this syntax:

```syntax
$callable-type$-> 🍇 [$type-list$] [$return-type$] [$error-type$] 🍉
$type-list$-> $type$ | $type$ $type-list$
```

Each of the types provided before the return type stands for one argument of
that type. The return type is optional. If no return type is specified the
callable does not return a value. An error-type can be specified.

Examples:

```
🍇🔢➡️🔡🍉  💭 Takes an integer argument and returns a string
🍇➡️🔣🍉  💭 Takes no arguments and returns a symbol
🍇🍉  💭 Takes no arguments and does not return a value.
🍇🔢➡️🔡🚧🚧🍉  💭 May raise a 🚧
```

## Calling a Callable

Callables are called using this syntax.

```syntax
$callable-call$-> ⁉️ $expression$ [$arguments$] $mood$
```

The first expression must be a callable.

Example of calling a callable:

```
💭 greet is of type 🍇🔡🍉
⁉️ greet 🔤Bob🔤❗️
```

An error-prone callable must be handled like any error-prone call by using
🔺, 🍺 or 🥑.

## Closure

Closures are blocks of code that are not immediately executed but remember the
context in which they were created, i.e. the variables and the context of the
method, and can be passed around. The type of a closure is, of course,
a callable.

A closure is created by a block of code that appears when an expression is
expected. This means that every code block that is not part of an ↪️, 🙅, or 🙅↪️
🔂 or 🔁 statement or a method or initializer declaration, is a closure.

In contrast to a normal code block, a closure can define arguments and a return
type similar to a method.

Formally, its syntax is:

```syntax
$closure$-> 🍇 [🎍🥡] [$closure-parameters$] [$return-type$] $statements$ 🍉
$closure-parameters$-> $variable$ $type$ [$closure-parameters$]
```

We can define a very simple closure that does not capture any context like this:

```
🍇 name 🔡
  😀 🍪🔤It is a plesaure to welcome the honorable 🔤 name🍪 ❗️
🍉 ➡️ greet

⁉️ greet 🔤Linda🔤❗️
```

Running this code would print:

```
It is a plesaure to welcome the honorable Linda
```

### Capturing Variables and Context

>!H You should be familiar with [Borrowing and Escaping Use](../reference/classes-valuetypes.html#borrowing-and-escaping-use) before reading this section.

Let’s take a look at this example:

```
🐇 🍤 🍇
  🐇❗️💚 g 🍇🔡➡️🔡🍉 🍇
    😀 ⁉️g 🔤DARTH VADER🔤❗️❗️
  🍉
🍉

🏁 🍇
  🔤LUKE🔤 ➡️ 🖍🆕var

  💚🐇🍤 🍇 g🔡 ➡️🔡
    ↩️ var
  🍉❗️
🍉
```

Running the above code will print `LUKE`. In the above example the value `var`
was declared and assigned outside the closure. This is called a captured
variable. Much the same, you can capture the 🐕 context in a closure.

Actually, however, we need to distinguish between escaping and non-escaping
closures. By default, every closure is non-escaping and cannot be used as an
escaping value. To define an escaping closure the 🍇 must be immediately
followed by 🎍🥡. When creating a thread, for instance, an escaping closure is
required:

```
🆕🧵🆕 🍇🎍🥡

🍉❗️
```

Escaping closures can capture variables, just like non-escaping closures.
However, in escaping closures, the captured variables are constant.
In non-escaping closures,
the captured variables can be modified, as seen in this example:

```
🏁 🍇
  🔤LUKE🔤 ➡️ 🖍🆕var

  😀 var❗️

  💚🐇🍤 🍇 g🔡 ➡️🔡
    g ➡️ 🖍var
    ↩️ 🔤DEATH STAR🔤
  🍉❗️

  😀 var❗️
🍉
```

The output of the above code (💚🐇🍤 is defined in a previous example) will be:

```
LUKE
DEATH STAR
DARTH VADER
```

`var` was modified inside the closure and is set to the value `g` passed into
the closure, which in our case was “DARTH VADER”. This does not work with an
escaping closure.

The following example demonstrates capturing the 🐕 context and modifying
an instance variable:

```
🐇 🕵 🍇
  🖍🆕 name 🔡

  🆕 🍼 name 🔡 🍇🍉

  ❗️ 🛍 title 🔡 ➡️ 🍇🔡🍉 🍇
    ↩️ 🍇🎍🥡 a 🔡  💭 Returning lets the value escape
      🍪 title 🔤 🔤 a 🍪 ➡️ 🖍name
    🍉
  🍉
🍉

🏁 🍇
  🆕🕵🆕 🔤Arthur Lemming🔤❗️ ➡️ pi
  🛍pi 🔤Dr🔤❗️ ➡️ nameSetterDr
  ⁉️nameSetterDr 🔤Jessica Jones🔤 ❗️
  😀 ⁉️nameGetter️❗️❗️
🍉
```

Note that you can capture the object context of a class type in both non-escaping
and escaping closures and also modify its instance variables. The context
of value types and enums, though, can only be captured in non-escaping closures.
Thus the above sample would not compile if 🕵 was a value type.

The example belows shows how the instance variable of a value type can be
captured in a non-escaping closure:

```
🕊 🌼 🍇
  🖍🆕 string 🔡 ⬅️ 🔤YODA🔤

  🆕 🍇🍉

  🖍❗️ ☄️ 🍇
    💚🐇🍤 🍇 g🔡 ➡️🔡
      g ➡️ 🖍string
      ↩️ 🔤STORMTROOPER🔤
    🍉❗️
  🍉
🍉
```

