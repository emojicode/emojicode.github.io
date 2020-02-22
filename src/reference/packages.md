# Packages

## What Is a Package?

Emojicode divides code into packages. A package is a unit of code
that can consist of one or more Emojicode source code files. All packages have a
name associated with them and all code belongs to a package.

If you tell the compiler to compile a file this file implicitly becomes the
main file for a package called `_`. So remember, all code you write
belongs to a package.

The objective of packages is to provide an easy way of reusing code as well as
allowing the programmer to divide programs into logical units.

Each package has its own set of namespaces. If you define or
import types in one package, these types will not be available in other packages
without explicitly exporting and importing them.

>!H Make sure you’re familiar with [Emojicode’s
>!H namespaces](types.html#namespaces).

## Importing Other Packages

As you probably already know, you can import packages. The syntax to do this is:

```syntax
$package-import$-> 📦 $package-name$ $type-emoji$
$package-name$-> $variable$
```

If such a statement occurs to the compiler, the compiler will search the
its package search paths for a package with the provided name *package-name*
and will try to import it. To learn more about the package search paths, please
see [Appendix: The Emojicode Compiler](compiler.html).

If you import a package, all types that were exported from the imported package
are made available in the importing package. The types will be added to the
provided namespace. If this would cause a naming collision, the compiler will
emit an error.

The example below imports the `files` package into the default namespace 🏠.
The progam then uses the class 📄 which was imported from the
`files` package.

```
📦 files 🏠

🏁 🍇
  🍺🆕📄📜 🔤novel.txt🔤❗️ ➡️ readFile
🍉
```

Any package can load other packages as long as this doesn’t lead to a circular
dependency. The compiler will detect circular dependencies and abort the
compilation.

The s package is implicitly imported into the default namespace 🏠 of
every package.

## Writing an Importable Package

### Exporting Types

A package always has a main file, which is the file you pass to the compiler.
This file can then include other files using 📜.

By default, all types defined within a package are internal and not
exported. If you want to export a type defined in your package you must
attribute it with 🌍.

Keep in mind that types don’t actually belong to a namespace. When exporting a
type, the namespace is irrelevant.

For instance, the main file of a cat simulator could look like this:

```
🌍 🐇 🐱 🍇
  🆕 🍇🍉

  ❗️ 🎙 🍇
    😀 🔤Meow🔤❗️
  🍉
🍉
```

### Compiling the Package

We can now tell the compiler to compile the cat simulator package:

```
emojicodec -p catsimulator main.emojic
```

If you run this command, the compiler will not create an executable binary, but
an archive (named `libcatsimulator.a` in our example) and an interface file
called `🏛`. The interface file describes your package in a
special subset of Emojicode.
When the compiler tries to import a package it looks for this interface file to
determine the interfaces of the package. It is crucial that you not modify this
file in any way. Note that the file may also be called `interface.emojii` but
no such file can coexist with a `🏛` file in a package.

If we place these two files inside a directory named `catsimulator` we
have a package ready for distribution!

Let us test our new package by writing this short program `test.emojic`:

```
📦 catsimulator 🏠

🏁 🍇
  🆕🐱❗️ ➡️ cat
  🎙cat❗️
🍉
```

Our directory structure looks like this now:

```
├── packages
│   └── catsimulator
│       ├── 🏛
│       └── libcatsimulator.a
└── test.emojic
```

Finally, we compile `test.emojic`

```
emojicodec test.emojic
```

and give it a shot:

```
Meow
```

## The 🏁 Block in Packages

You can include a 🏁 block in every package. Only the 🏁 block of the package from
which you ask the compiler to create an executable will be executed. This,  for
example, means that if you import a package that provides a 🏁 block it will not
be exeucted. If you compile that package to an executable then, of course, the 🏁
block will be executed.

## Linking with Non-Emojicode Code

You can also implement methods and initializers in another language.

To do this, you must specify a name for the method or initializer instead
of a function body. For example:

```
❗️ 🔡 ➡️ 🍬🔡 📻 🔤sDataAsString🔤
```

```syntax
$external-link-name$-> 📻 $string-literal$
```

You can then implement the function in e.g. C++. Then compile these
implementations to object files as well and pack them into the package archive.
It’s important that the implementations conform to the C calling convention.

Learn more about implementing functins in C++ in [this guide](/docs/guides/api.html).

## Specifying Shared Libraries to Link

Emojicode packages are complied to static archives. If your package depends
on a shared library this means that the Emojicode Compiler, when linking
the binary, must be aware of this dependency.

You can list shared libraries that must be linked as *link hints* at document
level:

```syntax
$link-hints$-> 🔗 $link-hints-list$ 🔗
$link-hints-list$-> $string-literal$ | $link-hints-list$
```

This example is taken from the allegro package:

```
📜 🔤display.emojic🔤
📜 🔤app.emojic🔤

🔗
  🔤allegro🔤
  🔤allegro_color🔤
  🔤allegro_primitives🔤
  🔤allegro_image🔤
  🔤allegro_ttf🔤
  🔤allegro_acodec🔤
  🔤allegro_audio🔤
  🔤allegro_font🔤
🔗
```

