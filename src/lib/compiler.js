const fs = require('fs-extra');
const path = require('path');
const Mustache = require('mustache');
const sass = require('node-sass');
const babel = require('babel-core');

const Package = require('./package');
const Markdown = require('./markdown');

class Compiler {
  constructor(out, src, rootpath) {
    this.out = out;
    this.src = src;
    this.rootpath = rootpath;
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

  template(templateName, outputPath, current, view, absolute = false) {
    const p = absolute ? templateName : this.srcPath('templates', `${templateName}.mustache`);
    const template = fs.readFileSync(p).toString();

    const content = Mustache.render(template, view, name =>
      fs.readFileSync(this.srcPath('templates', `${name}.mustache`)).toString());
    const html = Mustache.render(this.mainTemplate, {
      content,
      rootpath: this.rootpath,
      activeClass() {
        return text => (current === text ? 'class="active"' : '');
      },
    });

    fs.writeFileSync(outputPath, html);
  }

  createStatic() {
    console.log('Copying static folder.');
    fs.copySync(this.srcPath('static'), this.outPath('static'));

    sass.render({
      file: this.srcPath('static', 'css', 'style.scss'),
      outputStyle: 'compressed',
    }, (err, result) => {
      fs.writeFile(this.outPath('static', 'css', 'style.css'), result.css);
    });

    babel.transformFile(this.srcPath('static', 'js', 'magicinstall.es6'), { presets: ['es2015'] },
      (err, { code }) => fs.writeFile(this.outPath('static', 'js', 'magicinstall.js'), code));
  }

  createPages() {
    const pages = require(this.srcPath('pages', 'pages.json'));
    for (const pageName of pages) {
      console.log(`Templating page ${pageName}.`);
      this.template(this.srcPath('pages', pageName), this.outPath(pageName), pageName,
                    { rootpath: './' }, true);
    }
  }

  createBook(name, bookTitle) {
    console.log(`Creating ${name}.`);

    fs.ensureDirSync(this.outPath(name));

    const rulesParser = new Markdown.RulesParser();

    const chapters = require(this.srcPath(name, 'chapters.json')).map((file) => {
      const markdown = fs.readFileSync(this.srcPath(name, file)).toString();
      const pattern = /\n##([^#\n]+)/g;

      const titleMatch = /(\s|^)(#[^#\n]+)/.exec(markdown);
      const title = titleMatch ? titleMatch[2].substring(1).trim() : '';

      const sections = [];
      while (true) {
        const match = pattern.exec(markdown);
        if (!match) {
          break;
        }
        sections.push(match[1].trim());
      }

      const fileName = path.basename(file, '.md');
      rulesParser.parse(markdown, fileName);

      return {
        name: fileName,
        sourcePath: path.join('src', name, file),
        markdown,
        title,
        sections,
      };
    });

    for (const [i, chapter] of chapters.entries()) {
      chapter.current = true;
      this.template('chapter', this.outPath(name, `${chapter.name}.html`), name, {
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

    const indexPath = this.outPath(name, 'index.html');
    if (fs.existsSync(indexPath)) {
      fs.unlinkSync(indexPath);
    }
    fs.copySync(this.outPath(name, `${chapters[0].name}.html`), indexPath);
  }

  createPackages() {
    fs.ensureDirSync(this.outPath('packages'));

    const packages = require(this.srcPath('packages', 'packages.json'));
    for (const packageName of packages) {
      new Package(this, packageName).build();
    }

    this.template('packages', this.outPath('packages', 'index.html'), 'packages', {
      packages,
      rootpath: '../',
      title: 'Packages',
    });
  }
}

module.exports = Compiler;
