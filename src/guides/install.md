# Installing Emojicode

## Downloads

>!N By downloading any Emojicode binary you agree to the Emojicode License.
>!N All items in the downloaded bundle are subject to this license if
>!N not otherwise noted.

You can download the SDK for you system here:
https://github.com/emojicode/emojicode/releases

## Installing

1. [Download the SDK](https://github.com/emojicode/emojicode/releases) for your
  system and extract the tar file. For instance:

  ```
  tar -xzf Emojicode-VERSION-YOUR-PLATFORM.tar.gz
  ```

2.  Run the `install.sh` script in the extracted directory:

  ```
  cd Emojicode-VERSION-YOUR-PLATFORM
  ./install.sh
  ```

  You might need to run it with root privileges.

3. Probably your system is not yet ready to display emojis. While Mac OS X is,
  you will likely have to install the `ttf-ancient-fonts` on Linux.

  ```
  sudo apt-get install ttf-ancient-fonts
  ```

## Building

You can also build Emojicode directly on your system if no binary is available
for your system.

Perquisites:
- **clang** or **GCC 4.7+**
- **make** (Preferably GNU Make)
- SDL2 (libsdl2-dev) to compile the SDL package
  - `sudo apt-get install libsdl2-dev` on Debian/Ubuntu
  - `brew install SDL2` on OS X

Steps:

1. [Download the source code from GitHub.](https://github.com/emojicode/emojicode)
2. Extract the downloaded source and navigate into it. Then simply run

  ```
  make
  ```

  to compile the Engine, the compiler and all default packages.

  You may need to change the heap size, which defaults to 512 MB, to something
  different on older Raspberry Pis:

  ```
  make HEAP_SIZE=128000000
  ```
3. Run

  ```
  make dist
  ```

  After the command is done you will find a directory and a tarfile
in `builds` named after your platform, e.g. `Emojicode-0.2.0-beta.2-x86_64-linux-gnu`.
4. Go to step 2 in the [Installing](#installing) guide above.
