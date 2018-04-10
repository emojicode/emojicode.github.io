# Documentation

Documentation is an important part of writing good code. Therefore Emojicode
offers built-in tools to document your code.

## Documentation Comments

Emojicode supports a special type of comments which are called *Documentation
Comments*. The syntax of these documentation tokens is:

```syntax
$documentation-comment$-> 📗 $documentation-comment-characters$ 📗
$documentation-comment-characters$-> $documentation-comment-character$ | $documentation-comment-characters$
$documentation-comment-character$-> --📗 $unicode$
```

Documentation comments can only occur at specific locations:

- Before a class, value type, enum or protocol declaration:

  ```
  📗
    Protocol defining random-access.

    Types representing a collection whose elements can be accessed by 🐽 randomly
    should conform to this protocol. The number of elements must be finite and
    returned by 🐔.
  📗
  🌍 🐊 🐽️🐚Element⚪️ 🍇
  ```

- Before a method, type method or initializer declaration:

  ```
  📗
    Gets the item at *index*. If the index is invalid the behavior is up to
    the conforming type.
  📗
  ❗️ 🐽 index 🔢 ➡️ Element
  ```

- Before an enumeration option:

  ```
  📗 Indicates a generic error. 📗
  🔘 🔴
  ```

- In packages before 🔮 to add documentation about the whole package:

  ```
  📗
    Emojicode’s standard library.
  📗
  🔮 1 0
  ```

Although there is of course no obligation to do so, these comments traditionally
use Markdown. All packages that ship with Emojicode are documented this way and
are automatically compiled into the Package Index of this documentation.

The compiler furthmore offers an option to create a JSON report about a package,
including all documentation added with documentation tokens. To learn more about
this see [Appendix: The Emojicode Compiler](compiler.html).
