# Extensions

Extensions allow you to extend an existing class or value type.

In an extension, you can declare and define everything you could when initially
declaring a class or value type, this includes methods, initializers, type
methods and protocol conformances. The only exception are instance variables,
which can only be added to types declared in the same package.

>!N Only types defined in the same package can be extended in Emojicode 0.7.

## Extending

The syntax is:

```syntax
$extension$-> 🐋 $type-identifier$ $type-body$
```
