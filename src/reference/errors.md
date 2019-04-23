# Errors

Proper mechanisms to handle errors are an integral part of modern programming
languages. Being a modern language, Emojicode provides a sophisticated but
light-weight way to handle errors.

## Error-Proness

Emojicode supports error handling for any kind of method, initializer or
closure.

In Emojicode errors are represented by instance of the 🚧 or its subclasses.
For instnace, the class 🚧🔸↕️ is used to represent errors that occur during
input/output operations, such as when reading a file.

In case a method, initializer or closure may fail, it should be declared as
error-prone. Error-proness is indicated using the identifier 🚧 directly before
the function’s body.

```syntax
$error-type$-> 🚧 $type$
```

The 🚧 identifier is immediately followed by the type of error that may be raised
by the function. In the example below, the first and second declaration indicate
that the declared class method and initializer may raise input/output errors
while the last method could raise any kind of error. This type is referred to as
the error type.

```
🐇❗️ 📁 path 🔡 🚧🚧🔸↕️ 🍇 💭 ...

🆕📝 path 🔡 🚧🚧🔸↕️ 🍇 💭 ...

🐇❗️ 🤦‍♂️ ➡️ 🔡 🚧🚧 🍇 💭 ...

🐇❗️ 💛 🚧🚧 🍇 💭 ...
```

## Raising Errors

To raise an error the 🚨 statement, which works similar to ↩️, is used.

```syntax
$raise$-> 🚨 $expression$
```

The expression must evaluate to an object instance compatible to the declared
error type:

```
🐇❗️ 🤦‍♂️ ➡️ 🔡 🚧🚧 🍇
  🚨🆕🚧🆕🔤Too low on charge🔤❗️
🍉
```

## Calling Error-Prone Functions

An error-prone method, initializer or callable cannot be called without
explicit handling of potential errors. If you try anyway, you’ll get a compiler
error. There are three options.

### 🍺 Not Handling Errors

As with optionals, you can use 🍺 to make a call to an error-prone function
and disregard the possibility of an error arising. If an error, however, is
raised during execution the program will panic.

```
🍺🆕📄📝 🔤file.txt🔤❗️ ➡️ file
```

Unless you are absolutely sure that a call will never raise an error, using 🍺
is a bad idea.

### 🔺 Reraising Errors

🔺 can be used to reraise all arising errors. This means that if an error
is returned by the called function, the calling function itself will raise the
error and return immediately. Naturally, the calling function must declare an
error type to which the error type of the called function is compatible.

```
🐇❗️ 🍌 ➡️ 🔡 🚧🚧 🍇
  ↩️🔺🤦‍♂️🐇🐟❗️
🍉
```

In the above example, the 🍌 class method will return the value returned by 🤦‍♂️
if returns normally. If 🤦‍♂️ raises an error though, 🍌 will forward it to its
own caller.

```syntax
$reraise$-> 🔺 $expression$
```

### 🥑 Handling Errors

The third mechanism is a control flow statment. It allows you to specify to
code blocks. While one is executed in the case of error-free execution, the
other is called in the case of an error and provided with the error object.

```syntax
$error-check-control$-> 🥑 [$variable$] $expression$ $block$ 🙅 $variable$ $block$
```

The provided expression must be an error-prone call. If no error is raised,
the first block is called and the variable, if provided, will contain the
returned value. If an error does occur, the second block is called an the
specified variable will be set to the error. The variable’s type is the error
type of the called function.

Example:

```
🥑 a 🤦‍♂️🐇🐟❗️ 🍇
  😀 a ❗️
🍉
🙅 error 🍇
  😀 🍪🔤An error occured: 🔤 💬error❗️ 🍪 ❗️
🍉
```

You must not provide a variable if the call does not return a value. You may
omit a variable name even though the function returns a value if you do not
require the return.

```
🥑 🤦‍♂️🐇🐟❗️ 🍇  💭 We are not interested in the return
  💭 ...
🍉
🙅 error 🍇
  😀 🍪🔤An error occured: 🔤 💬error❗️ 🍪 ❗️
🍉

🥑 💛🐇🐟❗️ 🍇  💭 💛 does not return a vlue
  💭 ...
🍉
🙅 error 🍇
  😀 🍪🔤An error occured: 🔤 💬error❗️ 🍪 ❗️
🍉
```

## Error-Prone Super Initializer Calls

If you call a super initializer that might fail, your initializer must be
declared error-prone with an error type to which the error type of the super
initializer is compatible to. In case the super initializer raises an error,
initialization is aborted and the calling initializer reraises the error.

```
🐇 🐫 🚧 🍇
  💭 ...
🍉

🐇 🐟 🍇
  🆕 🆒 🚧🐫 🍇
    💭 ...
  🍉
🍉

🐇 🐡 🐟 🍇
  🆕👅 🚧🐫 🍇
    ⤴️🆒❗️
  🍉
🍉
```


