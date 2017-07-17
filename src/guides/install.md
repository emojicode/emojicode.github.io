# Installing Emojicode

## 🎩 Magic Installation

The magic installation is the easiest way to install Emojicode. Just select your
operating system and the version you wish to install below (we’ve already
tried to preselected them for you) and copy’n’paste the below commands into your
shell. The script will download the appropriate Emojicode SDK and run the
installer.

The installer will tell you what it is about to do and will prompt you for
confirmation. By default, the installer will try to install Emojicode into
/usr/local/bin and /usr/local/EmojicodePackages. If your user doesn’t have
write access to these directories the installer will offer you to use sudo
(from 0.3.1 on).

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
      <option value="x86_64-linux">Linux</option>
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

## Manual Installation

1. [Download the SDK](https://github.com/emojicode/emojicode/releases) for your
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

3. Probably your system is not yet ready to display emojis. While Mac OS X is,
  you will likely have to install the `ttf-ancient-fonts` on Linux.

  ```bash
  sudo apt-get install ttf-ancient-fonts
  ```
Instruction to build Emojicode from source can be found in the
[GitHub repository](https://github.com/emojicode/emojicode/).

<script src="/docs/static/js/magicinstall.js"></script>
