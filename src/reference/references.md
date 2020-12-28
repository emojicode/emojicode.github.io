# References

The return of a method is normally immutable (which, of course, only concerns
value types). However, the
following code does work and it is very desirable that it do so:

```
🏁🍇
  🍿🍿 🔤A🔤 🍆🍆 ➡️ 🖍🆕 array
  🐻🐽array 0❗️ 🔤B🔤❗️

  😀 🐽🐽array 0❗️1❗️❗️
🍉
```

We can observe that is possible to mutate the content of `array`
by mutating the return of a method, which is, as we established before, not
allowed in general.

The above code works because 🍨’s 🐽 does not really return an `Element` but
a `✴️Element`:

```
❗️ 🐽 index 🔢 ➡️ ✴️Element
```

`✴️Element` is a reference. A reference is like a pointer to a value type and
allows you to mutate a value type in another object. Reference types can only be
declared as return types. A returned reference is only mutable if the callee is
mutable and mutating the reference indicates to the compiler that the callee
whose method returned the reference was mutated.

References cannot be copied. Assigning a reference to a variable immediately
causes the reference to be dereferenced and a copy to be stored into the
variable. The following program will therefore panic:

```!
🏁🍇
  🍿🍿 🔤A🔤 🍆🍆 ➡️ 🖍🆕 array
  🐽array 0❗️➡️ 🖍🆕 subarray
  🐻subarray 🔤B🔤❗️

  😀 🐽🐽array 0❗️1❗️❗️
🍉
```

Because references to value types could be an origin of severe memory bugs,
Emojicode emposes strict rules that make their use very safe.

## Obtaining a Reference

The only way to obtain a reference to a value type is by using the return
statement inside a method whose return type is a reference. You can only safely
return a reference to an instance variable, like in the example below:

```
🕊 🥓 🍇
🍉

🕊 🐭 🍇
  🖍🆕 bacon 🥓 ⬅️ 🆕🥓❗️

  🆕🍇🍉

  ❗️ 🍳 ➡️ ✴️🥓 🍇
    ↩️ bacon
  🍉
🍉
```

You cannot return a reference to value type in a local variable or to a
temporary object, which clearly contradicts the purpose of references.

## Forwarding References

Sometimes it is necessary to return a reference, that was returned from another
function.

This cannot be considered a safe operation, though. Consider the following
example that would lead to undefined behavior if allowed:

```!
🕊 🐭 🍇
  🖍🆕 bacon 🥓 ⬅️ 🆕🥓❗️

  🆕🍇🍉

  ❗️ 🍳 ➡️ ✴️🥓 🍇
    ↩️ bacon
  🍉

  🐇❗️ 🍄 ➡️ ✴️🥓 🍇
    ↩️ 🍳🆕🐭❗️❗️
  🍉
🍉

🏁 🍇
  🍄🕊🐭❗️
🍉
```

But there are cases where this can be done safely. In such a case you can
wrap the return statement into an unsafe block, which allows the forwarding
of mutable references. The example below is from the 🍨 implementation.

```
❗️ 🐽 index 🔢 ➡️ ✴️Element 🍇
  💭 ...
  ☣️ 🍇
    ↩️ 🐽 🧠data❗️🐚Element🍆 index✖️⚖️Element❗️
  🍉
🍉
```

🧠’s 🐽 returns a reference too.¹ Since we can be sure that the underlying
storage of a list (returned by `🧠data❗️`) will not be released until the list
itself is released, the above method is really safe.

<small>¹ Although 🧠 is a value type, 🧠🐽 always returns a mutable reference, even if the callee is not mutable. All references returned by primitive value types are always mutable.</small>
