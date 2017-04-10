const stripIndent = require('strip-indent');
const marked = require('marked');

const TypeUtils = require('./typeUtils');

function processMarkdown(markdown) {
  const callouts = { N: 'Caution', H: 'Hint' };

  const pureMarkdown = stripIndent(markdown)
    .replace(/\[\[(.+)\]\]/g, (match, name) =>
      `<a href="${TypeUtils.asciiName(name)}.html">${name}</a>`
    )
    .replace(/>!([NH]) ?([^\n]*(\n>![NH] ?[^\n]*)*)(\n|$)/g, (match, tl, text) => {
      const type = callouts[tl];
      return `<div class="callout-${type.toLowerCase()}"><div class="title">${type}</div>\
        <div class="text">${marked(text.replace(/>![NH] ?/g, ''))}</div></div>\n`;
    }).replace(/\$([a-z-]+)\$(->)?/g, (_, name, def) => {
      if (def === '->') {
        return `<span class="syntax-placeholder">${name}</span> ⟶`;
      }
      return `<span class="syntax-placeholder">${name}</span>`;
    });

  return marked(pureMarkdown);
}

module.exports = processMarkdown;
