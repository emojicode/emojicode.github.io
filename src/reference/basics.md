# The Basics

Emojicode is a language that aims to provide the most modern and powerful
features to make it easy, fast and fun to write programs. These powerful
features include classes, optionals, which can handle the absence of a value,
generics, closures and much more.

Emojicode is a strongly typed language, which means that the compiler will
verify that all of your operations are correct. This, for instance, prevents you
from treating a number as a list of texts.

Although Emojicode only uses Emojis to express the program’s structure, it is
similar to programming languages you might know, like C.

Emojicode was designed to allow the development of platform independent
applications by running them inside a virtual machine. Your code is first
compiled to bytecode by a compiler and can then be executed. The reference
implementation of such a virtual machine is called *Emojicode Real-Time* and
can, as the name suggests, execute your code rather fast.

>!H If you need guidance on how to use the compiler and the Real-Time Engine
>!H see
>!H [“Compile and Run Your First Program”](../guides/compile-and-run.html),
>!H which is a short tutorial on writing applications in Emojicode.

## Comments

You can include non-executable text in your code by marking it as a comment.
Comments begin with 👴 and end at the line break.

Example:

    👴 This comment ends at the end of the line. Exactly here

Multiline comments starts with 👵 and ends with 👵 and can contain line breaks.

Example:

    👵 This is a multiline comment. You can even make
    line breaks. 👵

## The 🏁 block

Emojicode needs to know what your program should do when it starts, therefore
it requires you to provide a *🏁 block*. Here’s an example of a 🏁 block.

```
🏁 🍇
  👴 Get things up and running here...
🍉
```

The 🏁 block can also return an integer which is then used as the exit code:

```
🏁 ➡️ 🚂 🍇
  👴 Get things up and running here...

  🍎 0 👴 Return a code here.
🍉
```

It occurs at the document level of a document.

## When to use Emojis?

There’s sometimes confusion when emojis are used. Basically it’s very simple:

All **type, method, class method and initializer** names are **Emojis**. On the
other hand **variables cannot include emojis** but must be any combination of
characters that cannot be confused with numbers.

## Variables

Variables pair a name, the *variable name*, with a value. The variable name can
consist of any sequence of characters but **may not contain spaces or emojis**
and may not begin with a number.

There are two types of variables: normal variables and frozen variables. Frozen
variables differ from normal ones in that they cannot be changed after
they were initially set.

### 🍦 Declaring a Frozen Variable

The easiest way to declare and set a frozen variable at once is to use 🍦.

```
🍦 daysInDecember 31
🍦 approximationOf𝜋 3.14159265359
```

The above code sets the variable `daysInDecember` to `31` and `approximationOf𝜋`
to `3.14159265359`. These variables were declared as frozen variables as they
never change.

The compiler infers the type of the variables from the values given.

### 🍮 Setting and Declaring a Variable

To declare or change are normal, changeable variable you should use 🍮. If the
variable you want to set is already declared its value will be changed, given
that it is not frozen; in that particular case an error message would be
emitted. Otherwise the variable is declared in the current scope.

```
🍮 moneyLeft 20
🍮 numberOfTimes“SmokeOnTheWater”WasPlayed 20348292837483929
```

These variables were justifiably declared as changeable variables because they
obviously change often. You should however **always prefer frozen variables if
you don’t intend to modify** the variable.

🍮 can also be used directly followed by an emoji, which is a special use and
called *assignment by call*. Assignment by call is described in
[Classes & Value Types](classes-valuetypes.html#assignment-by-call).

### 🍰 Declaring Variables

You can declare a variable yourself regardless if a variable with the same name
was declared in the parent scope but you may not declare a variable more than
one time.

```
🍰 variableName variableType
```

*variableName* must be a valid variable name. *variableValue* may be an
expression of any type.

After you declared the variable in the local scope you can use 🍮 to set it to a
value. The compiler will throw an error if you try to access an uninitialized
variable. Optionals are automatically initialized to Nothingness.

>!N Beware of that 🍰 can shadow variables from parent scopes and can, for
>!N example, make instance variables inaccessible.

### Scoping

Variables are only accessible from the *scope* in which they were declared.
Every code block (everything between a 🍇 and 🍉) defines a separate scope,
which disappears once the block was executed:

<pre class="negative-example">
🏁 🍇
  🍦 work 🔤Work It Harder Make It Better🔤
  🍊 👍 🍇
    😀 work  👴 work is accessible here
    🍦 doIt 🔤Do It Faster, Makes Us stronger🔤
  🍉
  😀 work  👴 work still works, of course
  😀 doIt  👴 doIt is no longer accessible here
🍉
</pre>

You cannot access scopes beyond the method, class method or initializer from
your code. Nevertheless, you can access the *object scope* in instance methods
and initializers. Closures are also considered an exception from this rule.
You’ll learn more about these two kinds for special scoping in [Classes & Value
Types](classes-valuetypes.html) and [Callables](callables.html).

## Numeric Literals

Integer literals can be written in

- Decimal notation, like `29`
- Hexadecimal notation, with the prefix `0x`, like `0x1D`
- Octal notation, with the prefix `0`, like `035`

You can use `_` within integer literals to improve readability:

    344_000_000_000

The `.` can be used as decimal separator to create a 🚀.

### Number Types

There are only two numeric types in Emojicode:

- 🚂 can represent any integer in the interval [-2<sup>63</sup>+1,
2<sup>63</sup>-1].
- 🚀 can be used to store a real number with the common
limitations. Read this [Wikipedia article](https://en.wikipedia.org/wiki/Double-
precision_floating-point_format) for more information.

## Booleans

Emojicode has a type to represent Boolean values: 👌. A boolean value can either
be true or false. A true value is created using 👍 and a false value is created
using 👎.

In the example below two variables are set to a boolean value.

```
🍦 emojicodeIsTheFunniestLanguage 👍
🍦 phpIsAsCool 👎
```

## Symbol literals

A **Symbol** is a **single Unicode character** represented by the symbol type 🔣.
The symbol type can represent any character defined in Unicode.

You can include the symbol in the source code file by prepending 🔟 before the
desired symbol. This is called a *Symbol literal*.

Example:

```
🍦 percent 🔟%
```

## Including Other Source Code Files

An Emojicode program is always compiled from a single file. Nevertheless, you
can include other source code files. Basically, this just
inserts the code from the file at the point where you included it.

Syntax:

```
📜 string
```

*string* must be a string whose value is a path to another Emojicode source
file. The path is relative to the directory which included the document with the
📜 statement.

>!H Do **not** use this method to share code across projects. If you have
>!H written really fancy code,
>!H [**create a package](/docs/reference/packages.html), which you can easily
>!H make available to other people**.
