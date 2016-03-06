# Installing Emojicode

## Downloads

>!N By downloading any Emojicode binary you agree to the Emojicode License.
>!N All items in the downloaded bundle are subject to this license if
>!N not otherwise noted.

You can download the SDK for you system here:
https://github.com/emojicode/emojicode/releases

Instruction to build Emojicode from source can be found in the 
[GitHub repository](https://github.com/emojicode/emojicode/).

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
