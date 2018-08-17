# Compile and Run Your First Program

This guide is a short introduction to Emojicode and assumes you have a basic
knowledge of object-orientated programming and familiarity with the command-
line.

## The Basic Structure

All Emojicode source files are named like `file.emojic`. So let’s get started by
creating a file called `greeter.emojic` and put some content into it:

```
🏁 🍇

🍉
```

This is the minimum structure every program must have. 🏁 is a special part
of the language after which comes a code block. Every code block begins with
🍇 and ends with 🍉.

When the program is run the code block after 🏁 is executed.

## Greetings

As you can see our program does not do anything at the moment, so let’s add a
greeting.

```
🏁 🍇
  😀 🔤Howdy, partner!🔤❗️
🍉
```

Before analyzing this new code we’ll give it a try.

>!H You must have installed Emojicode to run the following commands.
>!H See [Installing Emojicode](install.html) if you haven’t already.

Open a command-line and navigate to the directory containing `greeter.emojic`.
Then run this command.

```bash
emojicodec greeter.emojic
```

This asks the compiler to compile `greeter.emojic`. If everything goes well it
should exit without a message and generate a file called `greeter`. This
is a native executable you can just run like any other executable. Let’s try:

```bash
./greeter
```

Congratulations! You’ve written your first program. But how does it actually
work?

It’s simple: `🔤Howdy, partner!🔤` is a string literal. Every character between
two 🔤 is then part of the string.

Then we call the 😀 method on this string. And guess what, it just prints the
string to the standard output. The thing to notice here is, that the method is
actually called by putting its emoji **before the object**. After the object
on which the method is called, arguments can be provided. We did not provide any
arguments. ❗️ ends the list of arguments.

>!N This tutorial is a lot shorter than it ought to be and will be extended
>!N before Emojicode Symphonic is finally released.

## What to Do Next

You should really read the [Language Reference](../reference) now, or you gonna
miss Emojicode’s incredible power if you don’t.
