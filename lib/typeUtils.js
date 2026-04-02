module.exports = {
  asciiName(name) {
    const codePoints = [];
    for (const character of name) {
      codePoints.push(character.codePointAt(0).toString(16));
    }
    return codePoints.join('_');
  },

  link(type) {
    if (type.reference) {
      type.reference = false;
      return `✴️${this.link(type)}`;
    }

    if (!type.type) {
      let str = `<div class="type"><a href="../${type.package}/${this.asciiName(type.name)}.html">${type.name}</a>`;
      if (type.arguments.length > 0) {
        str += `🐚${type.arguments.map(arg => this.link(arg)).join('')}🍆`;
      }
      str += '</div>';
      return str;
    }

    if (type.type === 'Optional') {
      return `🍬${this.link(type.arguments[0])}`;
    }
    else if (type.type === 'Error') {
      return `🚨${this.link(type.arguments[0])}${this.link(type.arguments[1])}`;
    }
    else if (type.type === 'Callable') {
      const params = type.parameters.map(arg => this.link(arg)).join('');
      const returnLink = type.return.type !== 'NoReturn' ? `➡️${this.link(type.return)}` : '';
      return `🍇${params}${returnLink}🍉`;
    }
    else if (type.type === 'MultiProtocol') {
      const args = type.arguments.map(arg => this.link(arg)).join('');
      return `🍱${args}🍱`;
    }
    else if (type.type === 'Literal') {
      return type.name;
    }

    return '??';
  },
};
