const app = new Vue({
  el: '#features',
  data: {
    features: [
      {
        title: 'Object-orientation',
        text: 'Emojicode features powerful object-orientation including inheritance, overriding, final methods and classes.',
        example: `🐇 🙋 🍇
  🍰 name 🔡

  🐈 🆕 🍼 name 🔡 🍇🍉

  🐖 🌕 🍇
    😀 🍪🔤Good night, 🔤 name🍪
  🍉

  🐖 ☀️ 🍇
    😀 🍪🔤Howdy, 🔤 name🍪
  🍉
🍉

🏁 🍇
  🍦 greeter 🔷🙋🆕 🔤Spencer🔤
  🌕 greeter  👴 Prints “Good night, Spencer” to the console
🍉
`,
      },
      {
        title: 'Generics & Protocols',
        text: 'Generics and protocols in conjunction allow you to write incredibly generic code that is easy to reuse and build upon. Take a look at this example from s package.',
        example: `🌮
  A type conforming to this protocol provides a method 😛 to determine whether
  one of its instance is equal to an instance of type T.
🌮
🌍 🐊 😛🐚T⚪️ 🍇
  🌮 Whether this value and *other* are equal. 🌮
  🐖 😛 other T ➡️ 👌
🍉

🐋 🍨 🍇
  🌮 Tests whether this array and \`other\` are equal. 🌮
  🐖 😛 🐚A😛🐚Element other 🍨🐚A ➡️ 👌 🍇
    🍊 ❎ 😛 🐔 🐕 🐔 other 🍇
      🍎 👎
    🍉

    🔂 i ⏩ 0 🐔 🐕 🍇
      🍊 ❎ 😛 🍺🐽 other i 🍺 🐽 🐕 i 🍇
        🍎 👎
      🍉
    🍉
    🍎 👍
  🍉
🍉`,
      },
      {
        title: 'Closures',
        text: 'Closure allow you to quickly create function that capture the current context. The example on the right creates 10 threads that withdraw money from a bank account that is protected by a mutex.',
        example: `🏁 🍇
  🍦 threads 🔷🍨🐚💈🐸

  🍦 account 🔷🏦🆕
  🍦 mutex 🔷🔐🆕

  🔂 i ⏩ 0 10 🍇
    🐻 threads 🔷💈🆕 🍇
      🔂 j ⏩ 0 5 🍇
        🔒 mutex
        🍊 ➡️ 💶 account 10 🍇
          😀 🔤Money, money, money – Must be funny🔤
          💸 account 10
        🍉
        🔓 mutex
      🍉
    🍉
  🍉

  🔂 thread threads 🍇
    🛂 thread
  🍉

  😀 🔡 💶 account 10 👴 Print the balance
🍉
`,
      },
      {
        title: 'Fast & Portable',
        text: 'Here you can see an recursive implementation to solve the Towers of Hanoi with 20 disks. This basic, naive implementation, for instance, easily beats out Java and Python. Oh, and Emojicode is portable too.',
        example: `🕊 🏤 🍇
  🐇🐖 👈 n 🔢 origin 🔡 destination 🔡 temp 🔡 🍇
    🍦 thisMove 🍪 🔤Move disk 🔤 🔡 n 10 🔤 from 🔤 origin 🔤 to 🔤 destination 🍪

    🍊 😛 n 1 🍇
      😀 thisMove
    🍉
    🍓 🍇
      🍩 👈 🏤➖ n 1 origin temp destination
      😀 thisMove
      🍩 👈 🏤➖ n 1 temp destination origin
    🍉
  🍉
🍉

🏁 🍇
  🍩 👈 🏤 20 🔤A🔤 🔤B🔤 🔤C🔤
🍉`,
      },
      {
        title: 'Powerful',
        text: 'Emojicode comes with a few packages that allow you to do all the really fun stuff, like sockets communication. And, of course, you can write a package yourself and expand Emojicode’s capabilities.',
        example: `📦 sockets 🔴

👴 Simple echo server listening on port 8728
🏁 🍇
  🍦 server 🚇 🔷🏄🆕 8728

  🔁 👍 🍇
    🍦 clientSocket 🍺 🙋 server
    🔁 👍 🍇
      🍦 readData 👂 clientSocket 50
      🍊🍦 data readData 🍇
        👴 We’ve read 50 bytes and send them back
        💬 clientSocket data
      🍉
    🍉
  🍉
🍉`,
      },
      {
        title: 'Optionals',
        text: 'Optionals (and more) make Emojicode extremly safe. Programmer safety is the highest precept in Emojicode!',
        example: `🌮 This enum contains various breakfast dishes. 🌮
🦃 ⏰ 🍇
  🔘🥓
  🔘🥐

  🐖 🔡 ➡️ 🔡 🍇
    🍊 😛 🐕 🔷⏰🥐 🍇
      🍎 🔤croissant🔤
    🍉
    🍊 😛 🐕 🔷⏰🥓 🍇
      🍎 🔤bacon🔤
    🍉
    🍎 🔤🔤
  🍉
🍉

🏁 🍇
  🍰 anything ⚪️
  🍮 anything 🔷⏰🥐

  👴 Cast anything to a ⏰, the return is an optional
  🍊🍦 breakfast 🔲 anything ⏰ 🍇
    👴 breakfast does contain a value
    😀 🍪🔤You ordered 🔤 🔡breakfast🍪 👴 Prints "You ordered croissant"
  🍉
🍉
`,
      },
    ],
    activeFeature: null,
  },
  created() {
    this.activeFeature = this.features[0];
  },
});
