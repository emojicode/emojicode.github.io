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

## Multiprotocols

It might happen that you’ll need to deal with values of types that implement
several protocols. For instance, you might want to provide a method which
requires an argument that can be accessed with 🐽️ and can be compared as defined
by the 💿 protocol. This is where multiprotocols are of service.

You can use a multiprotocol type like so:

```
🍱 🐽️🐚🔡 💿 🍱
```

For instance, when declaring the arguments to a method:

```
🐖 🌈 a 🍱 🐽️🐚🔡 💿 🍱 🍇
  👴 ...
🍉
```

As expected, `a` can now be used both as an instance of a type conforming to
🐽️🐚🔡 and as an insatnce of a type conforming to 💿.
