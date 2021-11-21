const fs = require('fs-extra');
const path = require('path');
const Mustache = require('mustache');
const sass = require('node-sass');
const minify = require('html-minifier').minify;
const { execSync } = require('child_process');

const Package = require('./package');
const Markdown = require('./markdown');
const log = require('./log');

class Templater {
  constructor(compiler) {
    this.templates = {};
    this.compiler = compiler;
    this.readTemplates();
  }

  readTemplates() {
    log.log('Loading templates.');
    fs.readdirSync(this.compiler.srcPath('templates')).forEach((filename) => {
      const name = path.basename(filename, '.mustache');
      this.templates[name] = fs.readFileSync(this.compiler.srcPath('templates', filename), 'utf8');
      Mustache.parse(this.templates[name]);
    });
  }

  writeFile(opath, html) {
    fs.writeFile(opath, minify(html, { collapseWhitespace: true, sortAttributes: true }));
  }

  template(template, outputPath, current, view,
    { string = false, noLayout = false, isDocumentation = true } = {}) {
    view.isDocumentation = isDocumentation;

    const tempstring = string ? template : this.get(template);
    const content = Mustache.render(tempstring, view, this.templates);
    if (noLayout) {
      this.writeFile(outputPath, content);
      return;
    }

    const html = Mustache.render(this.templates.main, {
      content,
      title: view.title,
      isDocumentation,
      activeClass() {
        return text => (current === text ? 'class="active"' : '');
      },
    }, this.templates);
    this.writeFile(outputPath, html);
  }

  get(name) {
    return this.templates[name];
  }
}

class Compiler {
  constructor(out, src) {
    this.out = out;
    this.src = src;
    this.templater = new Templater(this);
    this.branchName = process.env.BRANCH || execSync('git symbolic-ref --short HEAD', { encoding: 'utf8' }).trim();
  }

  outPath(...components) {
    components.unshift(this.out);
    return path.join(...components);
  }

  srcPath(...components) {
    components.unshift(this.src);
    return path.join(...components);
  }

  template(...args) {
    this.templater.template(...args);
  }

  createStatic(scssFileNames, copy) {
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
        if (err) {
          log.error(`Sass compilation errored: ${err}`);
        }
        else {
          fs.writeFile(this.outPath('static', 'css', `${name}.css`), result.css);
        }
      });
    });
  }

  createPages() {
    const pages = require(this.srcPath('pages', 'pages.json'));
    for (const page of pages) {
      log.log(`Templating page ${page.source}.`);
      page.string = true;
      const data = fs.readFileSync(this.srcPath('pages', page.source), 'utf8');
      fs.ensureDirSync(this.outPath(...page.destination.slice(0, -1)));
      this.template(data, this.outPath(...page.destination),
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
        branchName: this.branchName,
        prev: i > 0 ? `${chapters[i - 1].name}.html` : null,
        next: i + 1 < chapters.length ? { title: chapters[i + 1].title, href: `${chapters[i + 1].name}.html` } : null,
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
    fs.copy(this.outPath('docs', name, `${chapters[0].name}.html`), indexPath);
  }

  createPackages() {
    fs.ensureDirSync(this.outPath('docs', 'packages'));

    const packagesJson = require(this.srcPath('packages', 'packages.json'));

    const packages = packagesJson.default.map((name) => {
      const sentence = new Package(this, name, false).build();
      return { name, sentence };
    });

    const externalPackages = packagesJson.external.map((name) => {
      const sentence = new Package(this, name, true).build();
      return { name, sentence };
    });

    this.template('packages', this.outPath('docs', 'packages', 'index.html'), 'packages', {
      packages,
      externalPackages,
      title: 'Packages',
    });
  }
}

module.exports = Compiler;
