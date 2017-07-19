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

  templateType(type, typeType, packageMeta) {
    const ascii = TypeUtils.asciiName(type.name);
    this.compiler.template('type', this.outPath(`${ascii}.html`), 'packages', {
      typeName: type.name,
      documentation: type.documentation,
      conformsTo: type.conformsTo,
      conformsToItems: type.conformsTo && type.conformsTo.length > 0,
      package: packageMeta.name,
      initializers: type.initializers,
      methods: type.methods,
      typeMethods: type.typeMethods,
      superclass: type.superclass,
      typeType,
      values: type.values,
      title: `${typeType} ${type.name}`,
      genericArguments: type.genericArguments,
      typeLink() {
        return TypeUtils.link(this.type);
      },
      constraintTypeLink() {
        return TypeUtils.link(this.constraint);
      },
      thisTypeLink() {
        return TypeUtils.link(this);
      },
      mdDocumentation() {
        return this.documentation && Markdown.toHtml(this.documentation);
      },
      access() {
        return this.access === '🔓' ? '' : this.access;
      },
      procedureVisible() {
        return this.access !== '🔒';
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
    log.log(`Building package ${packageMeta.name}`);

    const types = require(this.srcPath('package.json'));

    const classes = types.classes.filter((klass) => {
      if (klass.documentation) {
        this.templateType(klass, 'Class', packageMeta);
        return true;
      }
      return false;
    });
    const protocols = types.protocols.filter((protocol) => {
      if (protocol.documentation) {
        this.templateType(protocol, 'Protocol', packageMeta);
        return true;
      }
      return false;
    });
    const valueTypes = types.valueTypes.filter((valueType) => {
      if (valueType.documentation) {
        this.templateType(valueType, 'Value Type', packageMeta);
        return true;
      }
      return false;
    });
    const enums = types.enums.filter((enumeration) => {
      if (enumeration.documentation) {
        this.templateType(enumeration, 'Enumeration', packageMeta);
        return true;
      }
      return false;
    });

    this.compiler.template('package', this.outPath('index.html'), 'packages', {
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
      packageDocumentation: types.documentation && Markdown.toHtml(types.documentation),
      title: packageMeta.name,
      firstSentence() {
        return this.documentation && `${this.documentation.split('.', 2)[0].trim()}`;
      },
      asciiName() {
        return TypeUtils.asciiName(this.name);
      },
    });

    return types.documentation && `${types.documentation.split('.', 2)[0].trim()}`;
  }
}

module.exports = Package;
