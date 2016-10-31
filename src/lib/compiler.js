const fs = require('fs-extra');
const path = require('path');
const Mustache = require('mustache');
const stripIndent = require('strip-indent');
const marked = require('marked');
const sass = require('node-sass');
const babel = require('babel-core');

class Compiler {
  constructor(out, src, rootpath) {
    this.out = out;
    this.src = src;
    this.rootpath = rootpath;
    this.mainTemplate = fs.readFileSync(this.srcPath('templates', 'main.html')).toString();
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

  template(templateName, outputPath, view, absolute = false) {
    const p = absolute ? templateName : this.srcPath('templates', templateName);
    const template = fs.readFileSync(p).toString();

    const content = Mustache.render(template, view, name =>
      fs.readFileSync(this.srcPath('templates', `${name}.html`)).toString());
    const html = Mustache.render(this.mainTemplate, {
      content,
      rootpath: this.rootpath,
    });

    fs.writeFileSync(outputPath, html);
  }

  createStatic() {
    console.log('Copying static folder.');
    fs.copySync(this.srcPath('static'), this.outPath('static'));

    const css = sass.renderSync({
      file: this.srcPath('static', 'css', 'style.scss'),
      outputStyle: 'compressed',
    }).css;
    fs.writeFile(this.outPath('static', 'css', 'style.css'), css);

    babel.transformFile(this.srcPath('static', 'js', 'magicinstall.es6'), { presets: ['es2015'] },
      (err, { code }) => fs.writeFile(this.outPath('static', 'js', 'magicinstall.js'), code));
  }

  createPages() {
    const pages = require(this.srcPath('pages', 'pages.json'));
    for (const pageName of pages) {
      console.log(`Templating page ${pageName}.`);
      this.template(this.srcPath('pages', pageName), this.outPath(pageName),
                    { rootpath: './' }, true);
    }
  }

  createBook(name, bookTitle) {
    console.log(`Creating ${name}.`);

    fs.ensureDirSync(this.outPath(name));

    const chapters = require(this.srcPath(name, 'chapters.json')).map(file => {
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

      return {
        name: path.basename(file, '.md'),
        html: this.markdownToHTML(markdown),
        sourcePath: path.join('src', name, file),
        title,
        sections,
      };
    });

    for (const [i, chapter] of chapters.entries()) {
      chapter.current = true;
      this.template('chapter.html', this.outPath(name, `${chapter.name}.html`), {
        bookTitle,
        chapters,
        title: chapter.title,
        content: chapter.html,
        sections: chapter.sections,
        sourcePath: chapter.sourcePath,
        prev: i > 0 ? `${chapters[i - 1].name}.html` : null,
        next: i + 1 < chapters.length ? `${chapters[i + 1].name}.html` : null,
        thisHeadingID: function () {
          return this.toLowerCase().replace(/[^\w]+/g, '-');
        },
      });
      chapter.current = false;
    }

    const indexPath = this.outPath(name, 'index.html');
    if (fs.existsSync(indexPath)) {
      fs.unlinkSync(indexPath);
    }
    fs.copySync(this.outPath(name, `${chapters[0].name}.html`), indexPath);
  }

  createReference() {
    this.createBook('reference', 'The Definite Language Reference & Guide');
  }

  createGuides() {
    this.createBook('guides', 'Emojicode Guides');
  }

  createPackages() {
    fs.ensureDirSync(this.outPath('packages'));

    const packages = require(this.srcPath('packages', 'packages.json'));
    for (const packageName of packages) {
      new Package(this, packageName).build();
    }

    this.template('packages.html', this.outPath('packages', 'index.html'), {
      packages,
      rootpath: '../',
      title: 'Packages',
    });
  }

  markdownToHTML(markdown) {
    const callouts = { N: 'Caution', H: 'Hint' };

    const pureMarkdown = stripIndent(markdown)
      .replace(/>!([NH]) ?([^\n]*(\n>![NH] ?[^\n]*)*)(\n|$)/g, (match, tl, text) => {
        const type = callouts[tl];
        return `<div class="callout-${type.toLowerCase()}"><div class="title">${type}</div>\
          <div class="text">${marked(text.replace(/>![NH] ?/g, ''))}</div></div>\n`;
      }).replace(/\$([a-z-\[\]]+)\$(>)?/g, (_, name, def) => {
        if (def === '>') {
          return `<span class="syntax-placeholder">${name}</span> ⟶`;
        }
        return `<span class="syntax-placeholder">${name}</span>`;
      });

    return marked(pureMarkdown);
  }
}

class Package {
  constructor(compiler, packageName) {
    this.compiler = compiler;
    this.packageName = packageName;
  }

  outPath(...components) {
    return this.compiler.outPath('packages', this.packageName, ...components);
  }

  srcPath(...components) {
    return this.compiler.srcPath('packages', this.packageName, ...components);
  }

  readReadme() {
    const readmePath = this.srcPath('README.md');

    if (fs.existsSync(readmePath)) {
      const markdown = fs.readFileSync(readmePath).toString();
      return this.compiler.markdownToHTML(markdown);
    }
    return null;
  }

  typeAsciiName(name) {
    return name.codePointAt(0).toString(16);
  }

  typeLink(type) {
    if (type.package === '') {
      return (type.optional ? '🍬' : '') + type.name;
    }

    return `<a href="../${type.package}/${this.typeAsciiName(type.name)}.html">\
${(type.optional ? '🍬' : '')}${type.name}</a>`;
  }

  markdownToHTML(md) {
    return this.compiler.markdownToHTML(md.replace(/\[\[(.+)\]\]/g, (match, name) =>
      `<a href="${this.typeAsciiName(name)}.html">${name}</a>`
    ));
  }

  templateType(type, typeType, packageMeta) {
    const ascii = this.typeAsciiName(type.name);
    const that = this;
    this.compiler.template('mcc.html', this.outPath(`${ascii}.html`), {
      typeName: type.name,
      documentation: type.documentation,
      conformsTo: type.conformsTo,
      conformsToItems: type.conformsTo && type.conformsTo.length > 0,
      package: packageMeta.name,
      initializers: type.initializers,
      methods: type.methods,
      classMethods: type.classMethods,
      superclass: type.superclass,
      typeType,
      genericArguments: type.genericArguments,
      typeLink: function () {
        return that.typeLink(this.type);
      },
      constraintTypeLink: function () {
        return that.typeLink(this.constraint);
      },
      thisTypeLink: function () {
        return that.typeLink(this);
      },
      mdDocumentation: function () {
        return this.documentation && that.markdownToHTML(this.documentation);
      },
      simpleAccess: function () {
        return this.access === '🔓' ? '' : this.access + ' ';
      },
      procedureVisible: function () {
        return this.access !== '🔒';
      },
    });
  }

  templateEnum(type, packageMeta) {
    const ascii = this.typeAsciiName(type.name);
    const that = this;
    this.compiler.template('enum.html', this.outPath(`${ascii}.html`), {
      typeName: type.name,
      documentation: type.documentation,
      package: packageMeta.name,
      genericArguments: type.genericArguments,
      values: type.values,
      mdDocumentation: function() {
        return this.documentation && that.markdownToHTML(this.documentation);
      },
    });
  }

  build() {
    const out = this.outPath();
    if (fs.existsSync(out)) {
      fs.removeSync(out);
    }
    fs.mkdirSync(out);

    const packageMeta = require(this.srcPath('meta.json'));
    console.log(`Building package ${packageMeta.name}`);

    const types = require(this.srcPath('package.json'));

    const classes = types.classes.filter(eclass => {
      if (eclass.documentation) {
        this.templateType(eclass, 'Class', packageMeta);
        return true;
      }
      return false;
    });
    const protocols = types.protocols.filter(protocol => {
      if (protocol.documentation) {
        this.templateType(protocol, 'Protocol', packageMeta);
        return true;
      }
      return false;
    });
    const valueTypes = types.valueTypes.filter(valueType => {
      if (valueType.documentation) {
        this.templateType(valueType, 'Value Type', packageMeta);
        return true;
      }
      return false;
    });
    const enums = types.enums.filter(eenum => {
      if (eenum.documentation) {
        this.templateEnum(eenum, packageMeta);
        return true;
      }
      return false;
    });

    const that = this;
    this.compiler.template('package.html', this.outPath('index.html'), {
      classes,
      protocols,
      valueTypes,
      enums,
      classesItems: classes.length > 0,
      protocolsItems: protocols.length > 0,
      valueTypesItems: valueTypes.length > 0,
      enumItems: enums.length > 0,
      name: packageMeta.name,
      version: packageMeta.version,
      author: packageMeta.author,
      license: packageMeta.license,
      readme: this.readReadme(),
      title: packageMeta.name,
      firstSentence: function () {
        return this.documentation && `${this.documentation.split('.', 2)[0]}.`;
      },
      asciiTypeName: function () {
        return that.typeAsciiName(this.name);
      },
    });
  }
}

console.log('🔨📗📘');

const compiler = new Compiler(path.resolve(__dirname, '..', '..', 'docs'),
                              path.resolve(__dirname, '..'), '/docs/');
compiler.createStatic();
compiler.createPages();
compiler.createReference();
compiler.createGuides();
compiler.createPackages();
