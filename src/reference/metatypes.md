# Metatypes

Emojicode allows you to pass certain types as value. You can then call
type methods on these types or instantiate them.

## Metatype

Metatypes are the types of types such as classes or value types.

The metatype of a type is the normal type name prefixed by 🔳. The metatype
of 🔡, for instance, is 🔳🔡 and the metatype of 🚂 is 🔳🚂. A variable that
holds the type of the 🐟 class, for example, looks like this:

```
🍰 fishType 🔳🐟
```

To get an instance of such a metatype, or in other words a type as value, you
can use the 🔳 statment:

<pre>
🔳 $type$
</pre>

*type* must be a type identifier identifying a type whose meta type is available
to be used at runtime. These types are classes, enums and value types. This
metatype can then be treated like any other value.

To populate the variable from the above example, this code could be used:

```
🍮 fishType 🔳🐟
```

## Compatibility of Metatypes

Metatypes are compatible as the types their instances represent are.

## Using Metatype Instances

You can use metatype instances as type in functions. Instead of providing a type
you can prefix an expression that evaluates to a metatype instance with ⬛️.

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

## 🐓 The Class

Inside a class 🐓 stands for the type on which a method or intializer is called.

You can use 🐓 for flexible and powerful solutions, like shown below.

```
🐇 🐟 🍇
  🐇🐖 🎛 ➡️ 🐓 🍇
    🍎 🔷🐓🆕
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

As you can see from the example 🐓 can be used in a method or initializer
declaration and always stands for the class on which a method or initializer is
called. 🐓 can also be used inside a class method body where it refers to the
class on which it was called.

>!N 🐓 **must not** be used in the body of a method or initializer.

>!N Because 🐓 could be used in class methods, which can execute on subclasses
>!N that do not have all non-required initializers, you can only use required
>!N initializers to instantiate 🐓.

## Access Modifiers

*Access Modifiers* describe from which context a method, class method or initializer can be called. There are three access modifiers, which can be applied to methods, initializers, and class methods.

- 🔓: The method, initializer, or class method can be accessed from everywhere.
- 🔒: The method, initializer, or class method may only be accessed within the class it was defined.
- 🔐: The method, initializer, or class method may only be accessed within the class it was defined or within a class that inherits from that class.

## Reserved Emojis

These emojis cannot be used as method names:

🍮🍩🍰🍨🍯🍦🍫🍳🍪🍭🍺🍻🔁🔂🍎🍊🍋🍇🍉🍓🍆🍌🔲🔷🐕⚡️☁️🐚⏭⏩

These emojis are reserved at lexer level and can therefore not be used for method or class names:

🔤👵🔟👍👎👴
