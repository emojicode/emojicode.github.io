# Safe and Unsafe Code

Emojicode is designed to make your programs safe.

But what exactly does this mean? In contrast to other programming languages,
your program will never terminate without stating a clear reason and should do
so only in a few predictable and avoidable cases. These cases are called a panic.

To achieve this goal Emojicode imposes certain restrictions. For instance,
you can normally not allocate memory or perform random operations on allocated
memory.

## Panic

When an Emojicode program reaches a state in which it cannot continue execution
because an irrecoverable error has arosen, it will panic. Panicking occurs
in the following situations.

- Unwrapping an optional without a value or an error that contains an error
- Accessing an array out of bounds
- A call to the panic method 🤯
- The program runs out of memory (rare)

## Unsafe Code

In some cases you might actually need to allocate memory yourself.
The s package provides a value type named 🧠, with which you can do exactly
that.

```
🌍 🕊 🧠 🍇
  ☣️️ 🆕 size 🔢 🍇🍉
  ☣️️ ❗️ 🐷🐚☣️️T⚪️🍆 value T offset 🔢 📻 🔤ejcBuiltIn🔤
  💭 ...
🍉
```

Nonetheless, these methods cannot be used by default as they are very dangerous
when misused. You might have noted that the method and initializer shown in the
above example use the attribute ☣️️.

The ☣️️ attribute marks these functions as unsafe. You can only use unsafe
functions within an unsafe block or within another unsafe function or you will
get a compiler error.

```syntax
$unsafe-block$-> ☣️️ $block$
```

So, for instance, to allocate a memory block of 10 bytes we can write this code:

```
☣️ 🍇
  🆕🧠 10❗
🍉
```

If we hadn’t wrapped the initialization expression into an unsafe block
we would get a compiler error.

Note that the unsafe block does not create its own variable scope. It is just
syntactic sugar and does not affect flow control. We therefore recommend to keep
all code that does not need to go into an unsafe block outside.

>!H You should take that biohazard sign quite seriously. Messing with memory
>!H can go terribly wrong.
