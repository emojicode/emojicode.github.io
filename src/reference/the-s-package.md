# The s package

This chapter provides a very brief overview of the s package and its most
important classes.

The s package can be compared to what’s called standard library in other
programing languages. It provides some of the most important classes and value
types to write meaningful programs.

>!H This chapter only introduces the most important interfaces although there
>!H are many more.
>!H
>!H You can browse the whole API of the s package [here](../packages/s/).

## 👌 🔢 💯

The most basic types 👌 (boolean), 🔢 (integer), 💯 (real number),
were already introduced in [The Basics](basics.html).
These types are, of course, defined in the s package.

## 🔡 Strings

Strings are textual data that is represented by [the 🔡 type](../packages/s/1f521.html).

### String Literals

You can include strings in your code by surrounding the characters by a pair of
🔤:

```
🔤This is a string.🔤 ➡️ aString
```

Obviously, you cannot just include the 🔤 symbol in a string literal as it would
be understood as the ending of the string. You can however *escape* the 🔤 using
the ❌.

```
🔤A string literal begins with a ❌🔤 symbol.🔤 ➡️ aboutStringLiterals
```

If you want to include the ❌ symbol in a string literal you will need to escape
it as well:

```
🔤The escape character is ❌❌ (red cross).🔤 ➡️ theEscapeSymbol
```

The escape character can also be used to produce the following characters:

- `❌❌` ❌
- `❌🔤` 🔤
- `❌n` New line (`U+A0`)
- `❌t` Tab (`U+09`)
- `❌r` Carriage return (`U+0D`)
- `❌e` Escape (`U+1B`)

All other combinations of a ❌ and another character lead to a compiler error.
The syntax is:

```syntax
$string-literal$-> 🔤 [$string-literal-characters$] 🔤
$string-literal-characters$-> $string-literal-character$ |  $string-literal-character$ $string-literal-characters$
$string-literal-character$-> $string-escape-sequence$ | --🔤 $unicode$
$string-escape-sequence$-> ❌ $string-escape-tail$
$string-escape-tail$-> n | t | r | e | ❌ | 🔤
```

### Concatenating Strings

To add two or more strings together (*concatenate*) you should use the 🍪
statement. Wrap all strings you want to concatenate between two 🍪. They
will get concatenated in order of appearance into one string.

```
🔤Hello 🔤 ➡️ string1
🔤my dear🔤 ➡️ string2

😀 🍪 string1 string2 🔤 World!🔤 🍪❗️
```

🍪s are the most efficient way of concatenating strings as the compiler can
🍪optimize the concatenation. Please note that 🍪s are not methods but part
of the language.

The syntax formally is:

```syntax
$concatenate-literal$-> 🍪 $concatenate-expressions$ 🍪
$concatenate-expressions$-> $concatenate-expression$ | $concatenate-expression$ $concatenate-expressions$
$concatenate-expression$-> --$concatenate-literal$ $expression$
```

## 🍨 Lists

Lists are ordered mutable collections of values represented by the [🍨 type](../packages/s/1f368.html).

### List Literals

You can create a list just by listing the values for the list between 🍨 and 🍆.
The example below creates a list with the values `14`, `67`, `2434`.

    🍨 14 67 2434 🍆

The compiler will try to infer the generic type argument for the list.

```syntax
$list-literal$-> 🍨 [$expressions$] 🍆
$expressions$-> $expression$ | $expression$ $expressions$
```

## 🍯 Dictionaries

Dictionaries can be used to assign values to keys. They are represented
by the [🍯 type](../packages/s/1f36f.html).

### Dictionary Literals

The shortcut syntax to create a dictionary is:

```syntax
$dictionary-literal$-> 🍯 [$kv-pairs$] 🍆
$kv-pairs$-> $kv-pair$ $kv-pairs$ | $kv-pair$
$kv-pair$-> $key$ $expression$
$key$-> $expression$
```

*key* must be a string. The compiler will try to infer the generic type argument
for the dictionary.

Here’s an example for a dictionary that associates artists with their birthplaces:

```
🍯
  🔤Aaron Copland🔤 🔤Brooklyn🔤
  🔤Michael Jackson🔤 🔤Gary🔤
  🔤Falco🔤 🔤Vienna🔤
🍆
```

## ⏩ Ranges

Emojicode supports a range type called ⏩. A range is an immutable sequence of
numbers, or more strictly speaking of integers.

A range is always defined by three values: *start*, *stop* and *step*.

If `step` is positive, every number `f(x) = start + x * step`
that matches the constraint `start ≤ f(x) < stop` is an element of the range. If
`step` is negative the constraint `stop < f(x) ≤ start` applies instead.

Ranges can be very helpful in combination with 🔂 if you need to repeat
something for a specific number of times:

```
🔂 i 🆕⏩⏭ 0 10 2❗️ 🍇
  😀 🔡 i 10❗️❗️  💭 Prints numbers 0 through 8 (including).
🍉
```
```
🔂 i 🆕⏩⏩ 0 10❗️ 🍇
  😀 🔡 i 10❗️❗️  💭 Prints numbers 0 through 9 (including).
🍉
```
```
🔂 i 🆕⏩⏩ 10 0❗️ 🍇
  😀 🔡 i 10❗️❗️  💭 Prints numbers 10 through 1 (including).
🍉
```
```
🔂 i 🆕⏩⏭ 100 -10 -10❗️ 🍇
  😀 🔡 i 10❗️❗️  💭 Prints numbers 100 through 0 (including).
🍉
```
