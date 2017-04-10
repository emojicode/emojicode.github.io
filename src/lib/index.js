const path = require('path');
const chalk = require('chalk');
const chokidar = require('chokidar');
const Compiler = require('./compiler');

const argv = require('minimist')(process.argv.slice(2));

console.log(chalk.green('📗  EmojicodeDocsCompiler 2.0.0'));

const compiler = new Compiler(path.resolve(__dirname, '..', '..', 'docs'),
                              path.resolve(__dirname, '..'), '/docs/');
compiler.createStatic();
compiler.createPages();

function buildReference() {
  compiler.createBook('reference', 'The Language Reference & Guide');
}

function buildGuides() {
  compiler.createBook('guides', 'Guides');
}

buildGuides();
buildReference();
compiler.createPackages();

function watch(watchPath, action) {
  chokidar.watch(watchPath, {
    ignored: /(^|[/\\])\../,
    ignoreInitial: true,
  }).on('add', action).on('change', action).on('unlink', action);
}

if (argv.watch) {
  console.log(chalk.yellow('Watching for changes...'));

  watch(path.resolve(__dirname, '..', 'reference'), () => buildReference());
  watch(path.resolve(__dirname, '..', 'guides'), () => buildGuides());
  watch(path.resolve(__dirname, '..', 'pages'), () => compiler.createPages());
  watch(path.resolve(__dirname, '..', 'static'), () => compiler.createStatic());
  watch(path.resolve(__dirname, '..', 'packages'), () => compiler.createPackages());
}
