const path = require('path');
const chokidar = require('chokidar');
const argv = require('minimist')(process.argv.slice(2));

const Compiler = require('./compiler');
const log = require('./log');

const compiler = new Compiler(path.resolve(__dirname, '..'),
                              path.resolve(__dirname, '..', 'src'), '/docs/');

function buildStatic() {
  compiler.createStatic(['style', 'docs'], ['magicinstall', 'front'],
    ['fonts', 'img', 'js/gumshoe.min.js']);
}

function buildReference() {
  compiler.createBook('reference', 'The Language Reference & Guide');
}

function buildGuides() {
  compiler.createBook('guides', 'Guides');
}

function watch(watchPath, action) {
  chokidar.watch(watchPath, {
    ignored: /(^|[/\\])\../,
    ignoreInitial: true,
  }).on('add', action).on('change', action).on('unlink', action);
}

buildStatic();
compiler.createPages();
buildGuides();
buildReference();
compiler.createPackages();

if (argv.watch) {
  log.log('Watching for changes...');

  watch(path.resolve(__dirname, '..', 'src', 'reference'), () => buildReference());
  watch(path.resolve(__dirname, '..', 'src', 'guides'), () => buildGuides());
  watch(path.resolve(__dirname, '..', 'src', 'pages'), () => compiler.createPages());
  watch(path.resolve(__dirname, '..', 'src', 'static'), () => buildStatic());
  watch(path.resolve(__dirname, '..', 'src', 'packages'), () => compiler.createPackages());
  watch(path.resolve(__dirname, '..', 'src', 'templates'), () => log.warn('Template changes require a restart.'));
}
