# Control Flow

Emojicode provides different types of control flow statements that allow you to
structure the flow of the program.

## 🍇🍉 Code Block

Code blocks are used in conjunction with control flow structures to group
statements that will be executed only under if a condition is met or not met
or that will be repeated.

Syntactic definition:

```syntax
$block$-> 🍇 $statements$ 🍉
$statements$-> $statement$ $statements$ | $statement$
```

Examples of blocks can be seen below.

## ↪️ If

The ↪️ statement is very important. It allows for conditional execution of a
code block. The whole syntax is:

```syntax
$if$-> ↪️ $condition$ $decorator$ $block$ [$else-ifs$] [$else$]
$else-ifs$-> $else-if$ $else-ifs$ | $else-if$
$else-if$-> 🙅‍↪️ $condition$ $decorator$ $block$
$else$-> 🙅‍ $decorator$ $block$
$condition$-> $expression$ | $assignment$
```

If the *condition* evaluates to 👍, the code block will be executed, and
if it evaluates to 👎 it'll be ignored.

This example will display “a is greater than b” if the content for variable *a*
is greater than *b*:

```
↪️ a ▶️ b 🍇
  😀 🔤a is greater than b🔤❗️
🍉
```

### 🙅

🙅 extends an ↪️ statement to execute an additional code block in case the
expression in the if statement evaluates to false. For example, the following
code would display “a is greater than b” if a is greater than b, and “a is not
greater than b” otherwise:

```
↪️ a ▶️ b 🍇
  😀 🔤a is greater than b🔤❗️
🍉
🙅 🍇
  😀 🔤a is not greater than b🔤❗️
🍉
```

The 🙅 statements is only executed if the ↪️ statement evaluated to false, and
if all 🙅↪️ statements evaluated to false too.

### 🙅↪️

🙅↪️ extends an ↪️ statement to execute different statements in case the original
↪️ condition evaluates to 👎. However, unlike ↪️, it will execute that
alternative expressions only if the ↪️ expression is 👍. For example, the
following code would display “a is greater than b”, “a is equal to b”, or “a is
smaller than b”:

```
↪️ a ▶️ b 🍇
  😀 🔤a is greater than b🔤❗️
🍉
🙅↪️ a 🙌 b 🍇
  😀 🔤a is equal to b🔤❗️
🍉
🙅 🍇
  😀 🔤a is smaller than b🔤❗️
🍉
```

The 🙅↪️ statement is only executed if the preceding ↪️ expression and any
preceding 🙅↪️ expressions evaluated to 👎, and the current 🙅↪️ expression
evaluated to 👍.

## 🔂 For In

The 🔂 statement allows you to quickly *iterate over* an instance, that is
repeatedly retrieving values from it until there are no more values to provide.
For example, you can iterate over an 🍨 instance and you’ll receive all elements
contained in the list. The 🔂 statement can iterate over instances of any type
which conforms to the 🔂🐚Element🍆 protocol.

Its syntax is:

```syntax
$for-in$-> 🔂 $variable$ $expression$ $block$
```

The compiler then transforms the statement into byte code equivalent to the
statement rewritten to

```
🍡 iteratable❗️ ➡️ iterator
🔁 🔽 iterator❓️ 🍇
  🔽 iterator❗️ ➡️ variable
  💭 The provided block is executed here
🍉
```

where *iteratable* is the instance to iterate over (the result from evaluating
the expression) and *variable* the variable name provided. Evidently, the
variable will be of the type that was provided to the generic argument *Element*
when the type of *iterable* declared its conformance to 🔂🐚Element🍆.

Let’s take a look at an example:

```
🍨🔤tree🔤 🔤bee🔤 🔤lee🔤 🔤me🔤🍆 ➡️ list

🔂 name list 🍇
  😀 name❗️
🍉
```

In this example, the code block will be repeated for every value of the list
and the values `tree`, `bee`, `lee`, and `me` will be printed. The type of
`name` is naturally 🔡. That’s due to the fact that 🍨🐚Element
declared its conformance to 🔂 as `🔂🐚Element🍆` and therefore also returns
an iterator of type `🍡🐚Element🍆` from which the type of the variable is
inferred.

### Interlude: ⏩ Ranges

The s package provides a type ⏩, representing a range. A range is an immutable
sequence of integers and is defined by three values:
*start*, *stop* and *step*.

If `step` is positive, every number `f(x) = start + x * step`
that matches the constraint `start ≤ f(x) < stop` is an element of the range. If
`step` is negative the constraint `stop < f(x) ≤ start` applies instead.

Ranges are helpful in if you need to repeat
something for a specific number of times:

```
🔂 i 🆕⏩ 0 10 2❗️ 🍇
  😀 🔡 i❗️❗️  💭 Prints numbers 0 through 8 (including).
🍉

🔂 i 🆕⏩ 0 10❗️ 🍇
  😀 🔡 i❗️❗️  💭 Prints numbers 0 through 9 (including).
🍉

🔂 i 🆕⏩ 10 0❗️ 🍇
  😀 🔡 i❗️❗️  💭 Prints numbers 10 through 1 (including).
🍉

🔂 i 🆕⏩ 100 -10 -10❗️ 🍇
  😀 🔡 i❗️❗️  💭 Prints numbers 100 through 0 (including).
🍉
```

## 🔁 Repeat While

🔁 repeats a given code block as long as a condition is 👍. This also means
that if the condition is never 👍 the code block will never be executed.
The syntax is:

```syntax
$repeat-while$-> 🔁 $condition$ $block$
```

For example, this program will infinitely print “It goes on and on and on”.

```
🔁 👍 🍇
  😀 🔤It goes on and on and on🔤❗️
🍉
```

Due to the ease of use of the 🔂 statement 🔁 is only used very seldom.

## 🎍🐌 🎍🏎 Branch Speed

>!H Don’t bother adding these decorators. The effects are minimal and only
>!H useful in very specific cases. If used improperly they might even
>!H harm performance.

The decorators 🎍🐌 (slow) and 🎍🏎 (fast) allow you to specify to the compiler
which branches in an ↪️ will be slow or fast. This can enable better
opitmizations in performance sensitive code.

The example below shows an if statement whose only branch has been marked as
slow:

```
↪️ size 🙌 count 🎍🐌🍇
  size ⬅️✖️ 2
  ☣️ 🍇
    🏗 data size✖️⚖️Element❗️
  🍉
🍉
```
