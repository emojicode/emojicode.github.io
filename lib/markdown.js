const stripIndent = require('strip-indent');
const marked = require('marked');

const log = require('./log');
const TypeUtils = require('./typeUtils');

class RulesParser {
  constructor() {
    this.rules = {};
  }

  get(ruleName, fileName) {
    const rule = this.rules[ruleName];
    if (rule === undefined) {
      log.warn(`Rule ${ruleName} is not defined but used in ${fileName}.`);
      return '';
    }
    rule.used = true;
    return rule.fileName;
  }

  warn(rootRule) {
    const unreachable = Object.keys(this.rules)
      .filter(rule => rule !== rootRule && !this.rules[rule].used);
    for (const u of unreachable) {
      log.warn(`Rule ${u} defined in ${this.rules[u].fileName} cannot be reached.`);
    }
  }

  parse(markdown, fileName) {
    const pattern = /\$([a-z-]+)\$->?/g;
    let prev = null;

    while (true) {
      const match = pattern.exec(markdown);
      if (!match) {
        break;
      }
      if (this.rules[match[1]] !== undefined && prev !== match[1]) {
        log.error(`Rule ${match[1]} redefined at ${fileName}, previous definition is in ${this.rules[match[1]].fileName}.`);
      }
      prev = match[1];
      this.rules[match[1]] = { fileName };
    }
  }
}

module.exports = {
  toHtml(markdown, rulesParser = new RulesParser(), fileName = '') {
    const callouts = { N: 'Caution', H: 'Hint' };

    const pureMarkdown = stripIndent(markdown)
      .replace(/\[\[(.+)\]\]/g, (match, name) => `<a href="${TypeUtils.asciiName(name)}.html">${name}</a>`)
      .replace(/>!([NH]) ?([^\n]*(\n>![NH] ?[^\n]*)*)(\n|$)/g, (match, tl, text) => {
        const type = callouts[tl];
        return `<div class="callout-${type.toLowerCase()}"><div class="title">${type}</div>\
          <div class="text">${marked(text.replace(/>![NH] ?/g, ''))}</div></div>\n`;
      }).replace(/\$([a-z-]+)\$(->)?/g, (_, name, def) => {
        if (def === '->') {
          return `<span class="syntax-placeholder" id="srule-${name}">${name}</span> ⟶`;
        }
        return `<a class="syntax-placeholder" href="${rulesParser.get(name, fileName)}.html#srule-${name}">${name}</a>`;
      });

    return marked(pureMarkdown);
  },
  parseContent(markdown) {
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
    return { title, sections };
  },
  RulesParser,
};
