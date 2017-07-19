const fs = require('fs-extra');
const path = require('path');
const Mustache = require('mustache');
const sass = require('node-sass');
const babel = require('babel-core');
const minify = require('html-minifier').minify;

const Package = require('./package');
const Markdown = require('./markdown');
const log = require('./log');

class Compiler {
  constructor(out, src, docsRoot) {
    this.out = out;
    this.src = src;
    this.docsRoot = docsRoot;
    this.mainTemplate = fs.readFileSync(this.srcPath('templates', 'main.mustache')).toString();
    Mustache.parse(this.mainTemplate);
  }

  outPath(...components) {
    components.unshift(this.out);
    return path.join(...components);
  }

  srcPath(...components) {
    components.unshift(this.src);
    return path.join(...components);
  }

  template(template, outputPath, current, view,
    { absolute = false, noLayout = false, isDocumentation = true } = {}) {
    const p = absolute ? template : this.srcPath('templates', `${template}.mustache`);
    const templateSource = fs.readFileSync(p).toString();

    const partial = name =>
      fs.readFileSync(this.srcPath('templates', `${name}.mustache`)).toString();

    view.docsRoot = this.docsRoot;
    view.isDocumentation = isDocumentation;

    function writeFile(opath, html) {
      fs.writeFileSync(opath, minify(html, { collapseWhitespace: true, sortAttributes: true }));
    }

    const content = Mustache.render(templateSource, view, partial);
    if (!noLayout) {
      const html = Mustache.render(this.mainTemplate, {
        content,
        docsRoot: this.docsRoot,
        title: view.title,
        isDocumentation,
        activeClass() {
          return text => (current === text ? 'class="active"' : '');
        },
      }, partial);
      writeFile(outputPath, html);
    }
    else {
      writeFile(outputPath, content);
    }
  }

  createStatic(scssFileNames, es6FileNames, copy) {
    log.log('Copying static folders.');

    fs.ensureDirSync(this.outPath('static', 'js'));
    fs.ensureDirSync(this.outPath('static', 'css'));

    copy.forEach((name) => {
      fs.copySync(this.srcPath('static', name), this.outPath('static', name));
    });

    scssFileNames.forEach((name) => {
      sass.render({
        file: this.srcPath('static', 'css', `${name}.scss`),
        outputStyle: 'compressed',
      }, (err, result) => {
        fs.writeFile(this.outPath('static', 'css', `${name}.css`), result.css);
      });
    });

    es6FileNames.forEach((name) => {
      babel.transformFile(this.srcPath('static', 'js', `${name}.es6`), {
        presets: ['es2015'],
        minified: true,
      },
      (err, { code }) => fs.writeFile(this.outPath('static', 'js', `${name}.js`), code));
    });
  }

  createPages() {
    const pages = require(this.srcPath('pages', 'pages.json'));
    for (const page of pages) {
      log.log(`Templating page ${page.source}.`);
      page.absolute = true;
      this.template(this.srcPath('pages', page.source), this.outPath(...page.destination),
                    page, {}, page);
    }
  }

  createBook(name, bookTitle) {
    log.log(`Creating ${name}.`);

    fs.ensureDirSync(this.outPath('docs', name));

    const rulesParser = new Markdown.RulesParser();

    const chapters = require(this.srcPath(name, 'chapters.json')).map((file) => {
      const markdown = fs.readFileSync(this.srcPath(name, file)).toString();
      const content = Markdown.parseContent(markdown);

      const fileName = path.basename(file, '.md');
      rulesParser.parse(markdown, fileName);

      return {
        name: fileName,
        sourcePath: path.join('src', name, file),
        markdown,
        title: content.title,
        sections: content.sections,
      };
    });

    for (const [i, chapter] of chapters.entries()) {
      chapter.current = true;
      const out = this.outPath('docs', name, `${chapter.name}.html`);
      this.template('chapter', out, name, {
        bookTitle,
        chapters,
        title: chapter.title,
        content: Markdown.toHtml(chapter.markdown, rulesParser, chapter.name),
        sections: chapter.sections,
        sourcePath: chapter.sourcePath,
        prev: i > 0 ? `${chapters[i - 1].name}.html` : null,
        next: i + 1 < chapters.length ? `${chapters[i + 1].name}.html` : null,
        thisHeadingID() {
          return this.toLowerCase().replace(/[^\w]+/g, '-');
        },
      });
      chapter.current = false;
    }

    rulesParser.warn('document-statement');

    const indexPath = this.outPath('docs', name, 'index.html');
    if (fs.existsSync(indexPath)) {
      fs.unlinkSync(indexPath);
    }
    fs.copySync(this.outPath('docs', name, `${chapters[0].name}.html`), indexPath);
  }

  createPackages() {
    fs.ensureDirSync(this.outPath('docs', 'packages'));

    const packages = require(this.srcPath('packages', 'packages.json')).map((name) => {
      const sentence = new Package(this, name).build();
      return { name, sentence };
    });

    this.template('packages', this.outPath('docs', 'packages', 'index.html'), 'packages', {
      packages,
      title: 'Packages',
    });
  }
}

module.exports = Compiler;
