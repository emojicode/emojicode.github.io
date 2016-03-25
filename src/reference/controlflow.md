# Control Flow

Emojicode provides different types of control flow structures that allow you to structure the flow of the program.

Emojicode differs from other programming languages as it is missing statements that let you immediately exit a loop or to leave out an iteration.

## 🔁

Syntax:

	🔁 expression 🍇

	🍉

🔁 repeats a given code block as long as *expression* is true. This also means that if the *expression* is never true the block of code will never execute.

## 🔂

Syntax:

	🔂 variable something 🍇

	🍉

🔂 allows you to quickly enumerate an object. 🔂 can enumerate any class implementing the [🔂 protocol](../packages/s/) as well as the 🍨 class.

🔂 declares the variable *variable* in the current scope, and therefore cannot reuse any previously declared variable. The type of the variable is guessed to be the first generic argument of the type to enumerate. If the type can’t be inferred the variable is declared as ⚪️. Then on each iteration, the current object is assigned to *variable*.

>!H If you need to repeat something for a given amount of times you possibly
>!H should use [⏩ Ranges](the-s-package.html#-ranges).

## 🍊 – Conditional

The 🍊 construct is very important. It allows for conditional execution of code fragments. The structure is:

	🍊 boolean 🍇

	🍉

If *boolean* is true, Emojicode will execute the code block, and if it evaluates to false it'll ignore it.

This example will display a is bigger b if *a* is bigger *b*:

	🍊 ▶️ a b 🍇
		😀 🔤a is bigger b🔤
	🍉

## 🍓

🍓 extends an 🍊 statement to execute a statement in case the expression in the if statement evaluates to false. For example, the following code would display a is greater than b if “a is greater than b” and “a is not greater than b” otherwise:

	🍊 ▶️ a b 🍇
		😀 🔤a is bigger b🔤
	🍉
	🍓 🍇
		😀 🔤a is not greater than b🔤
	🍉

The 🍓 statements is only executed if the 🍊 expression evaluated to false, and if there were any 🍋 expressions - only if they evaluated to false as well (see 🍋 below).

## 🍋

🍋 extends an 🍊 statement to execute different statements in case the original 🍊 expression evaluates to false. However, unlike 🍊, it will execute that alternative expressions only if the 🍊 expression is true. For example, the following code would display “a is bigger than b”, “a equal to b” or “a is smaller than b”:

	🍊 ▶️ a b 🍇
		😀 🔤a is bigger b🔤
	🍉
	🍋 😛 a b 🍇
		😀 🔤a equal to b🔤
	🍉
	🍓 🍇
		😀 🔤a is smaller than b🔤
	🍉

The 🍋 statement is only executed if the preceding 🍊 expression and any preceding 🍋 expressions evaluated to false, and the current 🍋 expression evaluated to true.
