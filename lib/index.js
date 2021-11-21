const path = require('path');
const chokidar = require('chokidar');
const argv = require('minimist')(process.argv.slice(2));
const serveStatic = require('serve-static');
const finalhandler = require('finalhandler');
const http = require('http');

const Compiler = require('./compiler');
const log = require('./log');

const compiler = new Compiler(path.resolve(__dirname, '..', 'out'),
                              path.resolve(__dirname, '..', 'src'));

function buildStatic() {
  compiler.createStatic(['front', 'docs'],
    ['fonts', 'img', 'js/gumshoe.min.js', 'js/magicinstall.js']);
}

function buildReference() {
  compiler.createBook('reference', 'The Language Reference & Guide');
}

function buildGuides() {
  compiler.createBook('guides', 'Guides');
}

function buildAllWithTemplates() {
  compiler.createPages();
  buildGuides();
  buildReference();
  compiler.createPackages();
}

function watch(watchPath, action) {
  chokidar.watch(watchPath, {
    ignored: /(^|[/\\])\../,
    ignoreInitial: true,
  }).on('add', action).on('change', action).on('unlink', action);
}

buildStatic();
buildAllWithTemplates();

if (argv.watch || argv.serve) {
  log.log('Watching for changes...');

  watch(path.resolve(__dirname, '..', 'src', 'reference'), () => buildReference());
  watch(path.resolve(__dirname, '..', 'src', 'guides'), () => buildGuides());
  watch(path.resolve(__dirname, '..', 'src', 'pages'), () => compiler.createPages());
  watch(path.resolve(__dirname, '..', 'src', 'static'), () => buildStatic());
  watch(path.resolve(__dirname, '..', 'src', 'packages'), () => setTimeout(() => compiler.createPackages(), 1000));
  watch(path.resolve(__dirname, '..', 'src', 'templates'), () => {
    compiler.templater.readTemplates();
    buildAllWithTemplates();
  });
}

if (argv.serve) {
  log.log('Serving on port 8080...');

  const serve = serveStatic(compiler.out);
  http.createServer((req, res) => serve(req, res, finalhandler(req, res))).listen(8080);
}
