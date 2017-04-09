# Control Flow

Emojicode provides different types of control flow statements that allow you to
structure the flow of the program.

## 🍇🍉 Code Block

Code blocks are used in conjunction with control flow structures to group
statements that will be executed only under if a condition is met or not met
or that will be repeated.

Syntactic definition:

<pre class="syntax">
$block$-> 🍇 $statments$ 🍉
$statements$-> $statement$ $statements$ | $statement$
</pre>

Examples of blocks can be seen below.

## 🍊 If

The 🍊 statement is very important. It allows for conditional execution of a
code block. The whole syntax is:

<pre class="syntax">
🍊 $condition$ $block$ [$else-ifs$] [$else$]
$else-ifs$-> $else-if$ $else-ifs$ | $else-if$
$else-if$-> 🍋 $condition$ $block$
$else$-> 🍓 $block$
$condition$-> $expression$ | $frozen-declaration$
</pre>

If the *condition* evaluates to 👍, the code block will be executed, and
if it evaluates to 👎 it'll be ignored.

This example will display a is bigger b if *a* is bigger *b*:

```
🍦 a 10
🍦 b 4
🍊 ▶️ a b 🍇
  😀 🔤a is bigger than b🔤
🍉
```

### 🍓

🍓 extends an 🍊 statement to execute an additional code block in case the
expression in the if statement evaluates to false. For example, the following
code would display a is greater than b if “a is greater than b” and “a is not
greater than b” otherwise:

```
🍦 a 2
🍦 b 8
🍊 ▶️ a b 🍇
  😀 🔤a is bigger b🔤
🍉
🍓 🍇
  😀 🔤a is not greater than b🔤
🍉
```

The 🍓 statements is only executed if the 🍊 statement evaluated to false, and
if all 🍋 statements evaluated to false too.

### 🍋

🍋 extends an 🍊 statement to execute different statements in case the original
🍊 condition evaluates to 👎. However, unlike 🍊, it will execute that
alternative expressions only if the 🍊 expression is 👍. For example, the
following code would display “a is bigger than b”, “a equal to b” or “a is
smaller than b”:

```
🍦 a 2
🍦 b 7
🍊 ▶️ a b 🍇
  😀 🔤a is bigger than b🔤
🍉
🍋 😛 a b 🍇
  😀 🔤a equal to b🔤
🍉
🍓 🍇
  😀 🔤a is smaller than b🔤
🍉
```

The 🍋 statement is only executed if the preceding 🍊 expression and any
preceding 🍋 expressions evaluated to 👎, and the current 🍋 expression
evaluated to 👍.

## 🔂 For In

The 🔂 statement allows you to quickly *iterate over* an instance, that is
repeatedly retrieving values from it until there are no more values to provide.
For example, you can iterate over an 🍨 instance and you’ll receive all elements
contained in the list. The 🔂 statement can iterate over instances of any type
which conforms to the 🔂🐚Element protocol.

Its syntax is:

<pre class="syntax">
🔂 $variable$ $expression$ $block$
</pre>

The compiler then transforms the statement into byte code equivalent to the
statement rewritten to

<pre class="exampe">
🍦 iterator 🍡<i>iterable</i>
🔁 ❓ iterator 🍇
  🍦 <i>variable</i> 🔽 iterator
  👴 The provided block is executed here
🍉
</pre>

where *iteratable* is the instance to iterate over (the result from evaluating
the expression) and *variable* the variable name provided. Evidently, the
variable will be of the type that was provided to the generic argument *Element*
when the type of *iterable* declared its conformance to 🔂🐚Element.

Let’s take a look at an example:

```
🍦 list 🍨🔤tree🔤 🔤bee🔤 🔤lee🔤 🔤me🔤🍆

🔂 name list 🍇
  😀 name
🍉
```

In this example, the code block will be repeated for every value of the list
and the values `tree`, `bee`, `lee`, and `me` will be printed. The type of
`name` is naturally 🔡. That’s due to the fact that 🍨🐚Element
declared its conformance to 🔂 as `🔂🐚Element` and therefore also returns
an iterator of type `🍡🐚Element` from which the type of the variable is
inferred.

>!H If you need to repeat something for a given amount of times you
>!H should use [⏩ Ranges](the-s-package.html#-ranges) in combination with 🔂.

## 🔁 Repeat While

🔁 repeats a given code block as long as *condition* is 👍. This also means
that if the *condition* is never 👍 the code block will never be executed.
The syntax is:

<pre class="syntax">
🔁 $condition$ $block$
</pre>

For example, this program will infinitely print “disko disko partinzani”.

```
🔁 👍 🍇
  😀 🔤disko disko partinzani🔤
🍉
```

Due to the ease of use of the 🔂 statement 🔁 is only used very seldom.
