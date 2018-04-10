# Callables

>!N This chapter has not been revised for Emojicode Symphonic alpha yet.

Emojicode supports a type called *callables* which is comparable to function
types in other programming languages. Callables are objects like any other
object and can therefore be stored in variables, passed as argument, etc.

## Type

The callable type is declared using this syntax:

```syntax
$callable-type$-> 🍇 [$type-list$] [$return-type$] 🍉
$type-list$-> $type$ | $type$ $type-list$
```

Each *type* stands for one argument of that type. You can specify a
*returnType*. If no return type is specified the callable is assumed to return
Nothingness.

Examples:

```
🍇🔢➡️🔡🍉 👴Takes an integer argument and returns a string
🍇➡️🔣🍉 👴Takes no arguments and returns a symbol
🍇🍉 👴Takes no arguments and returns nothing(ness).
```

## Calling a Callable

The 🍭 must be used to call a callable.

```syntax
$callable-call$-> 🍭 $expression$ [$arguments$]
```

*expression* must be a callable. Of course you must provide the required number
of correctly typed parameters.

Example of calling a callable:

```
👴 greet is of type 🍇🔡🍉
🍭 greet 🔤Bob🔤
```

## Closure

Closures are blocks of code that are not immediately executed but remember the
context in which they were created, i.e. the variables and the context of the
method, and can be passed around. The type of a closure is, of course,
a callable.

A closure is created by a block of code that appears when an expression is
expected. This means that every code block that is not part of an 🍊, 🍓, or 🍋
🔂 or 🔁 statement or a method or initializer declaration, is a closure.

In contrast to a normal code block, a closure can define arguments and a return
type similar to a method.

Formally, its syntax is:

```syntax
$closure$-> 🍇 [$arguments$] [$return-type$] $statements$ 🍉
```

Example:

```
🍦 greet 🍇 name 🔡 ➡️ 🔡
  🍮 out 🔤🔤

  🔂 i ⏩ ➖ 🐔 name 1 -1 🍇
    🍮 out 📝 out 🍺 🐽 name i
  🍉

  🍎 out
🍉

😀🍭 greet 🔤Franz🔤
```

The above is a very simple example of a closure that simply reverses a given
string and will output:

```
znarF
```

Let’s take a look at a more advanced use of a closure:

```
🐇🐖 🙋 name 🔡 ➡️ 🍇🔢➡️🔡🍉 🍇
  🍎 🍇 hour 🔢 ➡️ 🔡
    🍊 😛 hour 12 🍇
      🍎 🍪 🔤Have a good lunch, 🔤 name🍪
    🍉
    🍎 🍪 🔤Hello, 🔤 name🍪
  🍉
🍉
```

Here we’ve got a type method that returns a closure. The closure actually
closes over the `name` variable here and copies it value so that it can be used
when the closure is called later.

>!N Closures **copy** the closured **local variables** and freeze them in the scope of the closure.
>!N If you modify one of the copied variable only the copy local to the closure will be modified.
>!N
>!N **Instance variables** are **not copied** and really change when modified inside a closure.

Now, if we call that type method we’ll get a closure:

```
🍦 walfriedGreeter 🍩🙋🐀 🔤Walfried🔤
```

We can call the closure with an argument for `hour`

```
😀 🍭 walfriedGreeter 7
😀 🍭 walfriedGreeter 12
```

and will get this:

```
Hello, Walfried
Have a good lunch, Walfried
```
