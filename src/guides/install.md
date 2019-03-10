# Installing Emojicode 0.9

## Prerequisites

Before you install Emojicode make sure you have a C++ compiler and linker
installed. `clang++` or `g++` are fine, for instance. The Emojicode compiler can
only link binaries if such a compiler is available.

## Magic Installation

The magic installation is the easiest way to install Emojicode. Select your
operating system and and copy’n’paste the below commands into your
shell. The script will download the appropriate Emojicode binaries and run the
installer.

The installer will tell you what it is about to do and will prompt you for
confirmation.

If you're on Windows 10, you can use
[Bash on Ubuntu on Windows 10](https://msdn.microsoft.com/en-us/commandline/wsl/install_guide)
to install and use Emojicode. From there, simply select `Linux` as your OS and
proceed as specified above.

<div class="magic-install-sw">
  <div class="magic-install-sw-box">
    <label class="magic-install-sw-label">
      Version
    </label>
    <select id="magic-install-version"></select>
    <div class="magic-install-sw-help">We recommend that you choose the latest.</div>
  </div>
  <div class="magic-install-sw-box center">
    <label class="magic-install-sw-label">
      Operating System
    </label>
    <select id="magic-install-os">
      <option value="darwin">macOS</option>
      <option value="linux">Linux</option>
    </select>
  </div>
  <div class="magic-install-sw-box">
    <label class="magic-install-sw-label">
      Downloader
    </label>
    <select id="magic-install-http">
      <option value="curl">curl</option>
      <option value="wget">wget</option>
    </select>
    <div class="magic-install-sw-help">If you’re unsure, just leave it like it is.</div>
  </div>
</div>
<pre><code id="magic-install-code"></code></pre>

## Try Emojicode without Installing

You can even try Emojicode by only downloading it. [Download the prebuilt binaries](https://github.com/emojicode/emojicode/releases) and extract the tar file and navigate into the extracted directory:

```bash
tar -xzf Emojicode-VERSION-YOUR-PLATFORM.tar.gz
cd Emojicode-VERSION-YOUR-PLATFORM
```

You’re ready to go! Try this, for example:

```bash
echo '🏁 🍇
  😀 🔤Hello World!🔤❗️
🍉' > hello.emojic
./emojicodec hello.emojic  # Compile it
./hello  # Run it!
```

## Installing for Arch Linux

Install the [`emojicode`](https://aur.archlinux.org/packages/emojicode) package from the AUR using your favourite AUR helper or the manual `git`/`makepkg` method.

## Troubleshooting

If you see a message like the one below

```
sh: 1: c++: not found
```

try exporting the name of your C++ compiler like in the below example:

```bash
export CXX=clang++  # or g++ or whatever your compiler is
```

## Manual Installation

1. [Download the prebuilt binaries](https://github.com/emojicode/emojicode/releases) for your
  system and extract the tar file. For instance:

  ```bash
  tar -xzf Emojicode-VERSION-YOUR-PLATFORM.tar.gz
  ```

2.  Run the `install.sh` script in the extracted directory:

  ```bash
  cd Emojicode-VERSION-YOUR-PLATFORM
  ./install.sh
  ```

  You can find more information about the installer above.

### Very Manual Installation

If the installer doesn’t work for you or you simply don‘t want to use it, you
can also copy things into place yourself.

1. [Download the prebuilt binaries](https://github.com/emojicode/emojicode/releases)
  for your system and extract the tar file.

2. Copy `emojicodec` (the compiler executable) to the place you keep executables.

3. Copy the contents of the  `packages` somewhere where the
   Emojicode Compiler can find it.

   One of these locations is `/usr/local/EmojicodePackages`. See [Package Search Paths](../reference/compiler.html#package-search-paths) for more information.
4. Finally, you should copy the contents of `include` into a directory named
   `emojicode` in your C++ compiler’s search path.

   The installer, for example, copies it to `/usr/local/include/emojicode`.

## Building from Source


Instruction to build Emojicode from source can be found in the
[GitHub repository](https://github.com/emojicode/emojicode/).



<script src="/static/js/magicinstall.js"></script>
