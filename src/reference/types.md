# Types and Namespaces

## Namespaces

Emojicode uses namespaces to avoid problems with equally named types. If you,
for instance, defined a type called 🌽 and you needed to import another package,
which exports a type named 🌽 too, there would be a problem. To prevent this,
you can import the package into another namespace.

In Emojicode types are not members of namespaces, but are available *through*
namespaces. This also implies that a type may be reachable through several
namespaces. The name of a namespace is always an emoji.

By default, that is when you specify no namespace, you access types through the
namespace 🏠. You do this all the time, for instance when declaring a variable
of string type:

```
🖍🆕 text 🔡
```

When writing only 🔡 the compiler assumes that the type is in the default
namespace 🏠.

You can, of course, explicitly refer to a type in a namespace using the
namespace accessor 🔶:

```
🖍🆕 text 🔶🏠🔡
```

This denotes that we want the type 🔡 reachable in the namespace 🏠.

This syntax can be used everywhere a type is expected. For example, to instantiate
the type 💉 in the namespace 🏥, we would use:

```
🆕🔶💉🏥❗️
```

### Namespacing When Declaring a Type

By default, when you declare a type it will be available through the default
namespace 🏠. It is possible to specify another namespace with the namespace
accessor though:

```
🐇 🔶🏨👩‍💼 🍇

🍉
```

This declares a class 👩‍💼 that will be reachable through the namespace 🏨.

## Type Expectations

Emojicode uses so-called type expectations for type inference. Whenever an
expression, whose type is determined by type inference, is evaluated, type
expectations are considered to determine the type. This mainly concerns
[literals](literals.html).

When you call a method, for instance, the types of the parameters become type
expectations. If, for example, you defined a method that takes one argument of type 🔡
and you call that method, the first argument will be expected to be a string.
Another example would be a variable assignment. If you have declared a variable
of a certain type, the compiler will expect this type when assigning to the
variable.

### ⚫️ The Expected Type

⚫️ (“the expected type”) is an emoji that can be used instead of a type name.

The compiler will try to deduce the substituted type from the type
expectation. Thus, ⚫️ will normally refer to the expected type.

⚫️ can be used in cases where writing out a type name in full is inconvenient.

>!N ⚫️ does not work correctly in 1.0 beta 2.

## Built-In Types

These types are built right into the language and are not defined in any
package.

### ⚪ Something

⚪ is special as all types are compatible to it. This means
that you can, for instance, store a value of any type into a variable of type ⚪:

```
🖍🆕 surprise ⚪
🔤Anything, anything, anything🔤 ➡️ 🖍surprise
1004 ➡️ 🖍surprise
```

You cannot call any methods on ⚪ and you cannot cast to ⚪ at run-time.

### 🔵 Someobject

All instances of classes are compatible to 🔵, but value type instances are not.

### ◼️ No Return

◼️ represents the return type of a method or closure that returns nothing.
It has no use other than that.

## 🔲 Type Casting

Type casting is a way to determine whether a value is of a given type at
run-time and to treat the value as an instance of this type.

Type casting is implemented with the 🔲 statement:

```syntax
$cast$-> 🔲 $expression$ $type-expr$
```

*value* is the value to be casted to *type*. If *value* can be casted to *type*
*value* is returned as *type*. If *value* can’t be casted to *type* no value
is returned. 🔲 therefore returns an optional.

```
🔲 txt 🔡  💭 Tries to cast txt to 🔡
🔲 a 🐟  💭 Tries to cast a to 🐟
🔲 b 🥠🐚🥞🐚🦑🐚🍬🥞🐚🔡🍆🍆🍆🔢💯🍆  💭 Tries to cast b to 🥠🐚🥞🐚🦑🐚🍬🥞🐚🔡🍆🍆🍆🔢💯🍆
```

Don’t confuse type casting with type conversion. You can’t cast 🔢 to
💯. You need to use a suitable conversion method instead.

## ⚖️ Size of Type Instance

The ⚖️ expression allows you to determine the number of bytes an instance of
a provided type will take up at runtime:

```syntax
$size-of$-> ⚖️ $type$
```

The following, for example, prints the size of an integer.

```
😀 🔡 ⚖️🔢 ❗️❗️
```

## Syntax

```syntax
$type-expr$-> ⚫️ | $type-from-expr$ | $type$ | $this$
$type$-> [🍬] [✴️] $type-main$ | 🚨 $type$ $type$ | ⚪ | ◼️
$type-main$-> $variable$ | $callable-type$ | $type-identifier$ $generic-arguments$
$type-main$-> 🍱 $types$ 🍱 | 🔵 | $type-value$
$type-identifier$-> 🔶 $type-emoji$ $type-emoji$ | $type-emoji$
$types$-> $type$ $types$ | $type$
$type-emoji$-> --⚪ --🔵 --🍬 --🍱 --🔶 $emoji-id$
```
