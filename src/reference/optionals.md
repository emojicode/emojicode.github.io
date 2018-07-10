# Optionals

Often when designing software applicatins the programmer has to deal with the
possible absence of a value. To properly model the absence of values, the
concept of optionals was developed.

An optional is a type that either does not or does contain a value.

You can declare an optional type with 🍬 followed by the type the optional
can contain:

```
🖍🆕 building_age 🍬🔢 👴 The age of old buildings is often not known exactly.
🖍🆕 pet_name 🍬🔡 👴 Some pets have no name.
```

In the above example, we have declared two variables, both of which are
optionals. At the moment, they do not contain a value. Note, that when you
declare a variable of an optional type, it is automatically initialized but does
not contain a value.

Let us populate these variables with values:

```
20 ➡️ 🖍building_age
🔤Albert🔤 ➡️ 🖍pet_name
```

Both optionals now do contain a value. We’ll see how to retrieve those values
in a moment. Let us first have a look at how to make these optionals represent
no value again.

## No Value

We established before that optionals sometimes will contain no value. Obviously,
a way to express “no value” in code is also required. This is exactly what
the No Value expression does.

```syntax
$no-value$-> 🤷‍♂️ | 🤷‍♀️ | 🤷‍
```

The No Value expression can only be used when either an optional value is
expected or when comparing an optional as we will see below.

Let’s look at an example of the first use. In this example, we
assign the variable `pet_name` to No Value.

```
🤷‍♂️ ➡️ 🖍pet_name
```

After this statement the optional does not have a value.

We can, of course, return no value from a method whose return type is an
optional with the No Value expression:

```
↩️ 🤷‍♀️
```

## Comparing against No Value

We have seen how to create an optional with and without a value. Now, we
want to determine whether an optional contains a value or not. We can achieve
this by simply comparing the optional against 🤷‍ with the compare operator 🙌.
For example:

```
↪️ pet_name 🙌 🤷‍♀️ 🍇
  😀 🔤The pet has no name🔤❗️
🍉
```

## 🍺 Unwrapping

Now that we know how to determine whether an optional actually contains a value,
we’ll look at how we can unwrap an optional. Unwrapping means nothing else
than extracting the value contained in an optional.

To extract the value from `pet_name` from the example above and print it we
use 🍺:

```
😀 🍺 pet_name❗️
```

```syntax
$unwrap$-> 🍺 $expression$
```

This will work fine if `petName` actually contains a pet’s name. If it does
not contain a value though, our program will panic.

Since you will normally want to avoid sudden errors, you should only unwrap
an optional with 🍺 if you are sure that it does contain a value.

## Condition Assignment

As we discussed, unwrapping an optional is not safe without checking it first.
Because this is a common operation, Emojicode offers a structure called the
condition assignment.

Take a look at this example:

```
↪️ pet_name ➡️ the_pet_name  🍇
  😀 🍺 the_pet_name❗️
🍉
```

The code above will assign the value of the optional `pet_name` to
`the_pet_name` — provided it has a value — and the associated ↪️ block will be
executed. If the optional does not have a value the ↪️ behaves as if the
condition evaluated to false.
