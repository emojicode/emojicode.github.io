# Enumerations

Enumerations are a special kind of value type that represent a set of options
from which one can be chosen.

## Defining an Enumeration

The syntax to define an enumeration is:

```syntax
$enum$-> 🦃 $type-identifier$ $type-body$
$enum-value$-> 🔘 $emoji-id$
```

For example:

```
🦃 ⏰ 🍇
  🔘🥓
  🔘🥞
  🔘🥐
🍉
```

In this example, an enumeration that named ⏰ is defined which offers the values
🥓, 🥞 and 🥐.

## Instantiating an Enumeration

Every enumeration automatically provides intializers for all its options, named
after the option the instance will represent. Like any value type, enumerations
are instantiated with 🆕:

```
⏰🥞❗️
```

Enumerations cannot have custom initializers.

## Methods

In the manner of any other value types, enumerations can have methods. The
following examples shows an enumeration which provides a method that returns
a textual description of the chosen value:

```
🦃 ⏰ 🍇
  🔘🥓
  🔘🥞
  🔘🥐

  ❗️ 🔡 ➡️ 🔡 🍇
    ↪️ 👇 🙌 🆕⏰🥐 ❗️ 🍇
      ↩️ 🔤Croissant🔤
    🍉
    ↪️ 👇 🙌 🆕⏰🥞 ❗️ 🍇
      ↩️ 🔤Pancakes🔤
    🍉
    ↪️ 👇 🙌 🆕⏰🥓 ❗️ 🍇
      ↩️ 🔤Bacon🔤
    🍉
    ↩️ 🔤🔤
  🍉
🍉
```

## Comparing Enums

🙌 can be used to compare whether two enum instances are equal:

```
🆕⏰🥓❗️ ➡️ a
🆕⏰🥓❗️ ➡️ b
↪️ a 🙌 b 🍇
  😀 🔤Equal🔤❗️
🍉
```
