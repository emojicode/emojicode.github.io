# Operators

Emojicode defines a set of operators.

```syntax
$binary-operator$-> ➕ | ➖ | ➗ | ✖️ | 👐 | 🤝 | ◀️ | ▶️ | ⭕️ | 💢 |
$binary-operator$-> ❌ | 👈 | 👉 | 🚮 | 🙌 | 😜 | ◀️ 🙌 | ▶️ 🙌
```

Binary operators perform an operation on two values. For example, ➕ is an
operator that is defined for the 🔢 type and adds up two values:

```
23 ➕ 11
```

```syntax
$operator-expression$-> $expression$ $binary-operator$ $expression$
```

## Grouping

Consider the following example:

```
3 ➕ 2 ✖️ 2
```

Anybody with a reasonable understanding of maths will rightly expect the
result to be 7 because `2 ✖️ 2` will be evaluated first.

However, what if we wanted `3 ➕ 2` to be evaluated first and add 2 to the
result of that? Thisis what grouping is for.

Grouping allows you specify that the result of an operation is to be evaluated
without regard to any operators before or after it.

```syntax
$group$-> 🤜 $expression$ 🤛
```

To achieve what we want, we can rewrite our code to

```
🤜 3 ➕ 2 🤛 ✖️ 2
```

and the result will be 10.

## Operator Precedence

We have seen before that Emojicode knows that it must evaluate the ✖️  operation
before the ➕ operation. This knowledge is called *operator precedence.*

In order to have well-defined code, there is a clearly defined order in which
operators are evaluated, which is as follows. Operators at top at evaluated
first.

- 🚮, ➗, ✖️
- ➖, ➕
- 👈, 👉
- ◀️, ▶️, ◀️ 🙌, ▶️ 🙌
- 🙌, 😜
- ⭕️
- ❌
- 💢
- 🤝
- 👐

## Defining Operations for Custom Types

You can also define operators for custom types. An operator can be defined
similar to a method. This is an example from the s package’s 📇 type:

```
➕ b 📇 ➡️ 📇 🍇
  count ➕ 🐔b❗️ ➡️ new_count
  💭 ...
🍉
```

The difference to a normal method declaration is simply that instead of an mood
(❗️ or ❓) an operator appears. Furthermore, no name is specified.

## Identity Check

😜 can be used to determine whether two objects references point to the same
object in memory.

This isn’t an equality check: Two objects might represents the same value but
they are still two different object not sharing the same memory location. To
determine equality use 😛 if available.

😜 returns true if the result of both expression are references to the same
memory location.
