# Package System

## Packages

A package is a versioned bundle of code, that can be required from your program. A package can also come with a native binary to access special parts of the host system, like for instance the GPU (the graphics card). The version of the package is built into the program so that at runtime a compatible binary can be loaded if required.

You can require a package using this syntax:

```
📦 packageName destinationNamespace
```

*packageName* must be a **variable** which represents the name of the package. *destinationNamespace* is the name of the destination into which the package provided classes are loaded. Example:

```
📦 files 🔴
```

All packages must be loaded before a class was declared.

Emojicode comes bundled with a few packages:

- `files` which allows you to interact with the file system and
- `sqlite` which allows you to work with SQLite 3 databases.

>!H The package system is still in its infancy and will be improved in the next versions.
>!H
>!H You can of course build a package yourself but the documentation in [Appendix II](packageAPI.html) is not complete and the interface and the belonging language constructs might drastically change.

## Package Management

Packages available on your system must be place at a special place on your computer: `/usr/local/EmojicodePackages/`. This directory has a special structure, which allows a very fast loading of the packages.

The package manager manages the packages on your system and allows you to install, update and remove packages.

Only one version of a major release of a package can exist on a system. Multiple major versions of a package can exist together. The package manager will always update major versions to their latest minor version. Since all packages have to agree to semantic versioning it is guaranteed that updating to minor versions does not introduce not backwards compatible changes.

## Package Register and Manager

There are plans to run an package register and build a package manger for easy install, update and use of packages.
