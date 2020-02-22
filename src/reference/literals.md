# Literals

This chapter provides introduces the literals that can be used in Emojicode
source and their meaning.

## Typing of Literals

In Emojicode, the types of some literals not fixed but will be inferred based on
[Type Expectations](types.html#type-expectations). If there is no expectation or
the literal cannot satisfy the expectation, the literal will create an instance
of a default type that is specified for each literal.

These default types will come from the s package that can be compared to what’s
called standard library in other programing languages. It provides some of the
most important classes and value types to write meaningful programs.

## Numeric Literals

In the example at the very beginning of the previous chapter you saw `↩️ 0`.
Numbers are written in Emojicode just as you would do normally:

```
💭 integer literals
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

There are three numeric types in Emojicode:

- 🔢 represents integer in the interval [-2<sup>63</sup>,
2<sup>63</sup>-1], the default type for an integer literal.
- 💯 represents real numbers (numbers with decimal place).
- 💧 represents bytes, which are integers in the range of [-128,127] normally.

Integer literals take part in type inference and can instantiate any of the
numeric types. This means that a literal like `130` will be interpreted as 💯
when a 💯 is expected. A literal with decimal place will, of course, never be
interpreted as 🔢 or 💧.

## Booleans

Emojicode has a type to represent Boolean values: 👌. A boolean value can either
be true or false. A true value is created using 👍 and a false value is created
using 👎.


## 🔤 String Literals

Strings are textual data that is represented by [the 🔡 type](../packages/s/1f521.html).

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
- `❌🧲` 🧲
- `❌n` New line (`U+A0`)
- `❌t` Tab (`U+09`)
- `❌r` Carriage return (`U+0D`)
- `❌e` Escape (`U+1B`)

All other combinations of a ❌ and another character lead to a compiler error.

## 🧲 Interpolation in String Literals

Often it is necessary to create a new string and include values that were
computed during the execution of the program. This can be done using string
interpolation, where the value to insert into the string is wrapped between two
🧲 in a string literal:

```
28 ➡️ varA
🔤 The value of variable varA is 🧲varA🧲 and method ⚱️ returned 🧲⚱️a❗️🧲.🔤
```

In the example above, the value of `varA` and the result of the method call
`⚱️a❗️`, whose definition is not shown, will be included in the string. Note
that any type that implements the ↘️🔸🔡 protocol can be inserted into the
string. Strings itself, all numeric types and some additional types in the s
package implement this protocol and it can be easily adopted for custom types.

### Syntax

```syntax
$string-literal$-> 🔤 [$string-literal-characters$] 🔤 | 🔤 $interpolation-parts$ [$string-literal-characters$] 🔤
$interpolation-parts$-> $interpolation-part$ | $interpolation-part$ $interpolation-parts$
$interpolation-part$-> [$string-literal-characters$] 🧲 $expression$ 🧲
$string-literal-characters$-> $string-literal-character$ |  $string-literal-character$ $string-literal-characters$
$string-literal-character$-> $string-escape-sequence$ | --🔤 $unicode$
$string-escape-sequence$-> ❌ $string-escape-tail$
$string-escape-tail$-> n | t | r | e | ❌ | 🔤 | 🧲
```

## 🍿 Collection Literal

### List Literals

A list literal is a listing of expressions. For instance, the example below
is a literal with the values `14`, `67`, `2434`.

```
🍿 14 67 2434 🍆
```

The compiler will try to infer the type of a list literal. The default type
of list literals, is the [list type 🍨](../packages/s/1f368.html), an ordered
mutable collections of values.

### Dictionary Literals

In a dictionary literal, keys are associated with a value. This example shows a
dictionary literal that associates artists with their birthplaces:

```
🍿
  🔤Aaron Copland🔤 ➡️ 🔤Brooklyn🔤
  🔤Michael Jackson🔤 ➡️ 🔤Gary🔤
  🔤Falco🔤 ➡️ 🔤Vienna🔤
🍆
```

*key* must be a string. The compiler will try to infer the type of the literal.
Dictionaries can be used to assign values to keys. The default type is
the [🍯 type](../packages/s/1f36f.html), a simple hash-table, storing key-value
pairs.

>!H Any type that implement a special initializer can be created from a
>!H collection literal. This feature is limited in 1.0 beta 2, though, and the
>!H compiler places certain restrictions on the types it can create.

### Syntax

```syntax
$collection-literal$-> 🍿 [$expressions$] 🍆 | 🍿 $kv-pairs$ 🍆
$expressions$-> $expression$ | $expression$ $expressions$
$kv-pairs$-> $kv-pair$ $kv-pairs$ | $kv-pair$
$kv-pair$-> $expression$ ➡️ $expression$
```
