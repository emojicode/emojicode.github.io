# Compile and Run Your First Program

This guide is a short introduction to Emojicode and assumes you have a basic
knowledge of object-orientated programming and familiarity with the command-
line.

## The basic structure

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
  😀 🔤Howdy, partner!🔤
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
should exit without a message and generate a file called `greeter.emojib`. This
is an Emojicode Byte-Code File, which can be executed by the Emojicode Real-Time
Engine. So let’s type:

```bash
emojicode greeter.emojib
```

Congratulations! You’ve written your first program. But how does it actually
work?

It’s simple: `🔤Howdy, partner!🔤` is a string literal. Every character between
two 🔤 is then part of the string.

Then we call the 😀 method on this string. And guess what, it just prints the
string to the standard output. The thing to notice here is, that the method is
actually called by putting its emoji **before the object**. It’s also noteworthy
that Emojicode usually does not use parentheses around arguments to method
calls.

## Warming Up

Let’s call a few more methods to warm up. We’ll now write a method to convert
English into *Pig Latin*. This is a very easy language because to get the Pig
Latin word you just have to move the first letter of the English word to the end
and add *ay*.

In Emojicode you can easily extend every existing class, so to follow good
object-orientated practices we’ll extend the string class to have a method to
convert an English word to Pig Latin. Add the following into the file:

```
🐋 🔡 🍇
  🐖 🐷 ➡️ 🔡￼🍇
  ￼￼
  🍉
🍉
```

`🐋 🔡 🍇` says: Extend the class `🔡` (That’s the string class). `🐖 🐷 ➡️ 🔡￼`
declares a method called `🐷` and returning an instance of the 🔡 class￼￼.

Ok, let’s take the first letter of this string by using the `🔪` method, which
is, according to the [documentation](../packages/s/t5535756609.html#m🔪), capable
of giving us just part of a string. It’s signature is:

```
🐖 🔪 from 🔢 length 🔢 ➡️ 🔡
```

This tells us that the `🔪` method takes two arguments named `from` and `length`, both of them must be of the type 🔢.
🔢 stands for an integer, and that the method returns an instance of 🔡.

Let’s call it on the string we are currently working on.

```
🐖 🐷 ➡️ 🔡￼ 🍇
  🔪 🐕 0 1
🍉
```

This should get us a string containing the first character of the string we are currently working on which is represented by 🐕. You can compare 🐕 to `this` or `self` in other languages. However, we need to store the result somewhere.

```
🐖 🐷 ➡️ 🔡￼ 🍇
  🍦 firstLetter 🔪 🐕 0 1
🍉
```

The above code stores the result into the variable `firstLetter`. The variable
is actually declared and initialized here. It’s important to notice that 🍦 was
used here to declare the variable which prevents the variable from being changed
later. This kind of variable is called “frozen variable”.

You may have also noticed that we didn't declare a type for the variable.
Emojicode supports type inference that is the compiler infers the variable’s
type by looking at the type of the value for the variable.

Now we need to get the rest of the word.

```
🐖 🐷 ➡️ 🔡￼ 🍇
  🍦 firstLetter 🔪 🐕 0 1
  🍦 rest 🔪 🐕 1 🐔 🐕
🍉
```

The `🐔` method returns the length of a string, so we get the whole string. You
can see that the result of the `🐔` method is used as argument to 🔪.

Finally we just need to concatenate `firstLetter`, `rest` and *ay* and return it
from the method.

```
🐖 🐷 ➡️ 🔡 🍇
  🍦 firstLetter 🔪 🐕 0 1
  🍦 rest 🔪 🐕 1 🐔 🐕
  🍎 🍪 rest firstLetter 🔤ay🔤 🍪
🍉
```

The `🍪`s are the most efficient way of concatenating strings. You can wrap any
amount of strings between `🍪` and you will get them concatenated into one
string. You should already know the 🍎 from above. It returns a value from the
method.

Well done! Let’s update the 🏁 method to give us a few examples. The file should
now look like this:

```
🐋 🔡 🍇
  🐖 🐷 ➡️ 🔡 🍇
    🍦 firstLetter 🔪 🐕 0 1
    🍦 rest 🔪 🐕 1 🐔 🐕
    🍎 🍪 rest firstLetter 🔤ay🔤 🍪
  🍉
🍉

🏁 🍇
  😀 🐷 🔤cat🔤
  😀 🐷 🔤development🔤
  😀 🐷 🔤computer🔤
🍉
```

Compile and let’s see:

```bash
emojicodec greeter.emojic
emojicode greeter.emojib
```

```
atcay
evelopmentday
omputercay
```

Cool! We have successfully translated English words into Pig Latin.

## What to do next

I highly recommend you read through the [Language Reference](../reference)
which is a bit more formal but also a really good starting point.

>!H You should really read the [Language Reference](../reference), you gonna
>!H miss Emojicode’s incredible power if you don’t.
