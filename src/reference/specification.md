# Emojicode Engine & Compilation Specification

## Introduction

The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD",
"SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be
interpreted as described in [RFC 2119](https://www.ietf.org/rfc/rfc2119.txt).

This document describes version 3 of the Emojicode Engine & Compilation
Specification which is used with Emojicode 0.2.

Emojicode programs are traditionally compiled to Emojicode Bytecode which is
then executed by an Emojicode Engine. The reference implementation is the
Emojicode Real-Time Engine.

The Emojicode Engine should have the ability to execute the given bytecode file
regardless of the underlying operating system and system architecture. Bytecode
instruction instruct the Engine what to do. It may be of pariticular intereset
that the Emojicode Bytecode is on a higher level than other bytecode formats of
other programming languages.

It is noteworthy that Emojicode does not use reverse Polish notation but Polish
prefix notation. This means that the bytecode file would contain the following
instructions to sum up 3 and 5. (Instructions are space-separated and in
hexadecimal representation.)

	0x22 0x13 0x3 0x13 0x5

## Emojicode Compilation

### Error Reporting

All errors emitted by an Emojicode Compiler must follow these standards:

- Give as much information as possible.
- Include the position in code.
- End the message with a period.
- Do not use abbreviations.
- Always include the namespace when including a type name.
- Variable names must appear in quotation marks.
- Emit as many (unrelated) warnings as possible before emitting the error.

An error shall terminate the compilation and the compiler can delete the output file. A warning does not affect the compilation in any way.

### Limits

A program and thus the bytecode file must not consist of more than
2<sup>16</sup> (65,536) classes, and not of more than 2<sup>16</sup>
protocols.

Callables (Methods, Class Methods, Initializers and Closures) must not take more
than 2<sup>8</sup> (256) arguments. Methods, Class Methods and Initializers are
limited to 2<sup>32</sup> (4,294,967,296) coins. A class must not define more
than 2<sup>16</sup> instance variables, 2<sup>16</sup> Methods,
2<sup>16</sup> Class methods and 2<sup>16</sup> Initializers, _including_
those inherited from super classes.

A code block is limited to 2<sup>8</sup> variables. Code blocks are only defined
by Callables. Captured variables inside Closures count towards this limit.

A compiler must emit an error if one of these limits is exceeded.

## Emojicode Engine

### Data Types

Like the compiler the engine distinguishes between *primitives* and *objects*.

*Primitives* are a fixed amount of data types which are represented by a single value. These data types are:

- Integer, which must be able to store the range of a 64-bit signed integer.
- Float
- Boolean, which must be able to store a truthy or a falsy.
- Symbol, which must be able to represent any Unicode Character defined in the latest Unicode standard.

*Objects* are allocated on the heap and only passed by their reference.

Since *primitives* and *object references* can be stored together in a list or dictionary, the engine must be able to store *primitives* and *objects references* in the same space but must still be able to distinguish them later.

### Heap

The *heap* is an area of storage in which objects are allocated.

The heap must be managed by the Engine using an automatic storage management
system provided by the engine. The Emojicode Real-Time Engine uses a Garbage
Collector after C. J. Cheney. If the engine is no longer able to manage the heap
for any reason it must terminate the program.

### Call Stack

The *call stack* is an area of storage dedicated to store data about the active
subroutines of the program. Each thread has its own call stack.

The call stack consists of *stack frames*. *Stack frames* store local variables
and the *current object context*. The *current object context* is the object on
which a method was called. If a routine is called which allocates a stack frame
but does not have an object context the object context may be undefined, given
that no code trying to access the *current object context* will run.

An Engine is allowed to not use a call stack if it is able to fulfill the
specification without one.

### String Pool

The *string pool* is an area of storage reserved to store references to all String objects known at compile time.

The compiler will replace each string literal with a instruction to retrieve the string from the string pool by its index. The strings itself are then listed in a section of the bytecode file. After the initial read of the bytecode file the string pool may not be modified.

The Engine can determine the size of the string pool by looking at the bytecode file.

### Class Table

The *class table* is a list of all classes, which can be accessed by the class index. The class table is populated from the bytecode file at the initial read. It may not be modified.

## Emojicode Bytecode File

An Emojicode Bytecode file consists of 8-bit bytes. All 16-bit and 32-bit
integers are constructed by reading 2 or 4 bytes respectively. These integers
are stored in Big-Endian in the bytecode file.

### Structure of Each File

The structure of each file is shown below. The next section describes the exact
length and structure of all structures and how they shall be read.

1.  Version
2. 	Number of Classes
3.  Packages
	- Count
	- Packages
		- Name
		- Classes
			- Qualified Type Name
			- Variables
		    - Methods
		        - Arguments
		            - Qualified Class Name
		        - Handler
		    - Initializers
		        - Arguments
		            - Qualified Class Name
		        - Handler
		    - Class Methods
		        - Arguments
		            - Qualified Class Name
		        - Handler
		    - Following Indicator
4.	String Pool
5.	Starting Flag

### Version

The first byte of the file represents the specification version. Files that
comply with this specification shall store the value 3.

Engines might reject a bytecode file based on the version number.

### Number of Classes

1.	16-bit unsigned integer: The number of classes defined in this file.

### Starting Flag Class

The *starting flag class method* is the first part of the program to be called.

1. 16-bit unsigned integer: The class index of the class in which the *starting flag class method* is located.
2. 16-bit unsigned integer: The index of the starting flag method.

### Packages

1. 8-bit unsigned integer: Packages count.
2. *Packages* *1.

### Package

1.  16-bit unsigned integer: Number of characters.
2.  8-bit unsigned integer *1.: ASCII characters representing the name of the package
3.  16-bit unsigned integer: Required major version.
4.  16-bit unsigned integer: Required minor version.
5.  8-bit unsigned integer: 1 if the package requires a native binary to be loaded, 0 otherwise.
6. 	*Class*__es__: The classes which belong to this package.

### Class

1.  `EmojicodeChar`: The name of the class.
2.  16-bit unsigned integer: Class Index of the superclass.
3.  16-bit unsigned integer: The number of instance variables. Including superclass’s instance variables.
4.	16-bit unsigned integer: The number of methods this class will have *including* inherited ones. Therefore if the class does not define methods itself this value must be equal to it superclass’s value.
5.	16-bit unsigned integer: The number of class methods this class will have *including* inherited ones.
6.  8-bit unsigned integer: 0 if the class does not inherit initializers, 1 if it does.
7.	16-bit unsigned integer: The number of initializers this class will have *including* inherited ones. If the class does not define initializers itself but 6. was 1 this value must be equal to it superclass’s value. If 6. however was 0 and the class does not define initializers this value must be equal to 0.
8.  16-bit unsigned integer: The number of methods.
9.  *Method*__s__: As many methods as defined in 6.
10.  16-bit unsigned integer: The number of initializers.
11.  *Initializer*__s__: As many methods as defined in 8.
12.	16-bit unsigned integer: The number of class methods.
13.	*Class Methods*__s__: As many methods as defined in 10.
14. 16-bit unsigned integer: The number of protocols this class agrees to.
15. 16-bit unsigned integer if 14. not 0: The biggest index.
16. 16-bit unsigned integer if 14. not 0: The smallest index.
17. *Protocol Method* *14.: Protocol methods
18.	8-bit unsigned integer: 1 if a class follows, 0 if no class follows

**If a method, initializer or class method is marked with `native` this package’s dynamic library is queried for a function pointer.**

### Method

1.  `EmojicodeChar`: The name of the method.
2.  `uint16_t`: The index at which to store this method in the virtual table.
3.  `uint8_t`: The number of arguments excepted by the method. The arguments must receive the lowest ID. The first argument must always receive ID 0, the second always ID 1 and so on.
4.  *Handler*: How to execute.

### Class Method

1.  `EmojicodeChar`: The name of the method.
2.  `uint16_t`: The index at which to store this method in the virtual table.
3.  `uint8_t`: The number of arguments excepted by the method. The arguments must receive the lowest variable IDs. The first argument must always be put into the variable with ID 0, the second always into the variable with ID 1 and so on.
4.  *Handler*: How to execute.

### Initializers

1.  `EmojicodeChar`: The name of the method.
2.  `uint16_t`: The index at which to store this initializer in the virtual table.
3.  `uint8_t`: The number of arguments excepted by the method. The arguments must receive the lowest ID. The first argument must always receive ID 0, the second always ID 1 and so on.
4.  *Handler*: How to execute.

### Protocol

1.	16-bit unsigned integer: Protocol Index
2.	16-bit unsigned integer: Number of methods
3.	16-bit unsigned integer *3.: These are the indexes of the corresponding method in the class’s virtual method table.

### Handler

1.	`uint8_t`: Whether it is natively implemented.
2.	- If 1. is not 0: The block must be read from the package.
	- If 1. is 0: *Block*: Emojicode instructions.

### Block

1.  `uint8_t`: The number of variables.
2.  `uint32_t`: Token count.
3.  *Coin*__s__: As many tokens as defined in 1.

### Coin

Then tokens follow. The number of tokens is not limited.

A Coin is a 32-bit unsigned integer and is interpreted as defined in the Instructions section below.

### String Pool

1. `uint16_t`: Number of String Pool items.
2. *String Pool Item* *1: The String Pool items.

### String Pool Item

1. `uint16_t`: The length of the string.
2. Coin *1.: The characters of the string.

## Bytecode Instructions

The Engine must run a code block using the following routine:

1. Read a Coin.
2. Perform the following routine:
	1. Look up the instruction assigned to the Coin’s value.
	2. Fetch as many instruction arguments as required. Arguments are fetched using this routine:
		1. Read a Coin.
		2. If the argument type is *Something* use the parent routine and use its return as argument. This means that the Coin’s value is an instruction, and the result of this instruction is the argument. If the argument type is *Coin*, the Coin’s value itself is the argument.
	3. Return the instruction’s return value from the routine.
3. Repeat this procedure until there are no Coins left.

Each instruction returns *Something*. This return value can be used by the instruction that is currently collecting its arguments.

<table class="table table-bordered table-condensed instructions-table">
<tr><th>Code</th><th>Description</th><th>Arguments</th><th>Return</th></tr>
<tr>
	<td>0x1</td>
	<td>This instructions means an ordinary method call.</td>
	<td>
		<ol>
			<li>Object</li>
			<li>Coin: The Virtual Table Index of the method.</li>
			<li>Something *Method’s Argument Count</li>
		</ol>
	</td>
	<td>
		The method’s return.
	</td>
</tr>
<tr>
	<td>0x2</td>
	<td>Class Method Call</td>
	<td>
		<ol>
			<li>Coin: Class Coin, the class whose method shall be called</li>
			<li>Coin: The Virtual Table Index of the class method.</li>
			<li>Something *Method’s Argument Count</li>
		</ol>
	</td>
	<td>
		The class method’s return.
	</td>
</tr>
<tr>
	<td>0x3</td>
	<td>Protocol Method Call</td>
	<td>
		<ol>
			<li>Object</li>
			<li>Coin: The protocol index.</li>
			<li>Coin: The method index in the protocol’s virtual method table.</li>
			<li>Something *Method’s Argument Count</li>
		</ol>
	</td>
	<td>
		The class method’s return.
	</td>
</tr>
<tr>
	<td>0x4</td>
	<td>New Object</td>
	<td>
		<ol>
			<li>Coin: Class Index</li>
			<li>Coin: Initializer Virtual Table Index.</li>
			<li>Something *Initializer’s Argument Count</li>
		</ol>
	</td>
	<td>
		The newly created object.
	</td>
</tr>
<tr>
	<td>0x5</td>
	<td>Super Method Call</td>
	<td>
		<ol>
			<li>Coin: Index of the Super Class</li>
			<li>Coin: Method Virtual Table Index.</li>
			<li>Something *Initializer’s Argument Count</li>
		</ol>
	</td>
	<td>
		The newly created object.
	</td>
</tr>
<tr>
	<td>0x10</td>
	<td>String</td>
	<td>
		<ol>
			<li>Coin: The index of the string in the string pool.</li>
		</ol>
	</td>
	<td>
		The string.
	</td>
</tr>
<tr>
	<td>0x11</td>
	<td>Boolean True</td>
	<td>
	</td>
	<td>
		Boolean True.
	</td>
</tr>
<tr>
	<td>0x12</td>
	<td>Boolean False</td>
	<td>
	</td>
	<td>
		Boolean False.
	</td>
</tr>
<tr>
	<td>0x13</td>
	<td>Integer (&lt; 2<sup>32</sup>)</td>
	<td>
		<ol>
			<li>Coin: The integer value.</li>
		</ol>
	</td>
	<td>
		The integer.
	</td>
</tr>
<tr>
	<td>0x14</td>
	<td>Integer (≥ 2<sup>32</sup>)</td>
	<td>
		<ol>
			<li>Coin: The first 32 bit of the value.</li>
		</ol>
		<ol>
			<li>Coin: The second 32 bit of the value.</li>
		</ol>
	</td>
	<td>
		The integer.
	</td>
</tr>
<tr>
	<td>0x15</td>
	<td>Double</td>
	<td>
		<ol>
			<li>Coin: The first 32 bits of the mantissa.</li>
      <li>Coin: The second 32 bits of the mantissa.</li>
      <li>Coin: The exponent.</li>
		</ol>
    <small>The mantissa is multiplied by 2<sup>63</sup>-1</small>
	</td>
	<td>
		The double.
	</td>
</tr>
<tr>
	<td>0x16</td>
	<td>Symbol</td>
	<td>
		<ol>
			<li>Coin: The Unicode code point.</li>
		</ol>
	</td>
	<td>
		The symbol.
	</td>
</tr>
<tr>
	<td>0x17</td>
	<td>Nothingness</td>
	<td>
	</td>
	<td>
		Nothingness.
	</td>
</tr>
<tr>
	<td>0x18</td>
	<td>Increment Stack Variable</td>
	<td>
		<ol>
			<li>Coin: The variable index.</li>
		</ol>
	</td>
	<td>
		Nothingness.
	</td>
</tr>
<tr>
	<td>0x19</td>
	<td>Decrement Stack Variable</td>
	<td>
		<ol>
			<li>Coin: The variable index.</li>
		</ol>
	</td>
	<td>
		Nothingness.
	</td>
</tr>
<tr>
	<td>0x1A</td>
	<td>Read Stack Variable</td>
	<td>
		<ol>
			<li>Coin: The variable index.</li>
		</ol>
	</td>
	<td>
		The content of the variable.
	</td>
</tr>
<tr>
	<td>0x1B</td>
	<td>Set Stack Variable</td>
	<td>
		<ol>
			<li>Coin: The variable index.</li>
			<li>Something: The value.</li>
		</ol>
	</td>
	<td>
		Nothingness.
	</td>
</tr>
<tr>
	<td>0x1C</td>
	<td>Read Object Variable</td>
	<td>
		<ol>
			<li>Coin: The variable index.</li>
		</ol>
	</td>
	<td>
		The content of the variable.
	</td>
</tr>
<tr>
	<td>0x1D</td>
	<td>Set Object Variable</td>
	<td>
		<ol>
			<li>Coin: The variable index.</li>
			<li>Something: The value.</li>
		</ol>
	</td>
	<td>
		Nothingness.
	</td>
</tr>
<tr>
	<td>0x1E</td>
	<td>Increment Object Variable</td>
	<td>
		<ol>
			<li>Coin: The variable index.</li>
		</ol>
	</td>
	<td>
		Nothingness.
	</td>
</tr>
<tr>
	<td>0x1F</td>
	<td>Decrement Object Variable</td>
	<td>
		<ol>
			<li>Coin: The variable index.</li>
		</ol>
	</td>
	<td>
		Nothingness.
	</td>
</tr>
<tr>
	<td>0x20</td>
	<td>Equals</td>
	<td>
		<ol>
			<li>Object: Primitive A.</li>
			<li>Object: Primitive B.</li>
		</ol>
	</td>
	<td>
		Whether A and B are equal.
	</td>
</tr>
<tr>
	<td>0x21</td>
	<td>Integer Subtraction</td>
	<td>
		<ol>
			<li>Object: Primitive A.</li>
			<li>Object: Primitive B.</li>
		</ol>
	</td>
	<td>
		A - B.
	</td>
</tr>
<tr>
	<td>0x22</td>
	<td>Integer Addition</td>
	<td>
		<ol>
			<li>Object: Primitive A.</li>
			<li>Object: Primitive B.</li>
		</ol>
	</td>
	<td>
		A + B.
	</td>
</tr>
<tr>
	<td>0x23</td>
	<td>Integer Multiplication</td>
	<td>
		<ol>
			<li>Object: Primitive A.</li>
			<li>Object: Primitive B.</li>
		</ol>
	</td>
	<td>
		A times B.
	</td>
</tr>
<tr>
	<td>0x24</td>
	<td>Integer Division</td>
	<td>
		<ol>
			<li>Object: Primitive A.</li>
			<li>Object: Primitive B.</li>
		</ol>
	</td>
	<td>
		A divided by B. Always returns an integer.
	</td>
</tr>
<tr>
	<td>0x25</td>
	<td>Integer Modulus</td>
	<td>
		<ol>
			<li>Object: Primitive A.</li>
			<li>Object: Primitive B.</li>
		</ol>
	</td>
	<td>
		A modulus B. Return is an integer.
	</td>
</tr>
<tr>
	<td>0x26</td>
	<td>Boolean Invert</td>
	<td>
		<ol>
			<li>Object: Boolean</li>
		</ol>
	</td>
	<td>
		True if the boolean is false, false if the boolean is true.
	</td>
</tr>
<tr>
	<td>0x27</td>
	<td>Boolean Or</td>
	<td>
		<ol>
			<li>Object: Boolean</li>
			<li>Object: Boolean</li>
		</ol>
	</td>
	<td>
		True if one of the booleans is true.
	</td>
</tr>
<tr>
	<td>0x28</td>
	<td>Boolean And</td>
	<td>
		<ol>
			<li>Object: Boolean</li>
			<li>Object: Boolean</li>
		</ol>
	</td>
	<td>
		True if both booleans are true.
	</td>
</tr>
<tr>
	<td>0x29</td>
	<td>Integer Less Than</td>
	<td>
		<ol>
			<li>Object: Integer</li>
			<li>Object: Integer</li>
		</ol>
	</td>
	<td>
		True if the first integer is less than the second.
	</td>
</tr>
<tr>
	<td>0x2A</td>
	<td>Integer Bigger Than</td>
	<td>
		<ol>
			<li>Object: Integer</li>
			<li>Object: Integer</li>
		</ol>
	</td>
	<td>
		True if the first is bigger than the second.
	</td>
</tr>
<tr>
	<td>0x2B</td>
	<td>Integer Less Than Or Equal</td>
	<td>
		<ol>
			<li>Object: Integer</li>
			<li>Object: Integer</li>
		</ol>
	</td>
	<td>
		True if the first integer is less than or equal to the second.
	</td>
</tr>
<tr>
	<td>0x2C</td>
	<td>Integer Bigger Than Or Equal</td>
	<td>
		<ol>
			<li>Object: Integer</li>
			<li>Object: Integer</li>
		</ol>
	</td>
	<td>
		True if the first integer is bigger than or equal to the second.
	</td>
</tr>
<tr>
	<td>0x2D</td>
	<td>Reference Compare</td>
	<td>
		<ol>
			<li>Object: A</li>
			<li>Object: B</li>
		</ol>
	</td>
	<td>
		True if A and B point to the same object in memory.
	</td>
</tr>
<tr>
	<td>0x2E</td>
	<td>Nothingness Comparator</td>
	<td>
		<ol>
			<li>Something: A</li>
		</ol>
	</td>
	<td>
		True if A is Nothingness.
	</td>
</tr>

<tr>
	<td>0x2F</td>
	<td>Double Equal</td>
	<td>
		<ol>
			<li>Object: Primitive A.</li>
			<li>Object: Primitive B.</li>
		</ol>
	</td>
	<td>
		Whether A and B are equal.
	</td>
</tr>
<tr>
	<td>0x30</td>
	<td>Double Subtraction</td>
	<td>
		<ol>
			<li>Object: Primitive A.</li>
			<li>Object: Primitive B.</li>
		</ol>
	</td>
	<td>
		A - B.
	</td>
</tr>
<tr>
	<td>0x31</td>
	<td>Double Addition</td>
	<td>
		<ol>
			<li>Object: Primitive A.</li>
			<li>Object: Primitive B.</li>
		</ol>
	</td>
	<td>
		A + B.
	</td>
</tr>
<tr>
	<td>0x32</td>
	<td>Double Multiplication</td>
	<td>
		<ol>
			<li>Object: Primitive A.</li>
			<li>Object: Primitive B.</li>
		</ol>
	</td>
	<td>
		A times B.
	</td>
</tr>
<tr>
	<td>0x33</td>
	<td>Double Division</td>
	<td>
		<ol>
			<li>Object: Primitive A.</li>
			<li>Object: Primitive B.</li>
		</ol>
	</td>
	<td>
		A divided by B. Always returns an integer.
	</td>
</tr>
<tr>
	<td>0x34</td>
	<td>Double Less Than</td>
	<td>
		<ol>
			<li>Object: Double</li>
			<li>Object: Double</li>
		</ol>
	</td>
	<td>
		True if the first integer is less than the second.
	</td>
</tr>
<tr>
	<td>0x35</td>
	<td>Double Bigger Than</td>
	<td>
		<ol>
			<li>Object: Double</li>
			<li>Object: Double</li>
		</ol>
	</td>
	<td>
		True if the first is bigger than the second.
	</td>
</tr>
<tr>
	<td>0x36</td>
	<td>Double Less Than Or Equal</td>
	<td>
		<ol>
			<li>Object: Double</li>
			<li>Object: Double</li>
		</ol>
	</td>
	<td>
		True if the first integer is less than or equal to the second.
	</td>
</tr>
<tr>
	<td>0x37</td>
	<td>Double Bigger Than Or Equal</td>
	<td>
		<ol>
			<li>Object: Double</li>
			<li>Object: Double</li>
		</ol>
	</td>
	<td>
		True if the first integer is bigger than or equal to the second.
	</td>
</tr>
<tr>
	<td>0x38</td>
	<td>Double Modulus</td>
	<td>
		<ol>
			<li>Object: Double</li>
			<li>Object: Double</li>
		</ol>
	</td>
	<td>
		Remainder of A / B. Return is a double.
	</td>
</tr>

<tr>
	<td>0x3A</td>
	<td>Unwrap Optional</td>
	<td>
		<ol>
			<li>Something: A</li>
		</ol>
	</td>
	<td>
		Returns A if it is not Nothingness, otherwise a fatal error occours.
	</td>
</tr>
<tr>
	<td>0x3B</td>
	<td>Optional Chaining</td>
	<td>
		<ol>
			<li>Something: A</li>
		</ol>
	</td>
	<td>
		Returns A if it is not Nothingness, otherwise a fatal error occours.
	</td>
</tr>
<tr>
	<td>0x3C</td>
	<td>This</td>
	<td></td>
	<td>
		Returns the object context.
	</td>
</tr>
<tr>
	<td>0x3D</td>
	<td>Super constrcutor</td>
	<td>
		<ol>
			<li>Coin: Class Index</li>
      <li>Coin: Initializer Virtual Table Index</li>
      <li>Something Initializer’s Argument Count</li>
		</ol>
	</td>
	<td>
		Returns A if it is not Nothingness, otherwise a fatal error occours.
	</td>
</tr>
<tr>
	<td>0x3E</td>
	<td>Conditional Assignment</td>
	<td>
		<ol>
			<li>Coin: Variable Index</li>
      <li>Something: A</li>
		</ol>
	</td>
	<td>
		If A is not Nothingness true is returned and the variable is set to A;
    otherwise false is returned.
	</td>
</tr>
<tr>
	<td>0x3F</td>
	<td>Integer To Double</td>
	<td>
		<ol>
			<li>Object: Integer</li>
		</ol>
	</td>
	<td>
		Returns the double representation of this integer.
	</td>
</tr>

<tr>
	<td>0x40</td>
	<td>Cast To Class</td>
	<td>
		<ol>
			<li>Something: A</li>
			<li>Coin: Class Index</li>
		</ol>
	</td>
	<td>
		A. A may not be Nothingness. If A is not compatible to the given class nothingness is returned.
	</td>
</tr>
<tr>
	<td>0x41</td>
	<td>Cast To Protocol</td>
	<td>
		<ol>
			<li>Something: A</li>
			<li>Coin: Protocol Index</li>
		</ol>
	</td>
	<td>
		A. A may not be Nothingness. If A is not compatible to the given protocol nothingness is returned.
	</td>
</tr>
<tr>
	<td>0x42</td>
	<td>Cast To Boolean</td>
	<td>
		<ol>
			<li>Something: A</li>
		</ol>
	</td>
	<td>
		A. If A is not a boolean nothingness is returned.
	</td>
</tr>
<tr>
	<td>0x43</td>
	<td>Cast To Integer</td>
	<td>
		<ol>
			<li>Something: A</li>
		</ol>
	</td>
	<td>
		A. If A is not a integer nothingness is returned.
	</td>
</tr>
<tr>
	<td>0x44</td>
	<td>Safe Cast To Class</td>
	<td>
		<ol>
			<li>Something: A</li>
			<li>Coin: Class Index</li>
		</ol>
	</td>
	<td>
		A. A may be Nothingness. If A is not compatible to the given class nothingness is returned.
	</td>
</tr>
<tr>
	<td>0x45</td>
	<td>Safe Cast To Protocol</td>
	<td>
		<ol>
			<li>Something: A</li>
			<li>Coin: Protocol Index</li>
		</ol>
	</td>
	<td>
		A. A may be Nothingness. If A is not compatible to the given protocol nothingness is returned.
	</td>
</tr>
<tr>
	<td>0x46</td>
	<td>Cast To Symbol</td>
	<td>
		<ol>
			<li>Something: A</li>
		</ol>
	</td>
	<td>
		A. If A is not a symbol nothingness is returned.
	</td>
</tr>
<tr>
	<td>0x47</td>
	<td>Cast To Double</td>
	<td>
		<ol>
			<li>Something: A</li>
		</ol>
	</td>
	<td>
		A. If A is not a double nothingness is returned.
	</td>
</tr>
<tr>
	<td>0x50</td>
	<td>Dictionary Literal</td>
	<td>
		<ol>
			<li>Coin: Number of key-value pairs.</li>
			<li>Something 2* Number of key value pairs.</li>
		</ol>
	</td>
	<td>
		Retunrs a dictionary with the given key-value pairs.
	</td>
</tr>
<tr>
	<td>0x51</td>
	<td>List Literal</td>
	<td>
		<ol>
			<li>Coin: Number of list items.</li>
			<li>Something *Number of list items.</li>
		</ol>
	</td>
	<td>
		Returns a list with the given list items.
	</td>
</tr>
<tr>
	<td>0x52</td>
	<td>String Concatenation</td>
	<td>
		<ol>
			<li>Coin: Number of strings.</li>
			<li>Something *Number of strings.</li>
		</ol>
	</td>
	<td>
		Creates a new string by concatenating all given strings.
	</td>
</tr>
<tr>
	<td>0x53</td>
	<td>Range</td>
	<td>
		<ol>
			<li>Something: Start</li>
			<li>Something: Stop</li>
		</ol>
	</td>
	<td>

	</td>
</tr>
<tr>
	<td>0x54</td>
	<td>Range Step</td>
	<td>
		<ol>
			<li>Something: Start</li>
			<li>Something: Stop</li>
			<li>Something: Step</li>
		</ol>
	</td>
	<td>

	</td>
</tr>

<tr>
	<td>0x5A</td>
	<td>AND</td>
	<td>
		<ol>
			<li>Something: A</li>
			<li>Something: B</li>
		</ol>
	</td>
	<td>
	A AND B
	</td>
</tr>
<tr>
	<td>0x5B</td>
	<td>OR</td>
	<td>
		<ol>
			<li>Something: A</li>
			<li>Something: B</li>
		</ol>
	</td>
	<td>
	A OR B
	</td>
</tr>
<tr>
	<td>0x5C</td>
	<td>XOR</td>
	<td>
		<ol>
			<li>Something: A</li>
			<li>Something: B</li>
		</ol>
	</td>
	<td>
	A XOR B
	</td>
</tr>
<tr>
	<td>0x5D</td>
	<td>NOT</td>
	<td>
		<ol>
			<li>Something: A</li>
		</ol>
	</td>
	<td>
	NOT A
	</td>
</tr>

<tr>
	<td>0x60</td>
	<td>Return</td>
	<td>
		<ol>
			<li>Something: Return value</li>
		</ol>
	</td>
	<td>
		Returns from the current procedure with the given value.
	</td>
</tr>
<tr>
	<td>0x61</td>
	<td>While</td>
	<td>
		<ol>
			<li>Something: A</li>
      <li>Block: C</li>
		</ol>
	</td>
	<td>
		Repeatedly evaluates C while A evaluates to true.
	</td>
</tr>
<tr>
	<td>0x62</td>
	<td>If</td>
	<td>
		<ol>
			<li>Coin: Length of the complete if statement</li>
      <li>Something: A</li>
      <li>Block: C</li>
		</ol>
	</td>
	<td>
		Evaluates C if A is true.
	</td>
</tr>
<tr>
	<td>0x63</td>
	<td colspan="3">Reserved</td>
</tr>
<tr>
  <td>0x64</td>
  <td>Each</td>
  <td>
    <ol>
      <li>Coin: Variable index.</li>
      <li>Something: A</li>
      <li>Coin: Private Variable index.</li>
      <li>Block: C</li>
    </ol>
  </td>
  <td>
    Repeats C for each item of the given enumerator A.
  </td>
</tr>
<tr>
  <td>0x65</td>
  <td>Each Array</td>
  <td>
    <ol>
      <li>Coin: Variable index.</li>
      <li>Something: A</li>
      <li>Coin: Private Variable index.</li>
      <li>Block: C</li>
    </ol>
  </td>
  <td>
    Repeats C for each item of the given array A.
  </td>
</tr>
<tr>
	<td>0x66</td>
  <td>Each Range</td>
  <td>
    <ol>
      <li>Coin: Variable index.</li>
      <li>Something: A</li>
      <li>Block: C</li>
    </ol>
  </td>
  <td>
    Repeats C for each item of the given range A.
  </td>
</tr>
<tr>
	<td>0x70</td>
  <td>Closure Creation</td>
  <td>
    <ol>
      <li>Coin: Variable count.</li>
      <li>Coin: Coin count.</li>
      <li>Coin: Argument count.</li>
      <li>
      	Coin: Captured variable count (`& 0xFFFF`) and capture
      	self (`& 0xFFFF0000`).
      </li>
    </ol>
  </td>
  <td>
    Creates a clousre.
  </td>
</tr>
<tr>
	<td>0x71</td>
  <td>Captured Method</td>
  <td>
    <ol>
   		<li>Something: The object.</li>
      <li>Coin: Virtual Table Index</li>
    </ol>
  </td>
  <td>
    Captures the method identified by the given VTI from the given object.
  </td>
</tr>
<tr>
	<td>0x72</td>
  <td>Callable execution</td>
  <td>
    <ol>
   		<li>Something: Callable.</li>
    </ol>
  </td>
  <td>
    Executes the given callable.
  </td>
</tr>
</table>
