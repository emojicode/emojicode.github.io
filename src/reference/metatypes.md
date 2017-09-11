# Metatypes

Emojicode allows you to pass certain types as value. You can then call
type methods on these types or instantiate them.

## Metatype

Metatypes are the types of types such as classes or value types.

The metatype of a type is the normal type name prefixed by 🔳:

<pre class="syntax">
$metattype$-> 🔳 $type$
</pre>

The metatype of 🔡, for instance, is 🔳🔡 and the metatype of 🚂 is 🔳🚂. A variable
that holds the type of the 🐟 class, for example, looks like this:

```
🍰 fishType 🔳🐟
```

To get an instance of such a metatype, or in other words a type as value, you
can use the 🔳 statment:

<pre class="syntax">
$metatype-instance$-> 🔳 $type$
</pre>

*type* must be a type identifier identifying a type whose meta type is
available. These types are classes, enums and value types. This
metatype can then be treated like any other value.

To populate the variable from the above example, this code could be used:

```
🍮 fishType 🔳🐟
```

⬜️ can be used to get the type of a type instance. The syntax is:

<pre class="syntax">
$metatype-instance-from-instance$-> ⬜️ $expression$
</pre>

For instance, this can be used to instantiate another instance of the type on
which the method was called:

```
🐖 🦄 🍇
  🔷⬛️⬜️🐕🆕
🍉
```

## Compatibility of Metatypes

Metatypes are compatible as the types their instances represent are.

## Using Metatype Instances

You can use metatype instances as type in functions. Instead of providing a type
you can prefix an expression that evaluates to a metatype instance with ⬛️:

<pre class="syntax">
$type-from-expr$-> ⬛️ $expression$
</pre>

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

## 🐕 in Type Methods

🐕 is a type available in the context of type methods and in its declarations.

If you declare that a method returns 🐕, the method must return an instance
of the type on which the type was called. Obviously, this can only be statisfied
if you actually instantiate an instance of the type thus by using 🐕:

```
🐇🐖 🎛 ➡️ 🐕 🍇
  🍎 🔷🐕🆕
🍉
```

Because the type methods can be called on subclasses that do not have all non-
required initializers you can only use required initializers to instantiate 🐕.

You can use 🐕 for flexible and powerful solutions, like shown below.

```
🐇 🐟 🍇
  🐇🐖 🎛 ➡️ 🐕 🍇
    🍎 🔷🐕🆕
  🍉

  🔑 🐈 🆕 🍇🍉

  🐖 🙋 🍇
    😀 🔤I’m a fish.🔤
  🍉
🍉

🐇 🐡 🐟 🍇
  ✒️ 🔑 🐈 🆕 🍇
    🐐 🆕
  🍉

  ✒️ 🐖 🙋 🍇
    😀 🔤I’m a blowfish.🔤
  🍉
🍉

🐇 📺 🍇
  🐇🐖 🏁 ➡️ 🚂 🍇
    🙋 🍩🎛🐟 👴 Prints "I’m a fish."
    🙋 🍩🎛🐡 👴 Prints "I’m a blowfish."
    🍎 0
  🍉
🍉
```

As you can see from the example 🐕 can be used in a method or initializer
declaration and always stands for the class on which a method or initializer is
called. 🐕 can also be used inside a class method body where it refers to the
class on which it was called.
