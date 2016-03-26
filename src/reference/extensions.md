# Extensions

Extensions allow you to extend an existing class. You can do everything in an 
extension you could do in a class definition body.

## Extending

The syntax is:

	🐋 class 🍇

	🍉

*class* must be an existing class.

It is possible to declare that a class agrees to a protocol in the class 
definition and to implement the required methods in an extension.

You can also extend classes from other packages. Example:

```
🐇 📺 🍇
  🐇🐖 🏁 ➡️ 🚂 🍇
    😀 😈 🔤The Candy Man🔤

    🍎 0
  🍉
🍉

🐋 🔡 🍇
  🌮 Reverses a string 🌮
  🐖 😈 ➡️ 🔡 🍇
    🍮 out 🔤🔤

    🔂 i ⏭ ➖ 📏 🐕 1 -1 -1 🍇
      🍮 out 📝 out 🍺 🔬 🐕 i
    🍉

    🍎 out
  🍉
🍉
```

## Circumvent circular dependencies

Extension can also be used to circumvent circular dependencies. Imagine this 
problem:

```
🐇 🌕 🍇
  🍰 belongingTo 🌍
🍉

🐇 🌍 🍇
  🍰 moon 🌕
🍉

```

No matter how you order the class definitions, this example will not compile.

This problem can be solved using extensions:

```
🐇 🌍 🍇🍉

🐇 🌕 🍇
  🍰 belongingTo 🌍
🍉

🐋 🌍 🍇
  🍰 moon 🌕
🍉
```

Although extensions to classes are practically cost free it is not considered 
good style to always “forward declare” classes to extend them later.
