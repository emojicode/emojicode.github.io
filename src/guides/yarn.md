# Managing Emojicode Packages with Yarn

The [Yarn package manager](https://yarnpkg.com/en/) can be used to install and
manage packages for Emojicode. See its documentation for
[installation instructions.](https://yarnpkg.com/en/docs/install)

It is important to set the name of the modules folder, into which Yarn will
install packages. Emojicode requires this folder to be named `packages`. (See
[Packages](../reference/packages.html))

This can be achieved with the command-line flag `--modules-folder packages`.
Yet, of course, it is much simpler to place a file called `.yarnrc` with the
same content in the main directory of your project and Yarn will
take this into consideration with every command you run.

## Tutorial: Installing the catsimulator Package

In this tutorial we are going to install the somewhat useless
`catsimulator` package. Make sure that you have [installed Yarn.](https://yarnpkg.com/en/docs/install)

First off, let’s create a directory in which we can work.

```sh
mkdir zoo
cd zoo
```

Next, we create the main file of our project `main.emojic`:

```
📦 catsimulator 🏠

🏁 🍇
  🆕🐱❗️ ➡️ cat
  🎙cat❗️
🍉
```

The above code uses the `catsimulator` package, so the only thing left to do is
installing it. Before using Yarn, let us create an appropriate `.yarnrc`:

```sh
echo "--modules-folder packages" > .yarnrc
```

Now, go ahead and add `catsimulator` to our project:

```sh
yarn add catsimulator
```

Once Yarn is finished, compile the project:

```
emojicodec main.emojic
```

If you run `./main` now, you should actually see:

```
Meow
```

Granted, this is a pretty complicated way to print “Meow”. But we have seen how
easy it is to download and install an Emojicode package with Yarn.

## Preparing a Package for Use with Yarn

Publishing an Emojicode package with Yarn is like publishing any other package
to npm.  Please see [Yarn’s documentation](https://yarnpkg.com/en/docs/creating-a-package)
for further information on this topic.

One important thing, however, is to tell Yarn how to compile your package. Do
not include any Emojicode binaries, object or interface files in your package.
Let the Emojicode compiler create these files when the package is installed
instead.

Below is an example from the `catsimulator` package’s `package.json`. It shows
the instructions that are used to build the package when it is installed with
Yarn.

```json
{
  ...
  "scripts": {
    "preinstall": "emojicodec -p catsimulator main.emojic -O"
  }
  ...
}
```

