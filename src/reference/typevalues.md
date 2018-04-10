# Types As Values

Emojicode allows you to pass types as value. You can then call
type methods on these types or instantiate them.

## The Type of a Type Value

Naturally, if you treat a type as value, this value must have a type as well.
This type has the same name as the type the value represents but prefixed with
the emoji, with which the type was defined. Let’s take a look at these
examples:

```
🖍🆕 the_integer_type 🕊🔢
🖍🆕 a_class_type 🐇🔡
```

In the example above two variables were declared. `the_integer_type` which can
hold the type 🔢 and `a_class_type` which can hold the type 🔡.

Note that you cannot use any built-in type like ⚪️ or 🔵 or optionals or errors
as value. Furthermore, the type must always be prefixed with the appropriate
emoji. A value type, for example, must be prefixed with 🕊 or the compiler will
raise an error.

```syntax
$type-value$-> $type-value-type-emoji$ $type$
$type-value-type-emoji$-> 🐇 | 🕊 | 🦃 | 🐊
```

## Creating Type Values

Now let us create a type value. Type values are created exactly the same
way their types are declared. So in order to populate our variables we can
write this:

```
🕊🔢 ➡️ 🖍the_integer_type
🐇🔡 ➡️ 🖍a_class_type
```

Voila!

## Compatibility of the Type Value Types

With the exception of classes, the type of two type values is only compatible
if the are identical.
The type of class type value, however, is compatible to another, if the former
inherits from the latter.

The following is correct therefore:

```
🐇 🌷 🍇🍉

🐇 🌺 🌷 🍇🍉

🏁 🍇
  🖍🆕 a_flower_type 🐇🌷
  🐇🌺 ➡️ 🖍a_flower_type
🍉
```

## Retrieving the Type of an Instance As Value

>!N ⚠️ From here

⬜️ can be used to get the type of a type instance. The syntax is:

```syntax
$metatype-instance-from-instance$-> ⬜️ $expression$
```

For instance, this can be used to instantiate another instance of the type on
which the method was called:

```
🐖 🦄 🍇
  🔷⬛️⬜️🐕🆕
🍉
```

## Using Metatype Instances

You can use metatype instances as type in functions. Instead of providing a type
you can prefix an expression that evaluates to a metatype instance with ⬛️:

```syntax
$type-from-expr$-> ⬛️ $expression$
```

*expresssion* must naturally evaluate to a metatype value. This kind of type
specification is only available in methods and initializers.

The following example stores three different metatype instance in a list,
instantiates them at run-time and calls a method on these instances:

```
🐇 🐟 🍇
  🔑 🐈 🆕 🍇🍉

  🐖 🙋 🍇
    😀 🔤I’m a fish.🔤
  🍉
🍉

🐇 🐡 🐟 🍇
  ✒️ 🔑 🐈 🆕 🍇 🐐 🆕 🍉

  ✒️  🐖 🙋 🍇
    😀 🔤I’m a blowfish.🔤
  🍉
🍉

🐇 🐋 🐟 🍇
  ✒️ 🔑 🐈 🆕 🍇 🐐 🆕 🍉

  ✒️  🐖 🙋 🍇
    😀 🔤I’m a wale.🔤
  🍉
🍉

🐇 🐠 🐟 🍇
  ✒️ 🔑 🐈 🆕 🍇 🐐 🆕 🍉

  ✒️  🐖 🙋 🍇
    😀 🔤I’m a tropical fish.🔤
  🍉
🍉

🏁 🍇
  🍦 classes 🍨🔳🐟 🔳🐡 🔳🐋 🔳🐠  🍆
  🔂 class classes 🍇
    🍦 fish 🔷⬛️ class 🆕
    🙋 fish
  🍉
🍉
```

