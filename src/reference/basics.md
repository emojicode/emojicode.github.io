# The Basics

This chapter reviews the basics of Emojicode.

## The 🏁 Block

The 🏁 block is an important part of any Emojicode program as it is the
part of the program that is executed when it is started.

Here’s an example of a 🏁 block:

```
🏁 🍇
   💭 Get things up and running here...
🍉
```

The 🏁 block can also return an integer which is then used as the exit code:

```
🏁 ➡️ 🔢 🍇
   💭 Get things up and running here...

  ↩️ 0  💭 Return a code here.
🍉
```

## Comments

We have seen examples of comments in the previous code samples. Comments
allow you to include non-executable text in your code.

Comments begin with  💭 and end at the end of the line. For example:

```
💭 This comment ends at the end of the line. Exactly here
```

You can also use another type of comment that spans multiple lines:
Multiline comments starts with 💭🔜 and ends with 🔚💭 and can contain
line breaks:

```
💭🔜 This is a multiline comment. You can even make
line breaks. 🔚💭
```

## So... When to Use Emojis?

There’s sometimes confusion when emojis are used. Basically it’s very simple:

All **type, method and initializer** names are **emojis**. On the
other hand **variables cannot include emojis** but must be any combination of
characters that cannot be confused with numbers.

## Numeric Literals

In the example at the very beginning of this chapter you saw `↩️ 0`. Numbers
are written in Emojicode just as you would do normally:

```
2018
12

💭 some numbers with decimal place
10.234
0.738281
```

However, integers can not only be written in decimal notation as in the example
above, but also in hexadecimal notation, with the prefix `0x`, like `0x1D`
and octal notation, with the prefix `0`, like `035`.

You can use `,` within numbers as a thousands separator:

```
344,000,000
12,000
12,421.5291
```

### Number Types

There are only three numeric types in Emojicode:

- 🔢 represents integer in the interval [-2<sup>63</sup>+1,
2<sup>63</sup>-1].
- 💯 represents real numbers (numbers with decimal place).
- 💧 represents bytes, which are integers in the range of [-127,127] normally.

The numeric literals we have seen above are converted to an apporpriate type
in accordance with [Type Expectations](types.html#type-expectations). This means
that a literal like `130` will be interpreted as 💯 when a 💯 is expected.
A literal with decimal place will, of course, never be interpreted as 🔢 or 💧.

If no type is expected, a literal without decimal place is of type 🔢 and literal
with is of type 💯.

## Booleans

Emojicode has a type to represent Boolean values: 👌. A boolean value can either
be true or false. A true value is created using 👍 and a false value is created
using 👎.

## Including Other Source Code Files

The Emojicode compiler always expects a single file. Nevertheless, you
can include other source code files. Simply speaking, this just
inserts the code from the included file.

Syntax:

```
📜 🔤path/to/a/file.emojic🔤
📜 🔤file.emojic🔤
```

The path is relative to the directory in which the current source document is.

>!H Do not use this method to share code across projects. If you have
>!H written really fancy code,
>!H [create a package](/docs/reference/packages.html), which you can easily
>!H make available to other people**.
