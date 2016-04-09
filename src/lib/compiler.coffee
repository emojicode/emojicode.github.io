fs = require 'fs-extra'
path = require 'path'
Mustache = require 'mustache'
stripIndent = require 'strip-indent'
marked = require 'marked'
sass = require 'node-sass'

markdownToHTML = (markdown) ->
  callouts = N: 'Caution', H: 'Hint'
  markdown = stripIndent(markdown)
  markdown = markdown.replace />!([NH]) ?([^\n]*(\n>![NH] ?[^\n]*)*)(\n|$)/g, (match, tl, text) ->
    type = callouts[tl]
    '<div class="callout-' + type.toLowerCase() + '"><div class="title">' + type + '</div>' +
      '<div class="text">' + marked(text.replace(/>![NH] ?/g, '')) + "</div></div>\n"
  marked(markdown)

class Compiler
  constructor: (@out, @src) ->
    @mainTemplate = fs.readFileSync(@srcPath('templates', 'main.html')).toString()

  outPath: (components...) ->
    components.unshift(@out)
    path.join.apply(path, components)

  srcPath: (components...) ->
    components.unshift(@src)
    path.join.apply(path, components)

  template: (templateName, outputPath, view, absolute = false) ->
    p = if absolute then templateName else @srcPath('templates', templateName)
    template = fs.readFileSync(p).toString()

    html = Mustache.render @mainTemplate.replace(/\{\{content\}\}/, template), view, (name) =>
      fs.readFileSync(@srcPath("templates", name + ".html")).toString()

    fs.writeFileSync(outputPath, html)

  createStatic: ->
    console.log "Copying static folder."
    fs.copySync(@srcPath("static"), @outPath("static"))

    css = sass.renderSync(file: @srcPath('static', 'css', 'style.scss'), outputStyle: 'compressed').css
    fs.writeFile(@outPath('static', 'css', 'style.css'), css)

  createPages: ->
    pages = require(path.join(this.src, "pages", "pages.json"))
    for page in pages
      console.log "Templating page #{page}."
      @template(@srcPath('pages', page), @outPath(page), rootpath: './', true)

  createBook: (name, title) ->
    console.log "Creating #{name}."

    fs.ensureDirSync(@outPath(name))

    chapters = require(@srcPath(name, "chapters.json")).map (file) =>
      markdown = fs.readFileSync(@srcPath(name, file)).toString()
      pattern = /\n##([^#\n]+)/g

      name: path.basename(file, '.md')
      html: markdownToHTML(markdown)
      title: /(\s|^)(#[^#\n]+)/.exec(markdown)?[2].substring(1).trim()
      sections: r[1].trim() while r = pattern.exec(markdown)

    for chapter, i in chapters
      chapter.current = true
      @template "chapter.html", @outPath(name, "#{chapter.name}.html"),
        rootpath: "../"
        name: title
        title: chapter.title
        content: chapter.html
        sections: chapter.sections
        chapters: chapters
        prev: "#{chapters[i - 1].name}.html" if i > 0
        next: "#{chapters[i + 1].name}.html" if i + 1 < chapters.length
        thisHeadingID: -> @toLowerCase().replace(/[^\w]+/g, '-')
      chapter.current = false

    linkPath = @outPath(name, "index.html")
    fs.unlinkSync(linkPath) if fs.existsSync(linkPath)
    fs.copySync(@outPath(name, "#{chapters[0].name}.html"), linkPath)

  createReference: -> @createBook "reference", "The Definite Language Reference & Guide"

  createGuides: -> @createBook "guides", "Emojicode Guides"

  createPackages: ->
    fs.ensureDirSync(@outPath('packages'))

    packages = require(@srcPath("packages", "packages.json"))
    for pkg in packages
      new Package(this, @srcPath("packages", pkg), @outPath("packages", pkg)).build()

    @template "packages.html", @outPath("packages", "index.html"),
      packages: packages
      rootpath: '../'
      title: 'Packages'

class Package
  constructor: (@compiler, @src, @out) ->

  outPath: (components...) ->
    components.unshift(@out)
    path.join.apply(path, components)

  srcPath: (components...) ->
    components.unshift(@src)
    path.join.apply(path, components)

  readReadme: ->
    readmePath = @srcPath('README.md')

    markdownToHTML(fs.readFileSync(readmePath).toString()) if fs.existsSync(readmePath)

  @typeAsciiName: (name) ->
    't' + name.charCodeAt(0) + name.charCodeAt(1)

  @typeLink: (type) ->
    if type.package == ""
      return (if type.optional then '🍬' else '') + type.name

    '<a href="../' + type.package + '/' + Package.typeAsciiName(type.name) + '.html">' +
    (if type.optional then '🍬' else '') +
    type.name + '</a>';

  templateType: (type, typeType, packageMeta) ->
    ascii = Package.typeAsciiName(type.name)
    @compiler.template "mcc.html", @outPath("#{ascii}.html"),
      rootpath: "../../"
      typeName: type.name
      documentation: type.documentation
      conformsTo: type.conformsTo
      conformsToItems: type.conformsTo?.length > 0
      package: packageMeta.name
      initializers: type.initializers
      methods: type.methods
      classMethods: type.classMethods
      typeType: typeType
      genericArguments: type.genericArguments
      typeLink: -> Package.typeLink(this.type)
      constraintTypeLink: -> Package.typeLink(this.constraint)
      thisTypeLink: -> Package.typeLink(this)
      mdDocumentation: -> markdownToHTML(@documentation) if @documentation?
      simpleAccess: -> (if this.access == '🔓' then '' else this.access)
      procedureVisible: -> this.access != '🔐'

    type

  build: ->
    fs.removeSync(@out) if fs.existsSync(@out)
    fs.mkdirSync(@out)

    packageMeta = require @srcPath("meta.json")
    console.log("Building package #{packageMeta.name}");

    types = require @srcPath("package.json")

    classes = for cl in types.classes when cl.documentation?
      @templateType(cl, 'Class', packageMeta)
    protocols = for protocol in types.protocols when protocol.documentation?
      @templateType(protocol, 'Protocol', packageMeta)

    @compiler.template "package.html", @outPath("index.html"),
      classes: classes
      protocols: protocols
      classesItems: types.classes.length > 0
      protocolsItems: types.protocols.length > 0
      name: packageMeta.name
      version: packageMeta.version
      author: packageMeta.author
      license: packageMeta.license
      readme: @readReadme()
      rootpath: "../../"
      title: packageMeta.name
      approved: packageMeta.approved
      firstSentence: -> this.documentation?.split('.', 2)[0] + '.'
      asciiTypeName: -> Package.typeAsciiName(@name)

console.log('🔨📗📘');

compiler = new Compiler(path.resolve(__dirname, "..", "..", "docs"), path.resolve(__dirname, '..'))
compiler.createStatic()
compiler.createPages()
compiler.createReference()
compiler.createGuides()
compiler.createPackages()
