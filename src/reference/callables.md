# Callables

Emojicode supports a type called *callables*. Callables are like methods (or
more generally functions) that can be passed like any other object.

## Type

The type of a callable is denoted using this syntax:

```syntax
$callable-type$-> 🍇 [$type-list$] [$return-type$] 🍉
$type-list$-> $type$ | $type$ $type-list$
```

Each of the types provided before the return type stands for one argument of
that type. The return type is optional. If no return type is specified the
callable does not return a value.

Examples:

```
🍇🔢➡️🔡🍉  💭 Takes an integer argument and returns a string
🍇➡️🔣🍉  💭 Takes no arguments and returns a symbol
🍇🍉  💭 Takes no arguments and does not return a value.
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
$closure$-> 🍇 [$parameters$] [$return-type$] $statements$ 🍉
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

### Capturing Variables

Let’s take a look at a more advanced use of a closure:

```
🐇 🍤 🍇
  🐇❗️ 🙋 name 🔡 ➡️ 🍇🔢➡️🔡🍉 🍇
    ↩️ 🍇 hour 🔢 ➡️ 🔡
      ↪️ hour 🙌 12 🍇
        ↩️ 🍪 🔤Have a good lunch, 🔤 name🍪
      🍉
      ↩️ 🍪 🔤Hello, 🔤 name🍪
    🍉
  🍉
🍉
```

Here we’ve got a type method that returns a closure. The closure actually
closes over the `name` variable here and copies it value so that it can be used
when the closure is called later.

Now, if we call that type method we’ll get a closure:

```
🙋🐇🍤 🔤Violet🔤❗️ ➡️ violetGreeter
```

We can call the closure with an argument for `hour`

```
😀 ⁉️violetGreeter 14❗️❗️
😀 ⁉️violetGreeter 12❗️❗
```

and will get this:

```
Hello, Violet
Have a good lunch, Violet
```

>!N Closures **copy** the closured **local variables** and freeze them in the scope of the closure.
>!N If you modify one of the copied variable only the copy local to the closure will be modified.
>!N
>!N **Instance variables** are **not copied** and change when modified inside a closure.
