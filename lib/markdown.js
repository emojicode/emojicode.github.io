const stripIndent = require('strip-indent');
const marked = require('marked');
const highlight = require('highlight.js');

const checkCapitalization = require('./capitalization');
const log = require('./log');
const TypeUtils = require('./typeUtils');

marked.setOptions({
  highlight: (code, lang) => lang && highlight.highlight(code, {
    language: lang, ignoreIllegals: true,
  }).value,
});

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

class Renderer extends marked.Renderer {
  constructor(rulesParser, fileName) {
    super();
    this.fileName = fileName;
    this.rulesParser = rulesParser;
  }

  code(code, lang, ...rest) {
    if (lang === 'syntax' || lang === '!') {
      const cls = (lang === '!') ? 'negative-example' : lang;

      const html = code.replace(/\$([a-z-]+)\$(->)?/g, (_, name, def) => {
        if (def === '->') {
          return `<span class="syntax-placeholder" id="srule-${name}">${name}</span> ⟶`;
        }
        const link = this.rulesParser.get(name, this.fileName);
        return `<a class="syntax-placeholder" href="${link}.html#srule-${name}">${name}</a>`;
      }).replace(/--/g, '￢');

      return `<pre class="${cls}"><code>${html}\n</code></pre>\n`;
    }
    return super.code(code, lang, ...rest);
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
      });

    return marked(pureMarkdown, { renderer: new Renderer(rulesParser, fileName) });
  },
  parseContent(markdown) {
    const pattern = /\n##([^#\n]+)/g;

    const titleMatch = /(\s|^)(#[^#\n]+)/.exec(markdown);
    const title = titleMatch ? titleMatch[2].substring(1).trim() : '';
    checkCapitalization(title);

    const sections = [];
    while (true) {
      const match = pattern.exec(markdown);
      if (!match) {
        break;
      }
      const headline = match[1].trim();
      checkCapitalization(headline);
      sections.push(headline);
    }
    return { title, sections };
  },
  RulesParser,
};
