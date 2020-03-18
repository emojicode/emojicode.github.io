# Overloading

Overloading means that you can define methods that have the same name and mood,
but with different parameters. The compiler automatically selects the
most suitable when a method with the respective name and mood is called. You can
also overload initializers.

## Defining Overloads

Defining overloads is straightforward. You declare another method with the same mood and name as the method you wish to overload:

```
🐇 🐟 🍇
  ❗️ 🙋 string 🔡 🍇
    😀string❗️
  🍉

  ❗️ 🙋 number 🔢 🍇
    😀🔤a number🔤❗️
  🍉
🍉
```

Initializers are overloaded alike:

```
🕊 🍨🐚Element ⚪🍆️ 🍇
  🆕 🍇
    💭 ...
  🍉

  🆕 repeatedValue Element count 🔢 🍇
    💭 ...
  🍉

💭 ...
```

## Overload Resolution

While overloads mostly “just work” it can sometimes be difficult for the
compiler to figure out which method you mean. In some cases the compiler
will even issue an error, saying that the call is ambiguous.

### Rules

The following are the rules the Emojicode Compiler employs to determine the right method. The procedure is the same to resolve initializers.

1. From the type on which the method is called, select all methods with matching name, mood, and parameter count as candidates.
2. For every method, ensure that the arguments are compatible to the parameter types while inferring generic arguments if necessary, that the function is accessible and that the generic arguments (provided or inferred) are compatible to the generic argument constraints. If any of these checks fail for a method, eliminate the method as a candidate.
3. Perform *pick*:
    1. If there are no candidates, end resolution and issue an error.
    2. If there is only one candidate, yield it and end resolution.
    3. If there is only one non-generic candidate, yield it and end resolution.
4. Find the most specific methods and remove all other candidates. To determine if a method A is more specific than a method B:
  1. Let *score* be 0.
  2. For each i-th parameter a of A, if the type of a is compatible to the i-th parameter of B, increment *score* unless the i-th argument of the call is a literal type.
  3. A is more specific than B if and only if *score* is greater than (number of parameters - number of literal arguments) / 2.
5. Perform *pick*.
6. The resolution is ambiguous. Issue an error.
