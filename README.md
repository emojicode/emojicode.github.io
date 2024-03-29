# Emojicode Documentation

This is the official documentation for [Emojicode](http://emojicode.org).

## Building the documentation

The documentation is built from Markdown and JSON source files by a compiler
written in JavaScript. A Node.js installation is required to run it.

You can install its dependencies with npm:

```sh
yarn
```

If you want to work on the documentation you can use

```sh
./serve
```

which starts a web server on port 8080 and automatically rebuilds the
documentation when changes are made.

## Source Structure

The important source files that live in the `src` directory are:

- The files in `references` and `guides` which are compiled to *books*. Each
  file represents one chapter and each book has a `chapters.json` listing these
  chapters.

- `packages` contains resource to compile the package pages and APIs.

  Each package has its own directory containing a `meta.json` and a
  `package.json` file. The `package.json` file represents the package API can be
  generated by the Emojicode compiler using the `-r` option.

  All packages that shall be included in the documentation are listed in
  `packages/packages.json`.

## Emojicode Documentation Syntax

In addition to GFM, Emojicode Documentation supports syntax for callouts and
grammar.

### Callouts

To create a *Hint* callout begin all lines with `>!H`. Likewise, *Caution*
notices are indicated by `>!N`.

Example:

```
>!H This chapter only introduces the three most important classes although there are many more.
>!H
>!H You can browse the whole API of the s package here.
```

### Grammar

A grammar rule is define like this:

```
$defined-rule$-> $rule$
```

All rule names must always be enclosed in `$` signs, while the rule being
defined is closed with `$->` instead of just a `$`.

The documentation compiler parses all rules, adds hyperlinks and warns of
undefined or unreachable rules.
