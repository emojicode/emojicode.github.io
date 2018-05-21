# Appendix: The Emojicode Compiler

This chapter is dedicated to the official Emojicode Compiler.

It is inteded to give more detail on certain options and by no
mean comprehensive. To obtain a full list of all command line options run
`emojicodec --help`.

## Compiling Files to an Executable Binary

The most obvious purpose of the compiler is the compilation of Emojicode source
files into a binary. The compiler expects the path to a single file, which
is the main file of the `_` package. E.g.

```sh
emojicodec hello.emojic
```

By default, the output file will have the same name as the main file. You
can explicitly set an output name with the `-o` option:

```sh
emojicodec aFile.emojic -o awesomeProgram
```

## Compiling A Package

To compile a package to a static library you have to specify a package name with
`-p`. E.g.

```sh
emojicodec -p catsimulator main.emojic
```

The output will have the name of your package, prefixed with `lib` and suffixed
with `.a`. You should not change the name of the output, but you can do so
with the `-o` option. The output file name must be suffixed with `.a`.

## Compiling to an Object File

You can tell the compiler to generate an object file instad of a static library
(archive) or exectuable with the `-c` flag. E.g

```
emojicodec -p catsimulator main.emojic -c
emojicodec hello.emojic -c
```

By default the output file will have the name of the main file with suffix `.o`
instead of `.emojic`. You can change the output path with `-o`.

## Package Search Paths

When you import a package, the compiler will search the package search paths for
the requested package. The search paths are:

1. `./packages` relative to the current directory.
2. Paths added with command line option `-S` in order of apperance from left to
  right.
3. Contents of the environment variable `EMOJICODE_PACKAGES_PATH` if set.
4. The default package search path, which is `/usr/local/EmojicodePackages/` but
  can be changed when building the compiler.

The compiler will look for directory named after the requested package in the
first package search path. If such a directory is found, the package is
considered found and an archive named as describe in “Compiling A Packge” is
expected. If such a directory is not found, the compiler tries with the next
package search paths. If search paths are exhausted an error is raised.

### Example

```sh
emojicodec test.emojic -S /opt/a -S /opt/b
```

If you run the above command in directory `/home/me/` with the environment
variable `EMOJICODE_PACKAGES_PATH` set to `/etc/packages` and `test.emojic`
imports a package called `dog` the compiler will look for it in the following
locations:

1. `/home/me/packages/dog`
2. `/opt/a/dog`
3. `/opt/b/dog`
4. `/etc/packages/dog`
5. `/usr/local/EmojicodePackages/dog`

## Switch the Compiler into JSON Mode

The option `--json` can be used to switch the compiler into JSON mode. When
working in JSON mode the compiler will print all errors and warnings to
standard error as a JSON array.

## Package Report

To generate a JSON report of the package the compiler compiled, you can pass the
`-r` option. These reports are used to build this documentation.

