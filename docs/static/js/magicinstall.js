'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var versionSelect = document.querySelector('#magic-install-version');
var osSelect = document.querySelector('#magic-install-os');
var httpSelect = document.querySelector('#magic-install-http');
var codeCode = document.querySelector('#magic-install-code');

var releases = void 0;

function osChanged() {
  var os = osSelect.options[osSelect.selectedIndex].value;
  selectSelect(httpSelect, os === 'darwin' ? 'curl' : 'wget');
  generateCode();
}

function generateCode() {
  var release = releases[versionSelect.options[versionSelect.selectedIndex].value];
  var os = osSelect.options[osSelect.selectedIndex].value;

  var downloadURL = release.assets.find(function (asset) {
    return new RegExp(os, 'i').test(asset.browser_download_url);
  }).browser_download_url;

  var httpTool = httpSelect.options[httpSelect.selectedIndex].value;
  var downloadCommand = httpTool === 'wget' ? 'wget ' + downloadURL + ' -O emojicode.tar.gz' : 'curl -o emojicode.tar.gz -L ' + downloadURL;

  var dirname = downloadURL.substr(downloadURL.lastIndexOf('/') + 1).slice(0, -7);

  var code = downloadCommand + '\ntar -xzf emojicode.tar.gz\nrm emojicode.tar.gz\ncd ' + dirname + '\n./install.sh\ncd ..\nrm -r ' + dirname;
  codeCode.innerHTML = code;
}

function selectSelect(select, value) {
  [].concat(_toConsumableArray(select.options)).some(function (option, index) {
    if (option.value === value) {
      select.selectedIndex = index;
      return true;
    }
    return false;
  });
}

function processReleaseData(data) {
  releases = data.data;

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = releases.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _step$value = _slicedToArray(_step.value, 2),
          index = _step$value[0],
          release = _step$value[1];

      var option = document.createElement('option');
      option.value = index;
      option.text = release.name;
      versionSelect.add(option, null);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  var platform = /Mac/.test(window.navigator.platform) ? 'darwin' : 'x86_64-linux';
  selectSelect(osSelect, platform);

  osChanged();
}

versionSelect.addEventListener('change', generateCode);
osSelect.addEventListener('change', osChanged);
httpSelect.addEventListener('change', generateCode);