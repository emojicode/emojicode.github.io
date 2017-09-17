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
available. This metatype can then be treated like any other value.

>!N Currently, only the meta types of classes are available.

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

