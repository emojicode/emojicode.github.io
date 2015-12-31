# Optionals and Nothingness

## ✨ – Nothingness

Nothingness is a primitive value used to represent a missing value. Many methods, for example, return nothingness on failure. Additionally any method that does not explicitly declare a return type is assumed to return nothingness.

To get Nothingness you use ⚡️.

## 🍬 – Optionals (🍺 & ☁️)

Optionals can be used in cases where a value may be missing.

To make a type nothingness compatible you need to declare it as an optional by prepending 🍬. Examples:

	🍰 buildingAge 🍬🚂 👴 The age of old buildings is often not known exactly.
	🍰 petName 🍬🔡 👴 Some pets have no name.

A type declared as optional can contain ✨.

This example illustrates why optionals are important:

	🍮 display 🍩🌳💻 🔤DISPLAY🔤

`display` might now contain a string or it might not, because not every system has an environment variable called `DISPLAY`.

If you now would want to use the value of `display` you need to unwrap the optional using the 🍺:

	🍺 object

On a system with a `display` environment variable this would print the value of `display`.

	😀 🍺 display

What would happen if `display` was nothingness? The program would crash with a message like:

	🚨 Fatal Error: Unexpectedly found ✨ while unwrapping a 🍬.

Obviously unwrapping an optional without checking its content is very unsafe and should not be done.

You should always check first to see if ✨ is inside:

	🍊 ❎ ☁️ display 🍇
		😀 🍺 display
	🍉

The above example introduced the ☁️ operator whose use is very simple: It determines whether an optional contains nothingness.

Optionals are very cheap in use as most of the work is done at compile time.

## 🍻 – Optional method call

Using 🍻 you can perform a method call on a object, without the need to check if ✨ is inside. The call will only be executed if the *object* is not ✨ Syntax:

	🍻 !methodEmoji object [arguments ...]

For instance this can be helpful if you want to call a method on the return of a function which probably returns nothingness or on a variable which probably contains nothingness.

🍻 returns always ✨.

## 🍌

>!N This is a very experimental feature and may get removed in the future.

The banana is a language struct that unwraps a variable in place.

Take a look at this example:

	🐇🐖 🏁 ➡️ 🚂 🍇

		🍮 display 🍩🌳💻 🔤DISPLAY🔤
		🍌 display 🍇
			🍎 1
		🍉

		😀 display

		🍎 0
	🍉

🍌 tests whether the variable contains nothingness. If the variable does contain nothingness, the block is executed. You must leave the current scope (the method scope) in this handler. After the 🍌 the variable is no longer an optional, since the code after the 🍌 will not get executed if the variable contains nothingness.
