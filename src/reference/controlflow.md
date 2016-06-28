# Control Flow

Emojicode provides different types of control flow statements that allow you to
structure the flow of the program.

Emojicode differs from other programming languages as it is missing statements
that let you immediately exit a loop or to leave out an iteration.

## 🔂

🔂 allows you to quickly enumerate an object. It can enumerate any class
that implements the [protocol](../packages/s/) as well as the 🍨 and ⏩ class.

<pre class="syntax">
🔂 $variable$ $value$ 🍇

🍉
</pre>

The type of the variable is guessed to be the first generic argument of the type
to enumerate. If the type can’t be inferred the variable is declared as ⚪️.
Then on each iteration, the current value is assigned to *variable*.

>!H If you need to repeat something for a given amount of times you possibly
>!H should use [⏩ Ranges](the-s-package.html#-ranges).

## 🔁

🔁 repeats a given code block as long as *expression* is true. This also means
that if the *expression* is never true the block of code will never execute.

<pre class="syntax">
🔁 $expression$ 🍇

🍉
</pre>

## 🍊

The 🍊 construct is very important. It allows for conditional execution of code
fragments. The syntax is:

<pre class="syntax">
🍊 $boolean$ 🍇

🍉
</pre>

If *boolean* is true, Emojicode will execute the code block, and if it evaluates
to false it'll ignore it.

This example will display a is bigger b if *a* is bigger *b*:

```
🍊 ▶️ a b 🍇
	😀 🔤a is bigger b🔤
🍉
```

## 🍋

🍋 extends an 🍊 statement to execute different statements in case the original
🍊 expression evaluates to false. However, unlike 🍊, it will execute that
alternative expressions only if the 🍊 expression is true. For example, the
following code would display “a is bigger than b”, “a equal to b” or “a is
smaller than b”:

```
🍊 ▶️ a b 🍇
  😀 🔤a is bigger b🔤
🍉
🍋 😛 a b 🍇
  😀 🔤a equal to b🔤
🍉
🍓 🍇
  😀 🔤a is smaller than b🔤
🍉
```

The 🍋 statement is only executed if the preceding 🍊 expression and any
preceding 🍋 expressions evaluated to false, and the current 🍋 expression
evaluated to true.

## 🍓

🍓 extends an 🍊 statement to execute an additional code block in case the
expression in the if statement evaluates to false. For example, the following
code would display a is greater than b if “a is greater than b” and “a is not
greater than b” otherwise:

```
🍊 ▶️ a b 🍇
	😀 🔤a is bigger b🔤
🍉
🍓 🍇
	😀 🔤a is not greater than b🔤
🍉
```

The 🍓 statements is only executed if the 🍊 expression evaluated to false, and
if all 🍋 expressions evaluated to false too.
