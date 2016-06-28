# Packages

>!H Before reading this chapter make sure you’re familiar with [Emojicode’s
>!H namespacing](types.html#namespaces).

## What is a Package?

Emojicode divides code into so called *packages*. A package is a unit of code
that can consist of one or more Emojicode source code files. All packages have a
name associated with them and **all code belongs to a pacakge**. If you tell the
compiler to **compile a file** this file implicitely becomes the starting point
for a **package called `_`**. So remember, all code you write belongs to a
package.

Each package has its **own set of types and own namespaces**. If you define or
import types in one package, this types will not be available in other packages
without explicitly importing them.

## Importing other packages

The object of packages is to provide an **easy way to reuse code**. Therefore
naturally, you can import other packages into a package. The syntax to do this
is:

<pre class="syntax">
📦 <span class="syntax-placeholder">packageName</span> <span class="syntax-placeholder">destinationNamespace</span>
</pre>

If such a statment ocours to the compiler, the compiler will search the
*Package Search Path* for a package with the given name `packageName` and will
try to import it. The default *Package Search Path* is
`/usr/local/EmojicodePackages/` for UNIX operating systems.

If you import a package, **all types that were exported from the imported
package will be made available in the importing package**. The types will be
added to the given namespace `destinationNamespace`. If this would cause a
naming collision the compiler will emit an error. It’s also important to note
here, that namespaces are completely local to a package.

The example below imports the `files` package into the global namespace 🔴.
The progam then uses the class 📄 which was imported from the
`files` package.

```
📦 files 🔴

🐇 💯 🍇
  🐇🐖 🏁 ➡️ 🚂 🍇
    🍦 file 🔷📄📜 🔤tests/fileTest_testFile.txt🔤

    🍎 0
  🍉
🍉
```

Any package can load other packages as long as this doesn’t lead to a circular
dependency. The compiler will detect circular dependencies and abort the
compilation.

The **s package is implicitly imported** into the global namespace 🔴 of
**every package**.

## Making a Package Importable

A package always has a single file as starting point which is either called
`header.emojic` for an importable package or arbitrarily named for the `_`
package. This file then can include other files using 📜.

**By default all types** defined within a package are internal and **not
exported**. If you want to export a type defined in your package you must
prepend it with 🌍.

Extensions are always applied to the extended class and can therefore not be
explicitely marked with 🌍. Packages are cached so an extension will only be
applied once. If your package extends a class the extensions will be available
everywhere after the package with the extension was loaded from somewhere within
the program.

Keep in mind that types don’t actually belong to a namespace. When exporting a
type the namespace is completely irrelevant. All exported types will be
imported into the requested namespace regardless in which namespace they were
intially exported.

Additionally an importable package must declare its version using 🔮:

<pre class="syntax">
🔮 <span class="syntax-placeholder">major</span> <span class="syntax-placeholder">minor</span>
</pre>

The `header.emojic` of a cat-simulator package must look like this:

```
🔮 1 4

🌍 🐇 🐱 🍇
  🐈 🎀 🍇🍉

  🐖 🎙 🍇
    😀 🔤Meow🔤
  🍉
🍉

🐇 💊 🍇
  🐈 🔬 🍇🍉

  🐖 💉 🍇
    👴 ... secret code ...
  🍉
🍉
```

Now, to make this package finally importable we’ll move this file into the
Package Search Path. Each package has its own directory which must be named
`{name}-v{major}` and a symbolic link to this directory just named after the
package.

So we will need to create a directory `cat-simulator-v1` and a link `cat-
simulator` to this directory. The directory will then look similiar to this:

```
...
├── s -> /usr/local/EmojicodePackages/s-v1
├── s-v1
│   └── header.emojic
├── cat-simulator -> /usr/local/EmojicodePackages/cat-simulator-v0
└── cat-simulator-v0
    └── header.emojic
```

If we imported this package, we would gain access to the 🐱 but we’d not be able
to access the 💊 class as it was not exported.

```
📦 cat-simulator 🔴

🐇 💯 🍇
  🐇🐖 🏁 ➡️ 🚂 🍇
    🍦 cat 🔷🐱🎀
    🎙 cat

    👴 The line below won't compile and should be removed
    🍦 drug 🔷💊🔬

    🍎 0
  🍉
🍉
```

## Native Binaries

Packages can be accompanied by a native compiled binary. Native binaries can
introduce performance issues and are not easy to get right and should only be
used when absolutely necessary.

To declare that a package comes with a native binary, you place a 📻 at the
document level.

```
🔮 0 1
📻

🌍 🐇 📑 🍇
  👴 ...
🍉
```

From then on, you can use 📻 instead of initializer and method bodies:

```
🔮 0 1
📻

🌍 🐇 📑 🍇
  🐇🐖 📁 path 🔡 ➡️ 🍬🚨 📻
  🐇🐖 🔫 path 🔡 ➡️ 🍬🚨 📻
  🍬 🐈 📝 message 🔡 📻
🍉
```

You should consult your virtual machine’s manual to learn more about
implementing the methods in C. It’s noteworthy that additional to the
difficulties mentioned at the beginning of this section native APIs
are not standardised and aren’t even required. A virtual machine can reject
a bytecode file if it depends on an external native binary.

The Emojicode Real-Time Engine supports native binaries. You can learn more
in the [The Package API](../guides/packageAPI.html) guide.

## Package Register and Manager

There are plans to run an package register and build a package manger for easy
install, update and use of packages.
