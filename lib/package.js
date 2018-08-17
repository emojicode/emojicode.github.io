const fs = require('fs-extra');

const Markdown = require('./markdown');
const TypeUtils = require('./typeUtils');
const log = require('./log');

class Package {
  constructor(compiler, packageName) {
    this.compiler = compiler;
    this.packageName = packageName;
  }

  outPath(...components) {
    return this.compiler.outPath('docs', 'packages', this.packageName, ...components);
  }

  srcPath(...components) {
    return this.compiler.srcPath('packages', this.packageName, ...components);
  }

  templateType(type, packageMeta) {
    const path = this.outPath(`${TypeUtils.asciiName(type.name)}.html`);
    this.compiler.template('type', path, 'packages', Object.assign({
      package: packageMeta.name,
      title: `${type.type} ${type.name}`,
      typeLink() {
        return TypeUtils.link(this.type);
      },
      constraintTypeLink() {
        return TypeUtils.link(this.constraint);
      },
      thisTypeLink() {
        return TypeUtils.link(this);
      },
      returnTypeLink() {
        return this.returnType.type !== 'NoReturn' ? `➡️ ${TypeUtils.link(this.returnType)}` : '';
      },
      mdDocumentation() {
        return this.documentation && Markdown.toHtml(this.documentation);
      },
      access() {
        return this.accessLevel === '🔓' ? '' : `${this.accessLevel} `;
      },
      attributes() {
        let str = '';
        if (this.final) {
          str += '🔏 ';
        }
        if (this.unsafe) {
          str += '☣️ ';
        }
        if (type.type === 'Value Type' && this.mutating) {
          str += '🖍 ';
        }
        return str;
      },
    }, type));
  }

  build() {
    const out = this.outPath();
    if (fs.existsSync(out)) {
      fs.removeSync(out);
    }
    fs.mkdirSync(out);

    const packageMeta = require(this.srcPath('meta.json'));
    log.log(`Building package ${packageMeta.name}`);

    const pkg = require(this.srcPath('package.json'));

    for (const type of pkg.types) {
      this.templateType(type, packageMeta);
    }

    this.compiler.template('package', this.outPath('index.html'), 'packages', {
      types: pkg.types,
      name: packageMeta.name,
      version: packageMeta.version,
      author: packageMeta.author,
      license: packageMeta.license,
      packageDocumentation: pkg.documentation && Markdown.toHtml(pkg.documentation),
      title: packageMeta.name,
      firstSentence() {
        return this.documentation && `${this.documentation.split('.', 2)[0].trim()}`;
      },
      asciiName() {
        return TypeUtils.asciiName(this.name);
      },
    });

    return pkg.documentation && `${pkg.documentation.split('.', 2)[0].trim()}`;
  }
}

module.exports = Package;
