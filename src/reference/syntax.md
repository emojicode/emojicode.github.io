# Syntax

The Language Reference & Guide aims to be – as the title suggests – a reference
and guide in one. Since a programming language needs formal definitions, you’ll
see syntactic definitions from time to time. The notation used and the most
basic syntactic definitions are described in this chapter.

>!H If you don’t really care about syntactic definitions, no worries! You should
>!H be able to follow along without problems. Just skip this chapter and ignore
>!H them.

## Notation

The Language Reference & Guide uses an enhanced, modified BNF grammar notation:

<pre class="syntax">
$hippo$-> $rhinoceros$ 🥘
$panther$-> [🍞] $hyena$ | 🍮
</pre>

The first line of the above example defines a rule called *hippo*, which
states that a *hippo* consists of a *rhinoceros*, which is another rule as
indicated by the purple background, and the emoji 🥘.

Each rule begins with a name and ⟶ (read “consists of”). A vertical bar (`|`) is
used to separate alternatives. Furthermore, rules can be broken into multiple
lines starting with the same name. Parts enclosed in square
brackets (`[` and `]`) are optional: they can occur but do not have to.

## Document Syntax

Every Emojicode source code document consists of any number of
*document-statements*.

<pre class="syntax">
$document-statement$-> $package-import$ | 📻 | $include$ | $version$
$document-statement$-> [$documentation-comment$] $type-definition$
$document-statement$-> $start-flag$
$include$-> 📜 $string-literal$
$start-flag$-> 🏁 $return-type$ $block$
$type-definition$-> $class-definition$ | $value-type-definition$ | $extension$
$type-definition$-> $protcol-definition$ | $enum-definition$
</pre>

*start-flag* was already described in the previous chapter.
All other rules will be explained in detail later on.

## Statement and Expression

The smallest standalone elements of Emojicode’s normal program code is called
*statement*.

<pre class="syntax">
$statement$-> $expression$ | $frozen-declaration$ | $assignment$ | $declaration$
$frozen-declaration$-> 🍦 $variable$ $expression$
$assignment$-> 🍮 $variable$ $expression$ | 🍮 $method-emoji$ $variable$ $arguments$
$declaration$-> 🍰 $variable$ $type$
$expression$-> $numeric-literal$ | 👍 | 👎 | $symbol-literal$ | $string-literal$
$string-literal$-> except 🔤 | $string-escape-sequence$
</pre>
