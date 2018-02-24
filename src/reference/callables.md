# Callables

Emojicode supports a type called *callables* which is comparable to function
types in other programming languages. Callables are objects like any other
object and can therefore be stored in variables, passed as argument, etc.

## Type

The callable type is declared using this syntax:

<pre class="syntax">
$callable-type$-> 🍇 [$type-list$] [$return-type$] 🍉
$type-list$-> $type$ | $type$ $type-list$
</pre>

Each *type* stands for one argument of that type. You can specify a
*returnType*. If no return type is specified the callable is assumed to return
Nothingness.

Examples:

```
🍇🚂➡️🔡🍉 👴Takes an integer argument and returns a string
🍇➡️🔣🍉 👴Takes no arguments and returns a symbol
🍇🍉 👴Takes no arguments and returns nothing(ness).
```

## Calling a Callable

The 🍭 must be used to call a callable.

<pre class="syntax">
$callable-call$-> 🍭 $expression$ [$arguments$]
</pre>

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

<pre class="syntax">
$closure$-> 🍇 [$arguments$] [$return-type$] $statements$ 🍉
</pre>

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
🐇🐖 🙋 name 🔡 ➡️ 🍇🚂➡️🔡🍉 🍇
  🍎 🍇 hour 🚂 ➡️ 🔡
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

## Capturing Method Calls

>!N Capturing is deperecated as of 0.5.4 and will be removed in an upcoming
>!N version of Emojicode. Use normal closures instead.

You can *capture* method calls on instances and types. This creates a callable
that takes as many arguments of the same type as the method would take and
returns the same value as the method would return. This callable will always
execute the method in the same context, though.

The syntax is:

<pre class="syntax">
$method-capture$-> 🌶 [🍩] $method-emoji$ $capturee$
$capturee$-> $expression$ | $type$
</pre>

*method-name* is the emoji representing the method. If you want to capture
a type method, place the 🍩 in front of the method name. Iff a type method is
to be caputred *capturee* must be a type.

Example:

```
🍦 string 🔤Strawberry🔤

🍦 append 🌶 📝 string

😀 🍭 append 🔟!
😀 🍭 append 🔟?
```

You might have gueesed it, the output of the above is:

```
Strawberry!
Strawberry?
```

You cannot capture method calls on value types as capturing value type
methods would be dangerous since the value type’s storage could go out of scope
while the callable is retained.
