module.exports = {
  asciiName(name) {
    return name.codePointAt(0).toString(16);
  },

  link(type) {
    if (type.package === '') {
      return (type.optional ? '🍬' : '') + type.name;
    }

    return `<a href="../${type.package}/${this.asciiName(type.name)}.html">\
${(type.optional ? '🍬' : '')}${type.name}</a>`;
  },
};
