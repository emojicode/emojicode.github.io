# Memory Management

Here’s the good news about memory management in Emojicode: Emojicode does the hard work. This chapter describes the mechanisms employed.

## Lifetime of Temporary Values

Emojicode manages memory with reference counting. This means that Emojicode maintains a count of how many references exist to every object. An object is destroyed immediately once there are no more references to it.

Consider the following example:

```
🆕🐟🆕  🔤Shawn🔤❗️
```

The above code sample creates an instance of the class 🐟. Since this object is not assigned to any variable or returned, we call it a temporary value. Temporary values are destroyed at the end of the statement in the order they were created.

Let’s have a look at this more complicated example:

```
🐇 🦍 🍇
  🆕 pet 🐟 🍇🍉
🍉

🐇 🐟 🍇
  🖍🆕 name 🔡

  🆕 🍼 name 🔡 🍇🍉
🍉

🏁 🍇
  🆕🦍🆕️ 🆕🐟🆕  🔤Shawn🔤❗️❗
🍉

```
Here we create an instance of  🦍, which we pass an instance of  🐟 to.   🦍 does not anything with the fish instance (like assigning it to an instance variable). So both the fish instance and the gorilla instance will be destroyed at the end of the statement. Because the fish instance was created first, it will be destroyed first.

## Deinitializers

Emojicode allows you to define a deinitializer for your classes. A deinitializer is a function that is executed right before a class instance is destroyed. It’s syntax is this:

```syntax
$deinitializer$-> ♻️ $block$
```

We can define a deinitializer for the  🦍 and  🐟 class, to prove the behavior we have talked about before:

```
🐇 🦍 🍇
  🆕 pet 🐟 🍇🍉

  ♻️ 🍇
    😀 🔤Gorilla says Bye-Bye🔤❗️
  🍉
🍉

🐇 🐟 🍇
  🖍🆕 name 🔡

  🆕 🍼 name 🔡 🍇🍉

  ♻️ 🍇
    😀 🔤Fish deinit!🔤❗️
  🍉
🍉

🏁 🍇
  🆕🦍🆕️ 🆕🐟🆕  🔤Shawn🔤❗️❗
🍉
```

As expected, running the above code results in:

```
Fish deinit!
Gorilla says Bye-Bye
```

You can only specify a deinitalizers for classes.

>!N The deinitializer of a class is not called when initialization is
>!N aborted by raising an error.

## Lifetime in General

We will know adjust our program and make the gorilla actually store its pet:

```
🐇 🦍 🍇
  🖍🆕 pet 🐟

  🆕 🍼 pet 🐟 🍇🍉

  ♻️ 🍇
    😀 🔤Gorilla says Bye-Bye🔤❗️
  🍉
🍉
```

If we kept the rest of the program the same, the output will still change:

```
Gorilla says Bye-Bye
Fish deinit!
```

That is because the gorilla now maintains a reference to the fish. Thus, the compiler cannot write code to immediately destroy the fish at the end of the statement. But the gorilla can be destroyed as before. But once the gorilla is gone, also our reference to the fish is gone, so the fish is destroyed then.

The same is true when working with value types, like in the following example.

```
🕊 💳 🍇
  🖍🆕 fish 🐟

  🆕 🍼 fish 🐟 🍇🍉
🍉

🐇 🐟 🍇
  🖍🆕 name 🔡

  🆕 🍼 name 🔡 🍇🍉

  ♻️ 🍇
    😀 🔤Fish deinit!🔤❗️
  🍉
🍉

🏁 🍇
  🆕💳🆕️ 🆕🐟🆕  🔤Shawn🔤❗️❗
🍉
```

We can, however, update our program slightly to see a change:

```
🏁 🍇
  🆕💳🆕️ 🆕🐟🆕  🔤Shawn🔤❗️❗ ➡️ card
  😀 🔤💛🔤❗️
🍉
```

Running this produces:

```
💛
Fish deinit!
```

You can see that the 💳 is not immediately destroyed because we copied it into a variable. The variable is destroyed at the end of the scope, so is the  💳 in it. Hence we first see 💛 and then `Fish deinit!`.
