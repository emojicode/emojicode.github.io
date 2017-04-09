# Documentation

Documentation is an important part of writing good code. Therefore Emojicode
offers built-in tools to document your code.

## Documentation Comments

Emojicode supports a special type of comments which are called *Documentation
Comments*. The syntax of these documentation tokens is:

<pre class="syntax">
$documentation-token$-> 🌮 $comment-content$ 🌮
</pre>

Documentation comments can only occur at specific locations:

- Before a class, value type, enum or protocol declaration:
  ```
  🌮
    A class whose instances shall be enumerable using the 🔂 loop must
    implement this protocol.
  🌮
  🌍 🐊 🔂🐚Element⚪️ 🍇

  🍉
  ```
- Before a method, type method or initializer declaration:
  ```
  🌮
    This method must return an instance of a class that conforms to
    [[🍡]] which will be used to enumerate this instance.
  🌮
  🐖 🍡 ➡️ 🍡🐚Element
  ```
- In packages before 🔮 to add documentation about the whole package:
  ```
  🌮
    The sockets package allows you to open TCP sockets to servers or to create a TCP server socket
    yourself.

    The following is a very basic example...
  🌮
  🔮 0 1
  ```

Although there is of course no obligation to do so, these comments traditionally
use Markdown. All packages that ship with Emojicode are documented this way  and
are automatically compiled into the Package Index of this documentation. The
compiler for this documentation also supports an additional syntax for
auto-linking types, which is `[[type-emoji]]` and will automatically link to the
correct type in the package.

## Reporting

The advantage of documentation comments is that the compiler is aware of that
it’s not just any comment but documentation for a package, type or method.

You can take advantage of that and tell the compiler to generate a report of a
package using the `-r`, which will report on the `_` package, or `-R
packageName`, which will report on the package whose name was provided. The
compiler can only report on packages that were loaded within the program.

For example, running `emojicodec -R sockets server.emojic` will produce
something similar to (abridged and formatted):

```
{
  "documentation": "\n  The sockets package allows you to...",
  "valueTypes": [],
  "classes": [
    {
      "name": "🏄",
      "genericArguments": [],
      "documentation": "\n  🏄 represents a socket that listens ...",
      "methods": [
        {
          "name": "🙋",
          "access": "🔓",
          "returnType": { "package": "sockets", "name": "📞", "optional": true },
          "genericArguments": [],
          "documentation":"\n    Waits until a client wants to ...",
          "arguments": []
        }
      ],
      "initializers":[
        {
          "name": "🆕",
          "access": "🔓",
          "canReturnNothingness": true,
          "genericArguments": [],
          "documentation": "\n    Creates a 🏄 instance that immediately ...",
          "arguments": [
            {
              "type":{ "package": "s", "name": "🚂", "optional": false },
              "name": "port"
            }
          ]
        }
      ],
      "classMethods": [],
      "conformsTo": []
    }
  ],
  "enums": [],
  "protocols": []
}
```

Furthermore, the compiler might also display documentation in error messages
when considered appropriate (e.g. with deprecated methods).
