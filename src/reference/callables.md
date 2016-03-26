# Callables

Emojicode supports a type called Callables which is comparable to function types in other programming languages. Callables are actually just objects and can therefore be stored in variables, passed into other methods, etc.

## Type

The callable type is declared using this syntax:

```
🍇 [type ...] [➡️ returnType]🍉
```

Each *type* stands for one argument of that type. You can specify a *returnType*. If no return type is specified the callable is assumed to return Nothingness.

Examples:

```
🍇🚂➡️🔡🍉 👴Takes an integer argument and returns a string
🍇➡️🔣🍉 👴Takes no arguments and returns a symbol
🍇🍉 👴Takes no arguments and returns nothing(ness).
```

## Calling a Callable

The 🍭 must be used to call a callable.

```
🍭 callable [arguments ...]
```

*callable* must be a callable. Of course you must provide the required number of correctly typed arguments.

Example of calling a callable:

```
👴 greet is of type 🍇🔡🍉
🍭 greet 🔤Bob🔤
```

## Capturing a Method Call

You can *capture* a method call on a given object. This creates a function taking all arguments the method would take and returning the same value the method would return, this function however will always execute the method on the same object.

The syntax is:

```
🌶 methodName object
```

*methodName* is the emoji representing the method. *object* must be an object
which has a method *methodName* and to which the method will be bound.

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

You can define closures which remember the environment in which they were defined. The basic syntax to define a closure is:

```
🍇 [(variable type) ...] [➡️ returnType]

🍉
```

This is basically the same syntax that applies to methods and initializers. There may be any number of `variable type`. These define the parameters the closure takes. `variable` must be a valid variable name and type and valid type.

Example:

```
🍦 greet 🍇 name 🔡 ➡️ 🔡
  🍮 out 🔤🔤

  🔂 i ⏩ ➖ 📏 name 1 -1 🍇
    🍮 out 📝 out 🍺 🔬 name i
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

Here we’ve got a class method that returns a closure. The closure actually closes over the `name` variable here and copies it value so that it can be used when the closure is called later.

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
