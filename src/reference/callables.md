# Callables

Emojicode supports a type called *callables* which is comparable to function
types in other programming languages. Callables are objects like any other
object and can therefore be stored in variables, passed as argument, etc.

## Type

The callable type is declared using this syntax:

<pre class="syntax">
🍇 $[type-list]$ $[return-type]$ 🍉
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
🍭 $callable$ $[arguments]$
</pre>

*callable* must be a callable. Of course you must provide the required number of
correctly typed arguments.

Example of calling a callable:

```
👴 greet is of type 🍇🔡🍉
🍭 greet 🔤Bob🔤
```

## Capturing Method Calls

You can *capture* method calls on instances and types. This creates a callable
that takes as many arguments of the same type as the method would take and
returns the same value as the method would return. This callable will always
execute the method in the same context, though.

The syntaxes are:

<pre class="syntax">
🌶 $method-name$ $instance$
</pre>

*method-name* is the emoji representing the method. *instance* must be an
instance which has a method *methodName* and can be either a class or value type
instance.

<pre class="syntax">
🌶🍩 $method-name$ $type$
</pre>

This syntax is used to capture type methods. *method-name* is the emoji
representing the method. *type* must be a type identifier whose type method
should be captured.

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

## Closure

You can define closures which remember the environment in which they were
defined. The basic syntax to define a closure is:

<pre class="syntax">
🍇 $[arguments]$ $[return-type]$

🍉
</pre>

This is basically the same syntax that applies to methods and initializers.

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

Here we’ve got a class method that returns a closure. The closure actually
closes over the `name` variable here and copies it value so that it can be used
when the closure is called later.

>!N Closures **copy** the closured **local variables** and freeze them in the scope of the closure.
>!N If you modify one of the copied variable only the copy local to the closure will be modified.
>!N
>!N **Instance variables** are **not copied** and really change when modified inside a closure.

Now if we call the class method we’ll get a closure:

```
🍦 walfriedGreeter 🍩🙋🐀 🔤Walfried🔤
```

Now we can call the closure with an argument for `hour`:

```
😀 🍭 walfriedGreeter 7
😀 🍭 walfriedGreeter 12
```

This will produce:

```
Hello, Walfried
Have a good lunch, Walfried
```
