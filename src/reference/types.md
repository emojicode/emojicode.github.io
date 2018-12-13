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
🆕🔶💉🏥🆕❗️
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

Emojicode uses a concept we call *type expectations*. Whenever an expression
whose result must be compatible to a specific type is evaluated, this type
becomes a type expectation.

When you call a method, for instance, the types of the parameters become type
expectations. That is, if you defined a method that takes one argument of type 🔡
and you call that method, the first argument will be expected to be a string.
Another example would be a variable assignment. If you have declared a variable
of a certain type, the compiler will expect this type when assigning to the
variable.

Type Expectations are used in several cases (apart from ensuring that a value is
of compatible type):

* The compiler uses expectations to automatically convert number literals
  without decimal place   to 🔢, 💯 and 💧.

* Dictionary and list literals don’t infer their type when a list or dictionary
  literal is expected.

  If, for instance, an argument of type 🍨🐚⚪️ is expected
  and you provide `🍨34 21 63🍆` this list literal won’t be of type 🍨🐚🔢
  but of type 🍨🐚⚪️. The same applies to dictionary literals.

### ⚫️ The Expected Type

⚫️ (“the expected type”) is an emoji that can be used instead of a type name.

The compiler will try to deduce the substituted type from the type
expectation. Thus, ⚫️ will normally refer to the expected type.

⚫️ can be used in cases where writing out a type name in full is inconvenient,
for example:

```
💭 🍀 is a type that requires a generic argument
🖍🆕 list 🍨🐚🍀🐚🔡🍆🍆

💭 ⚫️ stands for 🍀🐚🔡🍆 here
🔷⚫️🐸 ➡️ 🖍list
```

## Built-In Types

There are two special built-in types ⚪ and 🔵.

### ⚪ Something

⚪ (something) is special as all types are compatible to it. This means
that you can, for instance, store a value of any type into a variable of type ⚪:

```
🖍🆕 surprise ⚪
🔤Anything, anything, anything🔤 ➡️ 🖍surprise
1004 ➡️ 🖍surprise
```

You cannot call any methods on ⚪ and you cast to ⚪ at run-time.

### 🔵 Someobject

All instances of classes are compatible to 🔵 (someobject), but value type
instances are not.

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

Don’t confuse type casting with type conversion. You can’t cast 🔢 to
💯. In such a case you would have to use a suitable conversion
method.

>!N Type Casting may work incorrectly with generics in Emojicode 0.7.

## ⚖️ Size Of Type Instance

The ⚖️ expression allows you to determine the number of bytes an instance of
a provided type will take up at runtime:

```syntax
$size-of$-> ⚖️ $type$
```

The following, for example, prints the size of an integer.

```
😀 🔡 ⚖️🔢 10❗️❗️
```

## Grammar

```syntax
$type-expr$-> ⚫️ | $type-from-expr$ | $type$ | $this$
$type$-> [🍬] [✴️] $type-main$ | 🚨 $type$ $type$ | ⚪
$type-main$-> $variable$ | $callable-type$ | $type-identifier$ $generic-arguments$
$type-main$-> 🍱 $types$ 🍱 | 🔵 | $type-value$
$type-identifier$-> 🔶 $type-emoji$ $type-emoji$ | $type-emoji$
$types$-> $type$ $types$ | $type$
$type-emoji$-> --⚪ --🔵 --🍬 --🍱 --🔶 $emoji-id$
```
