# Types and Namespaces

## Namespaces

Each type when defined is loaded into a namespace. By definition the type
doesn’t basically belong to this namespace but is *reachable* through this
namespace. A type may actually even be reachable through multiple namespaces.

Everywhere a type name is expected you can either just use the name of the type
without explicitely specifying a namespace and the compiler will assume that the
type is reachable through the default namespace 🔴, or you can explicitly
specify a namespace with the namespace accessor:

<pre class="syntax">
🔶 $namespace$ $name$
$namespace$-> $emoji$
$name$-> $emoji$
</pre>

This identifies type *name* of namespace *namespace*. Both must be exactly one
identifier.

This is an example of explicitly referring to the 🔡 class in 🔴:

```
🔶🔴🔡
```

You can use this syntax everywhere you would specify a type name. You can also
use it when declaring a type. The example below declares the class 🎁 and makes
it available in namespace 🎅:

```
🐇 🔶🎅🎁 🍇

🍉
```

Remember that the class’s name is nevertheless just 🎁 but the type is
reachable in the 🎅 namespace.

>!H The facts above play a very important role when importing other packages.
>!H It’s also worth noting, that namespaces are per package. To learn more about
>!H this, please see [Packages](packages.html).

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

## 🔲 Type Casting

*Type casting* is a way to determine whether a value is of a given type at
run-time and to treat the value as an instance of this type.

Type casting is implemented with the 🔲 statement:

<pre class="syntax">
$cast$-> 🔲 $expression$ $type-expr$
</pre>

*value* is the value to be casted to *type*. If *value* can be casted to *type*
*value* is returned as *type*. If *value* can’t be casted to *type* Nothingness
is returned.

Here for instance, a value from a parsed JSON string is down casted:

```
🍦 object 🗞 🔤"catwalk"🔤 👴 object is of type ⚪️
🍦 string 🍺 🔲 object 🔡

😀 string 👴 Prints catwalk
```

Don’t confuse type casting with type conversion. You can’t cast 🚂 to
🚀. In such a case you would have to use appropriate a suitable conversion
method.

## Type Expectations

Emojicode utilizes so-called *type expectations*. Whenver an expression whose
result must be compatible to a specific type is evaluated, this type becomes
a type expectation.

When you call a method, for instance, the types of the parameters become type
expectations. That is, if you defined a method that takes one argument of type 🔡
and you call the method, the first argument will be expected to be of the type
string. Another example would be a variable assignment. If you have declared a
variable of a certain type, the compiler will expect this when assigning to the
variable.

Type Expectations are used in several cases (apart from ensuring that a value is
of compatible type):

* The compiler uses expectations to automatically convert 🚂 literals to 🚀
  literals when a 🚀 is expected. Please note that this only applies to
  literals.

* Dictionary and list literals don’t infer their type when a list or dictionary
  literal is expected.

  If, for instance, an argument of type 🍨🐚⚪️ is expected
  and you provide `🍨34 21 63🍆` this list literal won’t be of type 🍨🐚🚂
  (which would be incompatible to the argument) but of type 🍨🐚⚪️. The same
  applies to dictionary literals.

## ⚫️ The Inferred Type

The *inferred type* is a reserved emoji that can be used instead of a type name.

The compiler will try to deduce the substituted type from the type
expectation. In most cases, ⚫️ will therefore simply refer to the expected type.

⚫️ can be used in cases where writing out a type name in full is inconvenient,
for example:

```
🍰 list 🍨🐚🍀🐚🔡  👴 🍀 is a type that requires a generic argument
👴 ...
🍮 list 🔷⚫️🐸 👴 ⚫️ stands for 🍀🐚🔡 here
```


In rare cases the use of the inferred type can be confusing and should be
avoided. As for example:

```
🍰 euler’sNumber 🚀
🍮 euler’sNumber 🍩⚫️🏹
```

For a not so experienced Emojicode programmer it may be confusing what is
happening, since ⚫️ refers to 🚀. (🚀 is the expected type.) Moreover, it’s
not really advantageous to use ⚫️ over 🚀 here.

## Grammar

<pre class="syntax">
$type-expr$-> ⚫️  | $type-from-expr$ | $type$
$type$-> [🍬] $type-main$ |  | 🚨 $type$ $type$ | 🍱 $types$ 🍱 | $metattype$
$type-main$-> $variable$ | 🐕 | $callable-type$ | $type-identifier$ $generic-arguments$
$type-identifier$-> 🔶 $emoji$ $emoji$ | $emoji$
$types$-> $type$ $types$ | $type$
</pre>
