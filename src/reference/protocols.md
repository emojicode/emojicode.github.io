# Protocols

A protocol defines methods for a special functionality. Protocols only describe
the methods a class must have to support this functionality. Classes can conform
to protocols by implementing all methods and declaring the conformation.

Defining a protocol defines a type. All classes that agree to that protocol are
compatible with this type.

## Declaration

You define a protocol in a similar way to classes:

```
🐊 💿 🍇
	🐖 🎶
🍉
```

Here we declared a protocol named 💿. All classes that *conform* to this
protocol will have to implement the method 🎶. This protocol doesn’t tell us
anything about the actual type but all types that conform to 💿 are capable
of playing music and therefore must provide the 🎶 method.

You can use the normal 🐖 to require instance methods inside the 🐊 body. At
present it’s not possible to require initializers or class methods.

## Conforming

To make a class conform to a protocol you must declare that it conforms to the
protocol. Here a radio is declared to be conform to 💿.

```
🐇 📻 🍇
  🐊 💿

  🐖 🎶 🍇
    😀 🔤Lalalala🔤
  🍉
🍉
```

The actual statement to achieve this is `🐊 protocolName`, where *protocolName*
must be the type name of the protocol, and can occur everywhere in the class
body.

[Promises](classes.html#promises) also apply when implementing protocol
methods. An extension can also make a class conforming to a protocol.

## Protocols as Types

Although protocols just require functionality, they can also be used as normal
types and you can call methods on them:

```
🍰 cdPlayable 💿
🍮 cdPlayable 🔷📻🆕
🎶 cdPlayable
```

You can of course also cast to protocols.

## 🐕 The Class

You should already know 🐕 from class method bodies where it stands for the class
on which the methodis invoked. The function of 🐕 inside protocol is different
however.

In the context of a protocol 🐕 stands for the class which implements the
protocol. The following protocol in the following example enforces a method
🛅 that the takes an instance of the class implementing the protocol:

```
🐊 💿 🍇
  🐖 🛅 anotherCDLikeThing 🐕
🍉
```

If you use 🐕 in a protocol the protocol can no longer be used as a standalone
type for obvious reasons: there is no class to which 🐕 could relate. You can
however still use such a protocol as a generic constraint.
