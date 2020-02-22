# The Basics

This chapter reviews the basics of Emojicode that occur in mosts programs or
are of importance in the following sections of this Language Reference & Guide.

## Source Files

Emojicode source files are UTF-8 encoded text documents in accordance with the
syntax specified by the grammar in this documentation.

Source code files must have the extension `.🍇` or `.emojic`.

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
>!H make available to other people.
