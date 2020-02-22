# Protocols

Protocols define methods for special functionality. Protocols only describe
the methods a type must offer to support this functionality. Types can conform
to protocols by implementing all methods and declaring the conformation.

Defining a protocol defines a type. All types that agree to that protocol are
compatible to this type.

## Declaration

The syntax to define a protocol is simliar to the way of defining a class:

```syntax
$protocol$-> 🐊 $type-identifier$ [$generic-parameters$] $protocol-body$
$protocol-body$-> $protocol-method$ | $protocol-method$ $protocol-body$
$protocol-method$-> [$documentation-comment$] [⚠️] $mood$ $emoji-id$ $arguments$ $return-type$
```

For example:

```
🐊 💿 🍇
  ❗️🎶
🍉
```

Here we declared a protocol named 💿. All classes that conform to this protocol
will have to implement the method 🎶. This protocol doesn’t tell us anything
about the actual type but we do know that all types that conform to 💿 are
capable of playing music and therefore must provide the 🎶 method.

You can use the ❗️ to require instance methods inside the 🐊 body. At
present it is not possible to require initializers or type methods.

## Conforming

To make a class conform to a protocol you must declare that it conforms to the
protocol using the conformance syntax:

```syntax
$protocol-conformance$-> 🐊 $type$
```

Let us declare a class that conforms to 💿.

```
🐇 📱 🍇
  🐊 💿

  ❗️ 🎶 🍇
    😀 🔤Lalalala🔤❗️
  🍉
🍉
```

The actual statement to achieve this is `🐊 protocolName`, where *protocolName*
must be the type name of the protocol, and can occur everywhere in the class
body.

[Promises](classes.html#promises) also apply when implementing protocol
methods. An extension can also make a class conform to a protocol.

## Calling Methods on Values of Protocol Type

Methods on protocol values are called like any other methods:

```
🖍🆕 cd_like 💿
🆕📱  ➡️ 🖍 cd_like
🎶 cd_like❗️
```

## Multiprotocols

It might happen that you’ll need to deal with values of types that implement
several protocols. For instance, you might want to provide a method which
requires an argument that can be accessed with 🐽️ and can be compared as defined
by the 💿 protocol. This is where multiprotocols are of service.

You can use a multiprotocol type like so:

```
🍱 🐽️🐚🔡🍆 💿 🍱
```

For instance, when declaring the arguments to a method:

```
❗️ 🌈 a 🍱 🐽️🐚🔡🍆 💿 🍱 🍇
  💭 ...
🍉
```

As expected, `a` can now be used both as an instance of a type conforming to
🐽️🐚🔡🍆 and as an insatnce of a type conforming to 💿.
