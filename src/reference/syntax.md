# Syntax

The Language Reference & Guide aims to be – as the title suggests – a reference
and guide in one. Since a programming language needs formal definitions, you’ll
see syntactic definitions from time to time. The notation used and the most
basic syntactic definitions are described in this chapter. The meaning of these
structures will be described in detail in the following chapters.

>!H If you don’t really care about syntactic definitions, no worries! You should
>!H be able to follow along without problems. Just skip this chapter and ignore
>!H them.

Note that the grammar specified in the Language Reference & Guide is not a
complete description of the Emojicode language. The syntax alone allows programs
that are not valid. The accompanying text will outline further rules that
programs must obey.

## Notation

The Language Reference & Guide uses a modified BNF grammar notation. Consider
this example:

<pre class="syntax">
<span class="syntax-placeholder">hippo</span> ⟶ <span class="syntax-placeholder">rhinoceros</span> 🥘
<span class="syntax-placeholder">panther</span> ⟶ [🍞] <span class="syntax-placeholder">hyena</span> | 🍮
</pre>

The first line of the above example defines a rule called *hippo*, which
states that a *hippo* consists of a *rhinoceros*, which is another rule as
indicated by the purple background, and the emoji 🥘.

The grammar notation we use in the documentation follows these rules:

- Every rule begins with a name and ⟶ (read “consists of”).
- A vertical bar (`|`) is used to separate alternatives. E.g.

  <pre class="syntax">
  <span class="syntax-placeholder">foo</span> ⟶ <span class="syntax-placeholder">mouse</span> <span class="syntax-placeholder">dog</span> | <span class="syntax-placeholder">hippo</span>
  </pre>

  denotes that a *foo* may consist of a *mouse* and a *dog* or of only a *hippo*.

- Rules can be broken into multiple lines starting with the same name, the new
  line then is an alternative as if the contents right to the ⟶ was on the same
  line with previous definition separated by a vertical bar. E.g.

  <pre class="syntax">
  <span class="syntax-placeholder">foo</span> ⟶ <span class="syntax-placeholder">mouse</span> <span class="syntax-placeholder">dog</span> | <span class="syntax-placeholder">hippo</span>
  </pre>

  and

  <pre class="syntax">
  <span class="syntax-placeholder">foo</span> ⟶ <span class="syntax-placeholder">mouse</span> <span class="syntax-placeholder">dog</span>
  <span class="syntax-placeholder">foo</span> ⟶ <span class="syntax-placeholder">hippo</span>
  </pre>

  indicate the same thing.

- Parts enclosed in square brackets (`[` and `]`) are optional: they can occur
  but do not have to.

- Whitespaces are never terminals but only appear to improve formatting.

- The not sign (`￢`) followed by a terminal or non-terminal indicates that the
  terminal or non-terminal may not occur here even though
  the next non-terminal that is not preceeded by a not sign indicates it could
  occur.

- Terminals beginning with the character sequence `U+` substitue the character
  with an Unicode code point. If two code points are connected with a `–` this
  indicates that all characters in this range shall be allowed.

## Document Syntax

Every Emojicode source code document consists of any number of
*document-statements*.

```syntax
$document-statement$-> $package-import$ | $include$ | $package-documentation-comment$
$document-statement$-> $type-definition$ | $link-hints$
$document-statement$-> $start-flag$
$include$-> 📜 $string-literal$
$start-flag$-> 🏁 [$return-type$] $block$
```

## Statement and Expression

The smallest standalone elements of Emojicode’s normal program code is called
*statement*.

```syntax
$statement$-> $expression$ | $assignment$ | $declaration$ | $operator-assignment$
$statement$-> $return$ | $error-check-control$ | $raise$ | $method-assignment$
$statement$-> $if$ | $for-in$ | $repeat-while$ | $unsafe-block$
$expression$-> $numeric-literal$ | 👍 | 👎
$expression$-> $collection-literal$ | $string-literal$ | $no-value$
$expression$-> $method-call$ | $unwrap$ | $this$
$expression$-> $operator-expression$ | $group$
$expression$-> $callable-call$ | $closure$
$expression$-> $super$ | $reraise$ | $cast$
$expression$-> $type-value$ | $instantiation$ | $size-of$ | $unique$
```

## Emoji and Variable

```syntax
$unicode$-> <i>any Unicode character defined in Unicode 10</i>
$variable$-> $variable-head$ [$variable-parts$]
$variable-head$-> --$integer-prefix$ --$number$ --$emoji$ $unicode$
$variable-parts$-> $variable-part$ | $variable-part$ $variable-parts$
$variable-part$-> --$emoji$ $unicode$
```

## Numeric Literals

```syntax
$numeric-literal$-> $integer-literal$ $float-literal$
$integer-literal$-> [$integer-prefix$] $integer-number$
$integer-prefix$-> + | - | 0x
$float-literal$-> [$float-prefix$] $numbers$
$float-prefix$-> + | -
$integer-numbers$-> $integer-number$ | $integer-number$ $integer-numbers$
$integer-number$-> $number$ | a | b | c | d | e | f | A | B | C | D | E | F
$numbers$-> $number$ | $number$ $numbers$
$number$-> 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
```

## Emoji

```syntax
$emoji$-> $emoji-main$ | $emoji-modifier-base$ $emoji-modifier$ | $zwj$ | $regional-indicator$ $regional-indicators$
$zwj$-> $emoji$ U+200D $emoji$
$emoji-main$-> $emoji-main$ U+FE0F
$emoji-main$-> U+00A9 | U+00AE
$emoji-main$-> U+203C | U+2049 | U+2122 | U+2139 | U+2194–U+2199
$emoji-main$-> U+21A9–U+21AA | U+231A–U+231B | U+2328 | U+23CF | U+23E9–U+23F3
$emoji-main$-> U+23F8–U+23FA | U+24C2 | U+25AA–U+25AB | U+25B6 | U+25C0
$emoji-main$-> U+25FB–U+25FE | U+2600–U+2604 | U+260E | U+2611 | U+2614–U+2615
$emoji-main$-> U+2618 | U+261D | U+2620 | U+2622–U+2623 | U+2626
$emoji-main$-> U+262A | U+262E–U+262F | U+2638–U+263A | U+2640 | U+2642
$emoji-main$-> U+2648–U+2653 | U+265F–U+2660 | U+2663 | U+2665–U+2666 | U+2668
$emoji-main$-> U+267B | U+267E–U+267F | U+2692–U+2697 | U+2699 | U+269B–U+269C
$emoji-main$-> U+26A0–U+26A1 | U+26AA–U+26AB | U+26B0–U+26B1 | U+26BD–U+26BE | U+26C4–U+26C5
$emoji-main$-> U+26C8 | U+26CE | U+26CF | U+26D1 | U+26D3–U+26D4
$emoji-main$-> U+26E9–U+26EA | U+26F0–U+26F5 | U+26F7–U+26FA | U+26FD | U+2702
$emoji-main$-> U+2705 | U+2708–U+2709 | U+270A–U+270B | U+270C–U+270D | U+270F
$emoji-main$-> U+2712 | U+2714 | U+2716 | U+271D | U+2721
$emoji-main$-> U+2728 | U+2733–U+2734 | U+2744 | U+2747 | U+274C
$emoji-main$-> U+274E | U+2753–U+2755 | U+2757 | U+2763–U+2764 | U+2795–U+2797
$emoji-main$-> U+27A1 | U+27B0 | U+27BF | U+2934–U+2935 | U+2B05–U+2B07
$emoji-main$-> U+2B1B–U+2B1C | U+2B50 | U+2B55 | U+3030 | U+303D
$emoji-main$-> U+3297 | U+3299 | U+1F004 | U+1F0CF | U+1F170–U+1F171
$emoji-main$-> U+1F17E | U+1F17F | U+1F18E | U+1F191–U+1F19A | U+1F1E6–U+1F1FF
$emoji-main$-> U+1F201–U+1F202 | U+1F21A | U+1F22F | U+1F232–U+1F23A | U+1F250–U+1F251
$emoji-main$-> U+1F300–U+1F320 | U+1F321 | U+1F324–U+1F32C | U+1F32D–U+1F32F | U+1F330–U+1F335
$emoji-main$-> U+1F336 | U+1F337–U+1F37C | U+1F37D | U+1F37E–U+1F37F | U+1F380–U+1F393
$emoji-main$-> U+1F396–U+1F397 | U+1F399–U+1F39B | U+1F39E–U+1F39F | U+1F3A0–U+1F3C4 | U+1F3C5
$emoji-main$-> U+1F3C6–U+1F3CA | U+1F3CB–U+1F3CE | U+1F3CF–U+1F3D3 | U+1F3D4–U+1F3DF | U+1F3E0–U+1F3F0
$emoji-main$-> U+1F3F3–U+1F3F5 | U+1F3F7 | U+1F3F8–U+1F3FF | U+1F400–U+1F43E | U+1F43F
$emoji-main$-> U+1F440 | U+1F441 | U+1F442–U+1F4F7 | U+1F4F8 | U+1F4F9–U+1F4FC
$emoji-main$-> U+1F4FD | U+1F4FF | U+1F500–U+1F53D | U+1F549–U+1F54A | U+1F54B–U+1F54E
$emoji-main$-> U+1F550–U+1F567 | U+1F56F–U+1F570 | U+1F573–U+1F579 | U+1F57A | U+1F587
$emoji-main$-> U+1F58A–U+1F58D | U+1F590 | U+1F595–U+1F596 | U+1F5A4 | U+1F5A5
$emoji-main$-> U+1F5A8 | U+1F5B1–U+1F5B2 | U+1F5BC | U+1F5C2–U+1F5C4 | U+1F5D1–U+1F5D3
$emoji-main$-> U+1F5DC–U+1F5DE | U+1F5E1 | U+1F5E3 | U+1F5E8 | U+1F5EF
$emoji-main$-> U+1F5F3 | U+1F5FA | U+1F5FB–U+1F5FF | U+1F600 | U+1F601–U+1F610
$emoji-main$-> U+1F611 | U+1F612–U+1F614 | U+1F615 | U+1F616 | U+1F617
$emoji-main$-> U+1F618 | U+1F619 | U+1F61A | U+1F61B | U+1F61C–U+1F61E
$emoji-main$-> U+1F61F | U+1F620–U+1F625 | U+1F626–U+1F627 | U+1F628–U+1F62B | U+1F62C
$emoji-main$-> U+1F62D | U+1F62E–U+1F62F | U+1F630–U+1F633 | U+1F634 | U+1F635–U+1F640
$emoji-main$-> U+1F641–U+1F642 | U+1F643–U+1F644 | U+1F645–U+1F64F | U+1F680–U+1F6C5 | U+1F6CB–U+1F6CF
$emoji-main$-> U+1F6D0 | U+1F6D1–U+1F6D2 | U+1F6E0–U+1F6E5 | U+1F6E9 | U+1F6EB–U+1F6EC
$emoji-main$-> U+1F6F0 | U+1F6F3 | U+1F6F4–U+1F6F6 | U+1F6F7–U+1F6F8 | U+1F6F9
$emoji-main$-> U+1F910–U+1F918 | U+1F919–U+1F91E | U+1F91F | U+1F920–U+1F927 | U+1F928–U+1F92F
$emoji-main$-> U+1F930 | U+1F931–U+1F932 | U+1F933–U+1F93A | U+1F93C–U+1F93E | U+1F940–U+1F945
$emoji-main$-> U+1F947–U+1F94B | U+1F94C | U+1F94D–U+1F94F | U+1F950–U+1F95E | U+1F95F–U+1F96B
$emoji-main$-> U+1F96C–U+1F970 | U+1F973–U+1F976 | U+1F97A | U+1F97C–U+1F97F | U+1F980–U+1F984
$emoji-main$-> U+1F985–U+1F991 | U+1F992–U+1F997 | U+1F998–U+1F9A2 | U+1F9B0–U+1F9B9 | U+1F9C0
$emoji-main$-> U+1F9C1–U+1F9C2 | U+1F9D0–U+1F9E6 | U+1F9E7–U+1F9FF
$emoji-modifier-base$-> $emoji-modifier-base$ U+FE0F
$emoji-modifier-base$-> U+261D | U+26F9 | U+270A–U+270B | U+270C–U+270D | U+1F385
$emoji-modifier-base$-> U+1F3C2–U+1F3C4 | U+1F3C7 | U+1F3CA | U+1F3CB–U+1F3CC | U+1F442–U+1F443
$emoji-modifier-base$-> U+1F446–U+1F450 | U+1F466–U+1F469 | U+1F46E | U+1F470–U+1F478 | U+1F47C
$emoji-modifier-base$-> U+1F481–U+1F483 | U+1F485–U+1F487 | U+1F4AA | U+1F574–U+1F575 | U+1F57A
$emoji-modifier-base$-> U+1F590 | U+1F595–U+1F596 | U+1F645–U+1F647 | U+1F64B–U+1F64F | U+1F6A3
$emoji-modifier-base$-> U+1F6B4–U+1F6B6 | U+1F6C0 | U+1F6CC | U+1F918 | U+1F919–U+1F91C
$emoji-modifier-base$-> U+1F91E | U+1F91F | U+1F926 | U+1F930 | U+1F931–U+1F932
$emoji-modifier-base$-> U+1F933–U+1F939 | U+1F93D–U+1F93E | U+1F9B5–U+1F9B6 | U+1F9B8–U+1F9B9 | U+1F9D1–U+1F9DD
$emoji-modifier$-> U+1F3FB-U+1F3FF
$regional-indicators$-> $regional-indicator$ [$regional-indicators$]
$regional-indicator$-> U+1F1E6-U+1F1FF
$emoji-id$-> --$binary-operator$ --👍 --👎 --🔟 --🆕 --❗️ --❓--🤛 --🤜 --↩️ --⤴️ --🔂 --🔁 --🚨 --↪️ --🙅 --🍉 --🍇 --🆗 --👇 --☣️ --➡️ --⬅️ --🖍 --🐇 --🐊 --🦃 --🕊 --📗 --🔤 --🎍 $emoji$ | $multi-emoji$
$multi-emoji$-> $emoji-id$ 🔸 $emoji-id$
```

## Decorators

Decorators are a combination of 🎍 and another emoji and are used for keywords
that have a very specific meaning or are seldom used.

```syntax
$decorator$-> 🎍 $emoji-main$
```
