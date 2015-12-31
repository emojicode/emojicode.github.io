# Lexical Structure and Implementation Guidelines

## Tokens

>!N Tokens must not store more than 2<sup>32</sup>-1 Unicode Characters.

### Whitespaces

>!N See [Unicode Character Database](http://www.unicode.org/Public/7.0.0/ucd/PropList.txt). When lexing the file these characters shall be only used as delimiters and if non required they shall be ignored.

>!G NewLine = U+0A | U+2028 | U+2029 ;
>!G Whitespace = U+0009 - U+000D | U+0020 | U+0085 | U+1680 | U+2000 - U+200A | U+202F | U+205F | U+3000 | NewLine ;
>!G AnyCharacter = ? any character described in the Unicode 7.0 standard ? ;

### Boolean True

>!N `U+1F44D`, 👍 is classified as *Boolean True*.

>!G BooleanTrue = U+1F44D ;

### Boolean False

>!N `U+1F44E`, 👎 is classified as *Boolean False*.

>!G BooleanFalse = U+1F44E ;

### Symbol

>!N `U+1F51F`, 🔟 and the next following Unicode character shall be classified as *Symbol*.

>!G Symbol = U+1F51F, any-character ;

### Comments

>!N A *comment* is a section of characters that is ignored by the interpreter.
>!N A comment can be placed anywhere in code. A comment is either be wrapped between two 👵 or used to comment out a whole or the rest of the line (a line ends with `U+A, U+2028, U+2029`) from the point on a 👴 appears.
    
>!G Comment = MultilineComment | OnelineComment ;
>!G MultilineComment = "👵", { AnyCharacter }, "👵" ;
>!G OnelineComment = "👴", { ? any character described in the Unicode 7.0 standard except U+A0 ? } ;
	
### String

>!G String = "🔤", { EscapeSequence | ? any character described in the Unicode 7.0 standard except 🔤 ? }, "🔤" ;
>!G EscapeSequence = "❌", "🔤" | "n" | "t" | "r" ;

>!N A *string* token converts to a string when parsing the tokens. It begins and ends with `U+1F524` 🔤. All characters between belong to this token.
>!N 
>!N ❌ is the escape character which introduces a escape sequence. The escape charcater must not be added to the token. The next character is interpreted according to the following table. If the character is not in the table an error must be thrown.
>!N 
>!N Character after ❌	| Charcter to append
>!N --------------------|-------------------
>!N ❌					| ❌
>!N 🔤					| 🔤
>!N n					| `U+A0` (new line)
>!N t					| `U+9` (tab)
>!N r					| `u+0D` (carriage return)

### Identifiers

*Note: This list may be extended without notice.*

>!N *Boolean True*, *Boolean False*, *Comment* and *String* have a higher precedence than *Identifier*.

>!G Identifier = U+1F300 - U+1F64F | U+1F680 - U+1F6C5 | U+2600 - U+27BF | U+1F191 - U+1F19A | U+1F910 - U+1F9C0

>!N A compiler shall throw a warning if a reserved emoji was used, but the code is syntactic correct.

### Integer

>!N An integer is a token that begins with `+, -, 0 - 9` and can be followed by `0 - 9`. 
>!N If the integer begins with `0x` it is parsed as a hexadecimal. Then the charcters `a - f, A - F` can follow additionally. If it begins with `0` it is parsed as an octal.
>!N The end of an integer is introduced by a character not considered belonging to the integer, this characters belongs to the next token.

>!G DigitWithoutNull = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" ;
>!G Digit = "0" | DigitWithoutNull ;
>!G Integer = [ "-" | "+" ], Decimal | Hexadecimal | Octal | "0" ;
>!G Decimal = DigitWithoutNull, { Digit } ;
>!G Hexadecimal = "0", "x", { Digit | "A" | ... | "F" | "a" | ... | "f" } ;
>!G Octal = "0", Digit, { Digit } ;

These are examples for integers:

	314413
	0x1F 👴 31 in decimal
	012 👴 10 in decimal
	
Be careful:

	0xXAD
	
These are two tokens. An integer (value 0) and a variable (*XAD*).

`0x` is considered an integer with value 0.

### Float 

>!N A float is a token that begins like integer with `+, -, 0 - 9` and can be followed by `., 0 - 9`. The end of an integer is introduced by a character not considered belonging to the integer, this characters belongs to the next token.

>!G Float = [ "-", "+" ], "0" | ( DigitWithoutNull, { Digit } ), ".", Digit, { Digit } ;    

### Variable Name

>!N Any other Unicode character is classified as *variable name*. All following characters that do not belong to the identifiers category shall be added to the variable name.


## Parsing

>!N These tokens must be parsed and converted to a object as seen in the table below:
>!N 
>!N Token			| Class	| Value Converting Information
>!N ----------------|-------|----------------------------
>!N Boolean False	| 👌	| Shall be converted to a 👎 value
>!N Boolean True	| 👌	| Shall be converted to a 👍 value
>!N String			| 🔡	| The tokens value (without the 🔤) shall be the value of the string
>!N Integer			| 🚂	| The collected characters shall be converted to an integer
>!N Float			| 🚀	| The collected characters shall be converted to a float
>!N Symbol			| 🔣	| The collected character

### Variable Names

>!N When a variable name is excepted by the syntax of a language construct, the variable name must be interpreted as described by the language construct.
>!N 																						  
>!N When no variable name is excepted by the syntax of a language construct, the variable content shall be resolved as described in [Variables](variables.html).

### Identifiers 

>!N If the identifier is a language construct the language construct’s syntax apply and the language construct must perform as described.
>!N 
>!N If a language construct excepts a type and an identifier the interpreter must behave as described in [Namespaces](classes.html#namespaces).
>!N 
>!N If the identifier is not a language construct the language construct, it shall be interpreted as a method call – see [Method calls](classes.html#method-calls).
    
## Nothingness

>!N Per interpreter instance only one ✨ instance shall exist. This instance can be accessed with ⚡️.

## Classes

>!N Defining instance variables but defining no cosntructor shall lead to a compiler warning.
>!N If an instance variable whose type is not an optional is not set within a initializer an error must be thrown.

>!N A compiler must throw an error on an attempt to use 🐕 in a class method.

>!N A compiler must throw an error if 🐀 is used with 🔷 to call a non 🔑 initializer.

>!N Subclasses do not inherit initializers by default. If certain conditions are met however, initializers are inherited. These two conditions must be met to inherit a superclass’ initializers:
>!N 
>!N - The class does not define any instance variables.
>!N - The class does not define a initializer.

>!N Not setting an instance variable in a initializer shall lead to a compiler warning. Not calling a superinitializer or using 🐕 before the super initializer call shall lead to a compiler error.
