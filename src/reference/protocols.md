# Protocols

A protocol defines methods for a special functionality. Protocols only describe the methods a class must have to support this functionality. Classes can conform to protocols by implementing all methods and declaring the conformation.

Defining a protocol defines a type. All classes that agree to that protocol are compatible with this type.

## Declaration

You define a protocol like this:

	🐊 protocolName 🍇

	🍉

*protocolName* must be a type identifier.

Then inside the body you can use the same syntax to define methods as you do in classes, however without a method body.

## Conforming

To make a class conform to a protocol you must declare that it conforms to the protocol:

	🐊 protocolName

*protocolName* must be the type name of the protocol.

Then implement the methods described in the protocol. Do not break [promises](inheritance.html#promises)!

## Example

	🐊 🚘 🍇

		🐖 🎶 ➡️ 🔡

	🍉

	🐇 🐻 🍇
		🐊 🚘

		🐖 🎶 ➡️ 🔡 🍇
			🍎 🔤Brumm brumm🔤
		🍉

	🍉

	🐇 📺 🍇

		🐊 🚘

		🐖 🎶 ➡️ 🔡 🍇
			🍎 🔤Surrrrrr🔤
		🍉

		🐇🐖 🚼 carlike 🚘 🍇
			😀 🔤Here is another object making noise!🔤
			😀 🎶 carlike
		🍉

		🐇🐖 🏁 ➡️ 🚂 🍇

			🍰 d 🚘
			🍰 b 🚘

			🍮 d 🔷📺🆕
			🍮 b 🔷🐻🆕

			🍩 🚼 🐀 d
			🍩 🚼 🐀 b

			🍎 0
		🍉

	🍉
