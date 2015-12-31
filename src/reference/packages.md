# Package System

## Packages? What for?

Packages are intended to add core functionality to Emojicode that is hard to achieve using implementations in Emojicode, for instance: Database access to databases like MySQL or Postgres, or access to graphic APIs like OpenGL.

>!N Packages are not a replacement for simple libraries and should only be used if native code (C) is really necessary. Packages introduce an overhead and can limit cross-platform functionality of your program.

## Package Register

The Emojicode Committee is running a package register which contains all package approved by it. This packages are also listed in this documentation under [Package Index](../packages/).

## Package Manager

These packages must be place at a special place on your computer, likely /usr/local/EmojicodePackages/. This directory has a special structure, which allows a very fast loading of the packages.

You can theoretically manually build the packages and copy them there, though using the *Emojicode Package Manager* (short *EPM*) is a lot easier.

The package manager manages the packages on your system and allows you to install, update and remove packages.

Only one version of a major release of a package can exist on a system. Multiple major versions of a package can exist together. The package manager will always update major versions to their latest minor version. Since all packages have to agree to semantic versioning it is guaranteed that updating to minor versions does not introduce not backwards compatible changes.
