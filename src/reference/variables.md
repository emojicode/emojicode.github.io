# Variables and Assignment

An important aspect of programming are variables. Variables pair a name
with a value. The variable name can consist of any sequence of characters but
may not contain spaces or emojis and may not begin with a number. These
are examples of valid variable names:

```
newYork
incredibly-long-variable-name
send_email_to:george@washington~
```

There are two types of variables: mutable and constant variables. Frozen
variables differ from normal ones in that they cannot be changed after
they were initially set.

## Assigning a constant variable

In many cases you will only assign a variable once, i.e. store a value into it,
and then use it without ever changing it. These are the cases where you should
use a constant variable.

Constant variables are extremely easy to use:

```
31 ➡️ daysInDecember
🔤Earth🔤 ➡️ thirdPlanet
```

```syntax
$assignment$-> $expression$ ➡️ [$mutable$] $assignee$
$assignee$-> $variable$ | $method-call$
```

As you can see from the examples, the value you want to assign is on the left
hand side of `➡️` while the variable you want to assign the value to is on the
right hand side. The above code therefore sets `daysInDecember` to `31` and
`thirdPlanet` to the string `Earth`.

The compiler infers the type of the variables from the provided values
automatically.

Obviously, you cannot change a constant variable. If you try to reassign a
constant variable you will get a compiler error.

## Declaring and assigning mutable variables

Sometimes, however, you will need variables whose value can be modified. This
is were mutable variables come in.

Before you can use a mutable variable you need to declare it. There are two
ways, either you declare and assign the variable to a value in one step or you
explicitely declare the variable, in which case in won’t have a value initially.

```
5300 ➡️ 🖍🆕 money
🖍🆕 catName 🔡
```

```syntax
$mutable$-> 🖍 [🆕]
$declaration$-> 🖍🆕 $variable$ $type$
```

The first example declares the variable `money` and assigns it the value 5300.
The compiler will infer that the type of the variable is 🔢.

The second line explicitly declares the variable `catName` and that it is of
the type 🔡. It does not have a value until assigned and the compiler will
raise an error if you try to use it before having assigned a value.

### Changing the value of mutable variables

The point of mutable variables is its inconstancy, so let us see how you
can change the value of an mutable variable.

The following is an example of assigning the two variables we declared before:

```
5300 ➡️ 🖍 money
🔤Kitty🔤 ➡️ 🖍 catName
```

Assigning an mutable variable is very similar to assigning a constant one,
but we need to note that the variable name is preceded by 🖍. You will get
an error if you omit the 🖍 and you will get an error if you try to assign
a variable this way, that has not been declared.

This mechanism is intended to prevent bugs that could emerge if you, for
instance, misspell a variable.

## Scoping

Variables are only accessible from the *scope* in which they were declared.
Every code block (everything between a 🍇 and 🍉) defines a separate scope. When
the code block is exited, this scope is destroyed and so are all variables and
values that were declared in it. Furthermore, classes and value types define
their own scope.

## Operator Assignment

We’ll now have a look at another useful structure: *Operator Assignment*.
Operator Assignment allows you to apply an operator to variable or to be more
precise, an operator is applied to the value of a variable and another operand
and the result of the operation is then stored into the variable.

```syntax
$operator-assignment$-> $variable$ ⬅️ $binary-operator$ $expression$
```

In the following example, the variable `i` is first incremented by one, then
by 5 and finally divided by 3.

```
0 ➡️ 🖍🆕i
i ⬅️➕ 1
i ⬅️➕ 5
i ⬅️➗ 3
```

Operator Assignment can obviously only be used with mutable variables.

## Assignee instance methods

>!N Assignee instance methods are not available in Emojicode Symphonic alpha.

You can also define instance methods to which values can be assigned.

Consider that to get a value from a list the `🐽` method is used as in this
example:

```
🐽 a_list 1❗️
```

It would be very intuitive, if we could — to assign a value — write this:

```
🔤Coco🔤 ➡️ 🐽 a_list 1❗️
```

And, indeed, we can. This works, because Emojicode allows us to define methods
that can be assigned to. Although this might sound complicated to you, in fact,
it isn’t. Take a look at this example, in which an assignee method is defined.

```
❗️ 🐽 index 🔢 ➡️ 🍬Element 🍇
  👴 ...
🍉

➡️ 🐽 assigned_value Element index 🔢 🍇
  👴 ...
🍉
```

In this example two methods are defined. The first one is rather obviously just
the getter we used before. The second method, on the other hand, uses the
assignment operator (➡️) instead of ❗️. This indicates to the compiler that this
method should be called, when an assignment to a method of the name `🐽` occurs.

The first argument of the assignee method is always the value that is being
assigned. It must not be provided on the right hand side of the assignment, as
we have seen in the assignment example before. The method itself than is free
to do whatever it needs to do with one limitation: It may not return a value.
