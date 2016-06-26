# Types and Namespaces

## Namespaces

Each type when defined is loaded into a namespace. By definition the type
doesn’t basically belong to this namespace but is *reachable* through this
namespace. A type may actually even be reachable through multiple namespaces.

Everywhere a type name is expected you can either just use the name of the type
without explicitely specifying a namespace and the compiler will assume that the
type is reachable through the default namespace 🔴, or you can explicitly
specify a namespace with the namespace accessor:

```
🔶 namespace name
```

This identifies type *name* of namespace *namespace*. Both must be exactly one
identifier.

This is an example of explicitly referring to the 🔡 class in 🔴:

```
🔶🔴🔡
```

You can use this syntax everywhere you would specify a type name, thus also when
declaring a type. The example below declares the class 🎁 and makes it available
in namespace 🎅:

```
🐇 🔶🎅🎁 🍇

🍉
```

Remember that the class’s name is nevertheless just called 🎁 but was made
reachable in the 🎅 namespace.

>!H The facts above play a very important role when importing other packages.
>!H It’s also worth noting, that namespaces are per package. To learn more about
>!H this, please see [Packages](packages.html).

## ⚫️ The Inferred Type

*The inferred type* is a reserved emoji that can be used instead of a type name
and the compiler will try to establish the substituted type. ⚫️ works in nearly
every situation:

In rare cases the use of the inferred type can be confusing and should be
avoided. As for example:

```
🍰 euler’sNumber 🚀
🍮 euler’sNumber 🍩⚫️🏹
```

For a not so experienced Emojicode programmer it may be pretty confusing what’s
going on as ⚫️ refers to 🚀 here. Additionally, it’s not really advantageous to
use ⚫️ over 🚀 here.

## ⚪ Something

Something is a special type as it is compatible to *all* other types. Because of
this you cannot call methods or perform any actions on ⚪.

It is an abstract type and therefore only known at compile-time. You cannot cast
to ⚪ at run-time.

## 🔵 Someobject

Someobject is compatible to *all* instances of classes, but not to primitive
values.

It is an abstract type and therefore only known at compile-time. You
cannot cast to 🔵 at run-time.

## 🔲 Casting

*Casting* is a way to determine whether a value is of a given type and to treat
the value as this type of value.

Type casting is implemented with the 🔲 statement:

```
🔲 something type
```

*something* must be the value to cast and *type* must be a valid type.

If *something* can be casted to *type* *something* is returned as *type*.
If *something* cannot be casted to *type* Nothingness is returned.

Here for instance, a value from a parsed JSON string is down casted:

```
🍦 object 🗞 🔤"catwalk"🔤 👴 object is of type ⚪️
🍦 string 🍺 🔲 object 🔡

😀 string 👴 Prints catwalk
```

Type casting may not be confused with type conversion. You can’t cast 🚂 to
🚀. In such a case you would have to use appropriate methods.

## Expectations

The compiler internally uses so-called *expectations*. When you define a method
that expects a 🚀 as single argument the compiler will expect a 🚀 to occur when
it parses the arguments to a call of this method. This information isn’t only
used to verify that the correct kind of argument was passed but is also used in
several other cases:

* The compiler uses expectations to automatically convert 🚂 literals to 🚀
  literals when a 🚀 is expected. Please note, that this only applies to
  literals.
* Dictionary and list literals don’t infer their type when a list or dictionary
  literal is expected. If, for instance, an argument of type 🍨🐚⚪️ is expected
  and you provide `🍨34 21 63🍆` this list literal won’t be of type 🍨🐚🚂
  (which would be incompatible to the argument) but of type 🍨🐚⚪️. The same
  applies to dictionary literals.
