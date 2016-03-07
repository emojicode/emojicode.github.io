# The Basics

## The Compiler

The *Emojicode Compiler* will only correctly compile files that are UTF8 encoded. All files given to the compiler are processed in the order of appearance into one *Emojicode Bytecode file*. The **order of the files can be important** if for instance one file declares a type on which other files depend.

## The Real-Time Engine

The *Emojicode Real-Time Engine* is the part of Emojicode that **actually executes your program**. It takes the bytecode file and executes it. The bytecode file can be executed on any platform on which the engine runs.

The Real-Time Engine was built to load and run bytecode files as quickly as possible. Therefore it does not perform any kind of error checking. Passing a malformed bytecode file to the engine can lead to a crash.

>!H If you are unfamiliar with the command line interfaces you might want to read the guide [“Compile and Run Your First Program”](../guides/compile-and-run.html), which discusses the use of the Emojicode Compiler and the Emojicode Real-Time Engine.

## Comments

You can include non-executable text in your code by marking it as a comment. Comments begin with 👴 and end at the line break.

Example:

    👴 This comment ends at the end of the line. Exactly here

Multiline comments starts with 👵 and ends with 👵 and can contain line breaks.

Example:

    👵 This is a multiline comment. You can even make
    line breaks. 👵

## The 🏁 class method

Emojicode needs to know where your program should start. The compiler will therefore look for a class method called 🏁. This method will be  called on the program startup. Example:

    🐇 ⚽️ 🍇
      🐇🐖 🏁 ➡️ 🚂 🍇
        👴 The code to start up the program goes here.
        🍎 0
      🍉
    🍉

If you don’t understand all the code above yet don’t worry, you will learn more about [class methods ](classes.html#class-methods) and all this stuff in a few minutes.

## When to use Emojis?

There’s sometimes confusion when emojis are used. Basically it’s very simple:

All **type, method, class method and initializer** names are **Emojis**. On the other hand **variables cannot include emojis** but must be any combination of characters that cannot be confused with numbers.

## Variables

Variables pair a name, the *variable name*, with a value. The variable name can consist of any sequence of characters but **may not contain spaces or emojis** and may not start with a number.  

Before its first use a variable is declared and the type of the variable is defined. The variable can only hold values that are compatible to this type.

Variables are only accessible from the *scope* in which they were declared. Every class method, method or initializer defines an own scope which disappears once the procedure has ended. A scope may also allow you to access its *parent scope*, which gives you the opportunity to access the variables inside that scope. Methods and initializer for instance allow you to access the parent scope, which in this case is the *object scope*, in which all instance variables live.

### 🍮 Setting Variables

The easiest way to declare and set a variable is to use 🍮. If the variable can be found its value will be changed. Otherwise the variable will be declared in the current scope. The type of the variable will be inferred from the type of *variableValue*.

	🍮 variableName variableValue

*variableName* must be a valid variable name as described in the introduction. *variableValue* may be an expression of any type.

### 🍦 Setting a Frozen Variable

You can also set and declare a frozen variable. A frozen variable can’t be modified
after its first initialization.
The type of the variable will be inferred from the type of *variableValue*.

	🍦 variableName variableValue

You should **always use frozen variables if you don’t intend to modify** the variable.

### 🍰 Declaring Variables

You can declare a variable yourself regardless if a variable with the same name was declared in the parent scope but you may not declare a variable more than one time.

	🍰 variableName variableType

*variableName* must be a valid variable name. *variableValue* may be an expression of any type.

After you declared the variable in the local scope you can use 🍮 to set it to a value. The compiler will throw an error if you try to access an uninitialized variable.

>!N Beware of that 🍰 can shadow variables from parent scopes and can for instance make instance variables inaccessible.

### 🍫 & 🍳 Incrementing and Decrementing Variables

Variables containing numbers can be incremented by using 🍫 and decremented by using 🍳.

	🍫 numberOfCats
	🍳 watermelons

The above example will increment *numberOfCats* and decrement *watermelons*.


## Numeric Literals

Integer literals can be written in

- Decimal notation, like `29`
- Hexadecimal notation, with the prefix `0x`, like `0x1D`
- Octal notation, with the prefix `0`, like `035`

>!N Be careful, `0xXAD` for instance is an integer (value 0) and a variable (`XAD`)

You can use `_` within integer literals to improve readability:

    344_000_000_000

The `.` can be used as decimal separator to create a 🚀.

### Number Types

There are only two numeric types in Emojicode:

- 🚂 can represent any integer in the interval [-2<sup>63</sup>+1, 2<sup>63</sup>-1].
- 🚀 can be used to store a real number with the common limitations. Read this [Wikipedia article](https://en.wikipedia.org/wiki/Double-precision_floating-point_format) for more information.

## Booleans

Emojicode has a type to represent Boolean values: 👌. A Boolean values can either be true or false.
A true value is created using 👍 and a false value is created using 👎.

In the example below two variables are set to a boolean value.

    🍮 emojicodeIsTheFunniestLanguage 👍
    🍮 phpIsAsCool 👎

## Symbol literals

A **Symbol** is a **single Unicode character** represented by the symbol type 🔣. The symbol type can represent any character defined in Unicode.

You can include the symbol in the source code file by prepending 🔟 before the desired symbol. This is called a *Symbol literal*.

Example:

    🍮 theAcceptedCurrency 🔟€
