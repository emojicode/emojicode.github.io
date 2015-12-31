# Appendix I: The Emojicode Compiler

This chapter is dedicated to the Emojicode Compiler as published by the Emojicode Committee. Other Emojicode compilers may provide a different command-line interface.

## Compiling files to a binary

The most obvious purpose of the compiler is the compilation of Emojicode source files to Emojicode Byte-Code files.

You can pass any number of files to the compiler, which will read them in order of appearance. Basically the compiler doesn’t care at all where the source code came from, so passing one big file or multiple small files does not make any difference.

It is however important to note that the order of type declarations matter. You cannot refer to a type before it was defined.

Example command:

```
emojicodec aFile.emojic anotherFile.emojic
```

By default the output file will have the same name as the first input file. You can explicitly set an output name with the `-o` option:

```
emojicodec -o awesomeProgram.emojib aFile.emojic anotherFile.emojic
```

## Switch the compiler into JSON mode

The option `-j` can be used to switch the compiler into the JSON mode. When working in the JSON mode the compiler will  print all errors and warnings to the standard error as a JSON array.

Example:

```
emojicodec -j haferPackageTest.emojic
```
```
[{"type": "error", "line": 0, "character": 0, "file":"", "message":"Couldn't read input file \/usr\/local\/EmojicodePackages\/hafer\/header.emojic."}
```

## Print the version

Of course you can print the version of the compiler. E.g.

```
emojicodec -v
```

## Package Report

You can ask the compiler to generate a JSON report of all types defined in a given package.

To generate a report of all files directly passed to the compiler use the `-r` option. To generate a report of a specific package use the `-R packageName` option.
