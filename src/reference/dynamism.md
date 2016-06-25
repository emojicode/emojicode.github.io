# Dynamism

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
