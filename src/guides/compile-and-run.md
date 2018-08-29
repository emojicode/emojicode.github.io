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

This is the basic structure every program must have. 🏁 is a special part
of the language after which comes a code block. Every code block begins with
🍇 and ends with 🍉.

When the program is run the code block after 🏁 is executed.

## Greetings

As you can see our program does not do anything at the moment, so let’s add a
greeting.

```
🏁 🍇
  😀 🔤Hey!🔤❗️
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
is a native executable you can run like any other executable. Let’s try:

```bash
./greeter
```

Congratulations! You’ve written your first program. But how does it actually
work?

It’s simple: `🔤Hey!🔤` is a string literal. Every character between
two 🔤 is then part of the string.

Then we call the 😀 method on this string. And guess what, it prints the string
to the standard output. The thing to notice here is, that the method is actually
called by putting its emoji **before the object**. After the object on which you
want to call the method. We could then provide arguments, but there are none
required. ❗️ simply ends the list of arguments.

## More Greetings

Now, one greeting is great, but it is a bit boring. Let us a create a list of
greeting instead:

```
🏁 🍇
  🍨 🔤Hey!🔤 🔤Hi!🔤 🔤Howdy!🔤 🔤Aloha!🔤 🍆 ➡️ list
🍉
```

What happens here exactly? Everything that you list between `🍨` and `🍆` is made
into a list. And `➡️` is used to create a constant variable. Maybe this appears
odd at first, but in Emojicode the value for a variable is on the left-hand-side
of `➡️` and the variable name on the right hand side.

Next, we want to print the first greeting in that list as a test:

```
🏁 🍇
  🍨 🔤Hey!🔤 🔤Hi!🔤 🔤Howdy!🔤 🔤Aloha!🔤 🍆 ➡️ list
  😀 🐽list 0❗️❗️
🍉
```

You already know 😀 from above, but we haven’t talked about 🐽 yet. 🐽 is the
method used to access an element in a list. And as in most other programming
languages, in Emojicode the first element in a list has index 0. You can see
that we added `0` after the object on which we call the method (`list`) but
before the ❗️. This is where arguments to a method call go. There is no special
separator used.

So all `🐽list 0❗️` does is to return the first element in the list,
which is a string.

Let’s try that:

```bash
emojicodec greeter.emojic
./greeter
```

You should see `Hey!`. If that wasn’t impressive enough, let’s try something
more advanced. Let us print a random greeting.

As it turns out, this is rather simple as the list offers a method 🐹 that
shuffles it. All we need to do is:

```
🏁 🍇
  🍨 🔤Hey!🔤 🔤Hi!🔤 🔤Howdy!🔤 🔤Aloha!🔤 🍆 ➡️ list
  🐹 list❗️
  😀 🐽list 0❗️❗️
🍉
```

Try to execute this several times and you should be greeted with one of our
greetings randomly.

## Internationalizing our Greeter

Printing random greetings is funny, but it would be much more useful if our
program could be used to print a greeting in a specified language. Something
like `./greeter de` would then print `Guten Tag!` for instance, while
`./greeter en` prints `Hey!`.

We’ll start off by creating a dictionary to map languages to a greeting:

```
🏁 🍇
  🍯
    🔤fr🔤 🔤Salut!🔤
    🔤it🔤 🔤Ciao!🔤
    🔤de🔤 🔤Guten Tag!🔤
    🔤en🔤 🔤Hey!🔤
    🔤es🔤 🔤Hola!🔤
  🍆 ➡️ dictionary
🍉
```

`🍯` works like 🍨 and creates a dictionary from the listed values. This
dictionary is stored into `dictionary`.

The method to access a dictionary is also called `🐽`, so intuitively we would
write:

```!
😀 🐽dictionary 🔤de🔤❗️❗️
```

This won’t work, however. 🍯’s 🐽 returns an optional. An optional is like
a box that can contain something or be empty. We have to check therefore,
whether our dictionary actually provided a value for the key `🔤de🔤`.

The easiest way to do this is with the conditional assignment:

```
🏁 🍇
  🍯
    🔤fr🔤 🔤Salut!🔤
    🔤it🔤 🔤Ciao!🔤
    🔤de🔤 🔤Guten Tag!🔤
    🔤en🔤 🔤Hey!🔤
    🔤es🔤 🔤Hola!🔤
  🍆 ➡️ dictionary
  ↪️ 🐽dictionary 🔤de🔤❗️ ➡️ greeting 🍇
    😀 greeting❗️
  🍉
🍉
```

You can try and run the above code and should see `Guten Tag!`. But how does
this work?

First, we need to understand that ↪️ is like an if statement. It executes the
provided code block if the condition is it provided with evaluates to true.
You can see that we have used a variable assignment as condition. You can
proviee a variable assignment as condition, if the left-hand-side value is
an optional. In this case, the if will execute its block if the left-hand-side
value does contain a value and will store that value into the variable specified
on the right-hand-side.

In short: `greeting` will contain the value returned
by the dictionary if it does return a value, and if so, the code block will be
exeucted.

So the last step is to retrieve the command line argument specifying the
language. To do that we need to call a type method. A type method is a method
that is called directly on a type.

```
🎞🐇💻❗️ ➡️ args
```

This calls 🎞 on the class 💻 which returns us the command line-arguments as a
list. The list returned when our program is run with `./greeter en` would
contain `./greeter` and `en`. We therefore need to get the element at index 1
and pass it to dictionary’s 🐽:

```
🏁 🍇
  🍯
    🔤fr🔤 🔤Salut!🔤
    🔤it🔤 🔤Ciao!🔤
    🔤de🔤 🔤Guten Tag!🔤
    🔤en🔤 🔤Hey!🔤
    🔤es🔤 🔤Hola!🔤
  🍆 ➡️ dictionary
  🎞🐇💻❗️ ➡️ args
  ↪️ 🐽dictionary 🐽args 1❗️❗️ ➡️ greeting 🍇
    😀 greeting❗️
  🍉
🍉
```

Compile and test:

```
emojicodec greeter.emojic
./greeter de
./greeter en
```

## What Next?

Great! You’ve already mastered the basics of Emojicode!

It’s time to dive into Emojicode now and check out the [Language
Reference](../reference).

In case you’re looking for inspiration here are some ways you can improve
our greeter program:

- Add more languages.
- Make it output an error message if the language code is not known.
- Prevent it from panicking when there is no language provided.
