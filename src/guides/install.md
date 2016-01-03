# Installing Emojicode

## Downloads

>!N By downloading any Emojicode binary you agree to the Emojicode License.
>!N All items in the downloaded bundle are subject to this licenese if
>!N not otherwise noted.

<div class="link-list">
  <a href="reference" class="link-box">
    <div class="name">
      Mac OS X
    </div>
    Suitable for any Mac running OS X 10.5 or later.
  </a>
  <a href="reference" class="link-box">
    <div class="name">
      Debian & Ubuntu
    </div>
    Suitable for most Linux OSs running on a 64bit processor.
  </a>
  <a href="reference" class="link-box">
    <div class="name">
      Raspberry
    </div>
    Suitable for Raspberry 1 & 2 running Raspbian.
  </a>
</div>

## Installing

1. Download the SDK for your system and extract the tarfile.
  Run the `install.sh` script in it with root privileges:

  ```
  sudo ./install.sh
  ```

2. Probably your system is not yet ready to display emojis. While Mac OS X is,
  you will likely have to install the `ttf-ancient-fonts` on Linux.

  ```
  sudo apt-get install ttf-ancient-fonts
  ```

## Building

You can also build Emojicode directly on your system if no binary is available
for your system.

Perquisites:
- clang or GCC 4.7+
- Ruby and Rake
  - `sudo apt-get install ruby rake` on Debian/Ubuntu
  - `brew install ruby` on OS X
- SDL2 (libsdl2-dev) to compile the SDL package
  - `sudo apt-get install libsdl2-dev` on Debian/Ubuntu
  - `brew install SDL2` on OS X

[Download the source code from GitHub.](https://github.com/emojicode/emojicode)

Extract the downloaded source and navigate into it. Then simply run:

```
rake package
```

This will compile the Emojicode Compiler, the Emojicode Engine and the default
packages. After the command is done you will find a directory and a tarfile
in `builds` named after your platform, e.g. `x86_64-apple-darwin15.2.0`.

You can then navigate into the director and install Emojicode by running
`install.sh`:

```
sudo ./install.sh
```

The tarfile is the directory tar archived and gzipped.
