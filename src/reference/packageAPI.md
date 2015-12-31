# Appendix II: Package API

The package API allows to write a package whose logic can be implemented (partly if needed) in C or C++.

>!N Before writing a package make sure you have read the **whole** chapter. A badly written package can destabilize the Real-Time Engine and break programs.

The C API is specific to the Real-Time Engine. APIs of other Emojicode Engines may be different. The header files should work across all compilers as the produced bytecode files must.

## The Package Header

You start writing a package by creating a file called `header.emojic`. This is an ordinary Emojicode source file with the following differences from the normal syntax:

- Instead of providing a body at a method, class method or constructor declaration you can use 📻.
- The package header must declare the package version using 🔮. The syntax is `🔮 major minor`. `major` and `minor` must be integers.

In a class extension you can only define a method with native code if the class which you want to extend was defined in the same package.

This example show the header of the SQLite package. Example:

	🔮 0 1

	🐇 📚 🍇
		🐈 📂 path 🔶🔴🔡 📻

		🐖 🚨 ➡️ 🍬🔶🔴🚨 📻
		🐖 🔑 ➡️ 🔶🔴🚂 📻
	🍉

	🐇 💬 🍇
		🐈 👋 database 📚 query 🔶🔴🔡 📻
		🐖 📍 placeholder# 🔶🔴🚂 value 🍬🔶🔴🔵 ➡️ 🍬🔶🔴🚨 📻
		🐖 🔽 ➡️ 🍬🔶🔴🍨 📻
	🍉

## C API Headers

After having created the package header you can start implementing the C part of you application.

To get started include the header API header of the latest Emojicode version: ([Download here](../download))

	#include "EmojicodeAPI.h"

This headers defines Emojicode’s public interfaces you will use. It also includes most of the C standard libraries: `stdlib.h`, `stdio.h`, `stdbool.h`, `stdint.h`, `stddef.h`. If you need to work with Strings, Lists, or Dictionaries you must also include `EmojicodeString.h`, `EmojicodeList.h` and `EmojicodeDictionary.h` respectively.
