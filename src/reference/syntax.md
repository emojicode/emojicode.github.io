# Syntax

The Language Reference & Guide aims to be – as the title suggests – a reference
and guide in one. Since a programming language needs formal definitions, you’ll
see syntactic definitions from time to time. The notation used and the most
basic syntactic definitions are described in this chapter.

>!H If you don’t really care about syntactic definitions, no worries! You should
>!H be able to follow along without problems. Just skip this chapter and ignore
>!H them.

## Notation

The Language Reference & Guide uses a slightly BNF grammar notation:

<pre class="syntax">
<span class="syntax-placeholder">hippo</span> ⟶ <span class="syntax-placeholder">rhinoceros</span> 🥘
<span class="syntax-placeholder">panther</span> ⟶ [🍞] <span class="syntax-placeholder">hyena</span> | 🍮
</pre>

The first line of the above example defines a rule called *hippo*, which
states that a *hippo* consists of a *rhinoceros*, which is another rule as
indicated by the purple background, and the emoji 🥘.

Each rule begins with a name and ⟶ (read “consists of”). A vertical bar (`|`) is
used to separate alternatives. Furthermore, rules can be broken into multiple
lines starting with the same name, the new line then is an alternative. Parts
enclosed in square brackets (`[` and `]`) are optional: they can occur but do
not have to. Whitespaces are never terminals but only appear to improve
formatting. Moreover, the word `except` indicates that the terminals or non-
terminals thereafter must not appear even though the previous non-terminal has
indicated it could appear. `except` may appear multiple times one behind another
to exclude multiple values.

## Document Syntax

Every Emojicode source code document consists of any number of
*document-statements*.

<pre class="syntax">
$document-statement$-> $package-import$ | 📻 | $include$ | $version$
$document-statement$-> [$documentation-comment$] $type-definition$
$document-statement$-> $start-flag$
$include$-> 📜 $string-literal$
$start-flag$-> 🏁 $return-type$ $block$
$type-definition$-> $class$ | $value-type$ | $extension$ | $protocol$ | $enum$
</pre>

*start-flag* was already described in the previous chapter.
All other rules will be explained in detail later on.

## Statement and Expression

The smallest standalone elements of Emojicode’s normal program code is called
*statement*.

<pre class="syntax">
$statement$-> $expression$ | $frozen-declaration$ | $assignment$ | $declaration$
$statement$-> $instantiation$ | $superinitializer$ | $return$ | $error-check-control$
$statement$-> $if$ | $for-in$ | $repeat-while$
$frozen-declaration$-> 🍦 $variable$ $expression$
$assignment$-> 🍮 $variable$ $expression$ | 🍮 $method-emoji$ $variable$ $arguments$
$declaration$-> 🍰 $variable$ $type$
$expression$-> $numeric-literal$ | 👍 | 👎 | $symbol-literal$ | $string-literal$ | 🐕
$expression$-> $method-call$ | $identity-check$ | $nothingness$ | $unwrap$ | $is-nothingness$
$expression$-> $callable-call$ | $method-capture$ | $closure$ | $type-method-call$
$expression$-> $list-literal$ | $dictionary-literal$ | $range-literal$ | $concatenate-literal$
$expression$-> $supermethod-call$ | $is-error$ | $perfect-extraction$ | $cast$
$expression$-> $metatype-instance$ | $metatype-instance-from-instance$
$symbol-literal$-> 🔟 $unicode$
</pre>

## Emoji and Variable

<pre class="syntax">
$unicode$-> <i>any Unicode character defined in Unicode 9.0</i>
$emoji$-> <i>see http://www.unicode.org/Public/emoji/4.0//emoji-data.txt</i>
$variable$-> $variable-head$ [$variable-parts$]
$variable-head$-> $unicode$ except $integer-prefix$ except $number$ except $emoji$
$variable-parts$-> $variable-part$ | $variable-part$ $variable-parts$
$variable-part$-> $unicode$ except $emoji$
</pre>

## Numeric Literals

<pre class="syntax">
$numeric-literal$-> $integer-literal$ $float-literal$
$integer-literal$-> [$integer-prefix$] $integer-number$
$integer-prefix$-> + | - | 0x
$float-literal$-> [$float-prefix$] $numbers$
$float-prefix$-> + | -
$integer-numbers$-> $integer-number$ | $integer-number$ $integer-numbers$
$integer-number$-> $number$ | a | b | c | d | e | f | A | B | C | D | E | F
$numbers$-> $number$ | $number$ $numbers$
$number$-> 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
</pre>
