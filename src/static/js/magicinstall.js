const versionSelect = document.querySelector('#magic-install-version');
const osSelect = document.querySelector('#magic-install-os');
const httpSelect = document.querySelector('#magic-install-http');
const codeCode = document.querySelector('#magic-install-code');

let releases;

function osChanged() {
  const os = osSelect.options[osSelect.selectedIndex].value;
  selectSelect(httpSelect, os === 'darwin' ? 'curl' : 'wget');
  generateCode();
}

function generateCode() {
  const release = releases[versionSelect.options[versionSelect.selectedIndex].value];
  const os = osSelect.options[osSelect.selectedIndex].value;

  const downloadURL = release.assets.find(asset =>
    new RegExp(os, 'i').test(asset.browser_download_url)).browser_download_url;

  const httpTool = httpSelect.options[httpSelect.selectedIndex].value;
  const downloadCommand = httpTool === 'wget' ? `wget ${downloadURL} -O emojicode.tar.gz` :
                          `curl -o emojicode.tar.gz -L ${downloadURL}`;

  const dirname = downloadURL.substr(downloadURL.lastIndexOf('/') + 1).slice(0, -7);

  const code = `${downloadCommand} \\
&& tar -xzf emojicode.tar.gz && rm emojicode.tar.gz \\
&& cd ${dirname} && ./install.sh \\
&& cd .. && rm -r ${dirname}`;
  codeCode.innerHTML = code;
}

function selectSelect(select, value) {
  [...select.options].some((option, index) => {
    if (option.value === value) {
      select.selectedIndex = index;
      return true;
    }
    return false;
  });
}

function processReleaseData(data) {
  releases = data.data;

  for (const [index, release] of releases.entries()) {
    if (/^1\.0/.test(release.name)) {
      const option = document.createElement('option');
      option.value = index;
      option.text = release.name;
      versionSelect.add(option, null);
    }
  }

  const platform = /Mac/.test(window.navigator.platform) ? 'darwin' : 'x86_64-linux';
  selectSelect(osSelect, platform);

  osChanged();
}

versionSelect.addEventListener('change', generateCode);
osSelect.addEventListener('change', osChanged);
httpSelect.addEventListener('change', generateCode);

const script = document.createElement('script');
script.src = 'https://api.github.com/repos/emojicode/emojicode/releases?callback=processReleaseData';
document.body.appendChild(script);
