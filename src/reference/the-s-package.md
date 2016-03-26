# The s package

This chapter provides a very brief overview of the standard package and its most important classes.

The s package can be compared to what’s called standard library in other programing languages. It provides some of the most important classes to write meaningful programs. Another characteristic of standard libraries is that the programming language could theoretically be used without them, which is also the case with Emojicode’s s package.

>!H This chapter only introduces the most important classes although there are many more.
>!H
>!H You can browse the whole API of the s package [here](../packages/s/).

## 🔡 Strings

In Emojicode a string is an ordered immutable collection of symbols (or easily speaking a text). Strings are represented by the 🔡 class which represent a collection of 🔣, a primitive type representing a single Unicode code point.

Emojicode strings are rather fast and of course fully Unicode-Compliant. The Unicode compatibility is achieved by using UTF-32 encoding. This causes strings to consume more memory but makes working with special Unicode characters like Emojis a lot faster.

### String Literals

You can include strings in your code by surrounding the characters by a pair of 🔤.

Example:

    🍦 aString 🔤This is a string.🔤

You will see that you cannot just include the 🔤 symbol in a string literal as it would be understood as the ending of the string. You can however *escape* the 🔤 using the ❌.

    🍦 aboutStringLiterals 🔤A string literal begins with a ❌🔤 symbol.🔤

If you want to include the ❌ symbol in a string literal you will need to escape it as well:

    🍦 theEscapeSymbol 🔤The escape character is ❌❌ (red cross).🔤

The escape character can also be used to produce the following characters:

- `❌❌` ❌
- `❌n` New line (`U+A0`)
- `❌t` Tab (`U+09`)
- `❌r` Carriage return (`U+0D`)
- `❌e` Escape (`U+1B`)

All other combinations of a ❌ and another character lead to a compiler error.

### Comparing Strings

To compare two strings you must use the equality method 😛.

    😛 🍪🔤Straw🔤 🔤berries🔤🍪 🔤Strawberries🔤

### Concatenating Strings

To concatenate two or more strings you should use the 🍪 language struct. Wrap all strings you want to concatenate between two 🍪. They will get concatenated in order of appearance into one string.

    🍦 string1 🔤Hello 🔤
    🍦 string2 🔤my dear🔤

    😀 🍪 string1 string2 🔤 World!🔤 🍪

🍪s are the most efficient way of concatenating strings as the compiler can optimize the concatenation.

### String Pooling

At compile time all strings will be pooled. This means that each string literal with the same value occurs only once in the bytecode file and at runtime equal strings created from string literals will be represented by the same object.

Consider the following example. While the first comparison of object references will evaluate to true, the second one won’t.

    😜 🔤Strawberries🔤 🔤Strawberries🔤 👴true
    😜 🍪🔤Straw🔤 🔤berries🔤🍪 🔤Strawberries🔤 👴false

>!N Never use 😜 to compare strings. Use 😛 instead.

## 🍨 Lists

Lists are ordered mutable collections of values. They are represeneted by the 🍨 class. Their sizes are theoretically unlimited, but practically hardware and the fact that Emojicode’s integers have an upper bound makes them limited.

Lists are optimized for fast by index access. You can access by index, pop and append in `O(1)`.

List indexing starts at 0, as in C or Java. A negative index is assumed to be relative to the end of the list — that is, an index of -1 indicates the last element of the array, -2 is the next to last element in the array, and so on.

### The 🍨 Type

The 🍨 class is generic and needs to know of what type the values are. If you use the class name you will also have to specify this generic argument. To specify a list that can hold strings you would write:

    🍨🐚🔡

If you created a list like this

    🍮 list 🔷 🍨🐚🔡 🐸

you would only be able to add strings to the list and you will always get back strings from the list. (The syntax used above will be discussed in [Classes](classes.html).)

### List Literals

You can create a list just by listing the values for the list between 🍨 and 🍆. The example below creates a list with the values `14`, `67`, `2434`.

    🍨 14 67 2434 🍆

The compiler will try to infer the generic type argument for the list.

## 🍯 Dictionaries

Dictionaries can be used to assign values to string keys. The size of a dictionary is theoretically unlimited. The Emojicode Real-Time Engine implements dictionaries using linear probing and the Fowler–Noll–Vo hash function.

### The 🍯 Type

The 🍯 class is also generic and requires you to specify the type of the values. For instance if the values were booleans the type would be written like this:

    🍯🐚👌

### Dictionary Literals

The shortcut syntax to create a dictionary is:

    🍯 (key value) ... 🍆

*key* must be a string. The compiler will try to infer the generic type argument for the dictionary.

Example:

    🍯
      🔤Tuvok🔤 🔤Lieutenant🔤
      🔤Seven of Nine🔤 🔤Crewman🔤
      🔤Chakotay🔤 🔤Commander🔤
      🔤Kes🔤 🔤Crewman🔤
    🍆

## ⏩ Ranges

>!N Available from 0.2 Beta 4 which is yet to be released

Emojicode supports a range type called ⏩. A range is an immutable sequence of 
numbers, or more strictly speaking of integers. 

A range is always defined by three values: *start*, *stop* and *step*. 

Every number `f(x) = start + x * step`
that matches the constraint `start ≤ f(x) < stop` is an element of the range. If
`step` is negative the constraint `stop < f(x) ≤ start` applies instead.

Ranges can be created by using the shortcut syntax, which is depending on your
needs either

```
⏭ start stop step
```

or

```
⏩ start stop
```

The latter uses 1 as *step* value if *start* is less than *stop*, otherwise
-1 is used as *step* value. If you provide 0 as *step* value *step* will be 
set to an appropriate value as described before.

Ranges can be very helpful in combination with 🔂 if you need to repeat 
something for a specific number of times:

```
🔂 i ⏭ 0 10 2 🍇
  😀 🔷🔡🚂 i 10
🍉
```
```
🔂 i ⏩ 0 10 🍇
  😀 🔷🔡🚂 i 10
🍉
```
```
🔂 i ⏩ 10 0 🍇
  😀 🔷🔡🚂 i 10
🍉
```
```
🔂 i ⏭ 100 -10 -10 🍇
  😀 🔷🔡🚂 i 10
🍉
```

The result of running these examples would be:

```
0
2
4
6
8
```
```
0
1
2
3
4
5
6
7
8
9
```
```
10
9
8
7
6
5
4
3
2
1
```
```
100
90
80
70
60
50
40
30
20
10
0
```
