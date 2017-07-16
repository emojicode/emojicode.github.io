'use strict';

var app = new Vue({
  el: '#features',
  data: {
    features: [{
      title: 'Object-orientation',
      text: 'Emojicode features powerful object-orientation including inheritance, overriding, final methods and classes.',
      example: '\uD83D\uDC07 \uD83D\uDE4B \uD83C\uDF47\n  \uD83C\uDF70 name \uD83D\uDD21\n\n  \uD83D\uDC08 \uD83C\uDD95 \uD83C\uDF7C name \uD83D\uDD21 \uD83C\uDF47\uD83C\uDF49\n\n  \uD83D\uDC16 \uD83C\uDF15 \uD83C\uDF47\n    \uD83D\uDE00 \uD83C\uDF6A\uD83D\uDD24Good night, \uD83D\uDD24 name\uD83C\uDF6A\n  \uD83C\uDF49\n\n  \uD83D\uDC16 \u2600\uFE0F \uD83C\uDF47\n    \uD83D\uDE00 \uD83C\uDF6A\uD83D\uDD24Howdy, \uD83D\uDD24 name\uD83C\uDF6A\n  \uD83C\uDF49\n\uD83C\uDF49\n\n\uD83C\uDFC1 \uD83C\uDF47\n  \uD83C\uDF66 greeter \uD83D\uDD37\uD83D\uDE4B\uD83C\uDD95 \uD83D\uDD24Spencer\uD83D\uDD24\n  \uD83C\uDF15 greeter  \uD83D\uDC74 Prints \u201CGood night, Spencer\u201D to the console\n\uD83C\uDF49\n'
    }, {
      title: 'Generics & Protocols',
      text: 'Generics and protocols in conjunction allow you to write incredibly generic code that is easy to reuse and build upon. Take a look at this example from s package.',
      example: '\uD83C\uDF2E\n  A type conforming to this protocol provides a method \uD83D\uDE1B to determine whether\n  one of its instance is equal to an instance of type T.\n\uD83C\uDF2E\n\uD83C\uDF0D \uD83D\uDC0A \uD83D\uDE1B\uD83D\uDC1AT\u26AA\uFE0F \uD83C\uDF47\n  \uD83C\uDF2E Whether this value and *other* are equal. \uD83C\uDF2E\n  \uD83D\uDC16 \uD83D\uDE1B other T \u27A1\uFE0F \uD83D\uDC4C\n\uD83C\uDF49\n\n\uD83D\uDC0B \uD83C\uDF68 \uD83C\uDF47\n  \uD83C\uDF2E Tests whether this array and `other` are equal. \uD83C\uDF2E\n  \uD83D\uDC16 \uD83D\uDE1B \uD83D\uDC1AA\uD83D\uDE1B\uD83D\uDC1AElement other \uD83C\uDF68\uD83D\uDC1AA \u27A1\uFE0F \uD83D\uDC4C \uD83C\uDF47\n    \uD83C\uDF4A \u274E \uD83D\uDE1B \uD83D\uDC14 \uD83D\uDC15 \uD83D\uDC14 other \uD83C\uDF47\n      \uD83C\uDF4E \uD83D\uDC4E\n    \uD83C\uDF49\n\n    \uD83D\uDD02 i \u23E9 0 \uD83D\uDC14 \uD83D\uDC15 \uD83C\uDF47\n      \uD83C\uDF4A \u274E \uD83D\uDE1B \uD83C\uDF7A\uD83D\uDC3D other i \uD83C\uDF7A \uD83D\uDC3D \uD83D\uDC15 i \uD83C\uDF47\n        \uD83C\uDF4E \uD83D\uDC4E\n      \uD83C\uDF49\n    \uD83C\uDF49\n    \uD83C\uDF4E \uD83D\uDC4D\n  \uD83C\uDF49\n\uD83C\uDF49'
    }, {
      title: 'Closures',
      text: 'Closure allow you to quickly create function that capture the current context. The example on the right creates 10 threads that withdraw money from a bank account that is protected by a mutex.',
      example: '\uD83C\uDFC1 \uD83C\uDF47\n  \uD83C\uDF66 threads \uD83D\uDD37\uD83C\uDF68\uD83D\uDC1A\uD83D\uDC88\uD83D\uDC38\n\n  \uD83C\uDF66 account \uD83D\uDD37\uD83C\uDFE6\uD83C\uDD95\n  \uD83C\uDF66 mutex \uD83D\uDD37\uD83D\uDD10\uD83C\uDD95\n\n  \uD83D\uDD02 i \u23E9 0 10 \uD83C\uDF47\n    \uD83D\uDC3B threads \uD83D\uDD37\uD83D\uDC88\uD83C\uDD95 \uD83C\uDF47\n      \uD83D\uDD02 j \u23E9 0 5 \uD83C\uDF47\n        \uD83D\uDD12 mutex\n        \uD83C\uDF4A \u27A1\uFE0F \uD83D\uDCB6 account 10 \uD83C\uDF47\n          \uD83D\uDE00 \uD83D\uDD24Money, money, money \u2013 Must be funny\uD83D\uDD24\n          \uD83D\uDCB8 account 10\n        \uD83C\uDF49\n        \uD83D\uDD13 mutex\n      \uD83C\uDF49\n    \uD83C\uDF49\n  \uD83C\uDF49\n\n  \uD83D\uDD02 thread threads \uD83C\uDF47\n    \uD83D\uDEC2 thread\n  \uD83C\uDF49\n\n  \uD83D\uDE00 \uD83D\uDD21 \uD83D\uDCB6 account 10 \uD83D\uDC74 Print the balance\n\uD83C\uDF49\n'
    }, {
      title: 'Fast & Portable',
      text: 'Here you can see an recursive implementation to solve the Towers of Hanoi with 20 disks. This basic, naive implementation, for instance, easily beats out Java and Python. Oh, and Emojicode is portable too.',
      example: '\uD83D\uDD4A \uD83C\uDFE4 \uD83C\uDF47\n  \uD83D\uDC07\uD83D\uDC16 \uD83D\uDC48 n \uD83D\uDE82 origin \uD83D\uDD21 destination \uD83D\uDD21 temp \uD83D\uDD21 \uD83C\uDF47\n    \uD83C\uDF66 thisMove \uD83C\uDF6A \uD83D\uDD24Move disk \uD83D\uDD24 \uD83D\uDD21 n 10 \uD83D\uDD24 from \uD83D\uDD24 origin \uD83D\uDD24 to \uD83D\uDD24 destination \uD83C\uDF6A\n\n    \uD83C\uDF4A \uD83D\uDE1B n 1 \uD83C\uDF47\n      \uD83D\uDE00 thisMove\n    \uD83C\uDF49\n    \uD83C\uDF53 \uD83C\uDF47\n      \uD83C\uDF69 \uD83D\uDC48 \uD83C\uDFE4\u2796 n 1 origin temp destination\n      \uD83D\uDE00 thisMove\n      \uD83C\uDF69 \uD83D\uDC48 \uD83C\uDFE4\u2796 n 1 temp destination origin\n    \uD83C\uDF49\n  \uD83C\uDF49\n\uD83C\uDF49\n\n\uD83C\uDFC1 \uD83C\uDF47\n  \uD83C\uDF69 \uD83D\uDC48 \uD83C\uDFE4 20 \uD83D\uDD24A\uD83D\uDD24 \uD83D\uDD24B\uD83D\uDD24 \uD83D\uDD24C\uD83D\uDD24\n\uD83C\uDF49'
    }, {
      title: 'Powerful',
      text: 'Emojicode comes with a few packages that allow you to do all the really fun stuff, like sockets communication. And, of course, you can write a package yourself and expand Emojicode’s capabilities.',
      example: '\uD83D\uDCE6 sockets \uD83D\uDD34\n\n\uD83D\uDC74 Simple echo server listening on port 8728\n\uD83C\uDFC1 \uD83C\uDF47\n  \uD83C\uDF66 server \uD83C\uDF7A \uD83D\uDD37\uD83C\uDFC4\uD83C\uDD95 8728\n\n  \uD83D\uDD01 \uD83D\uDC4D \uD83C\uDF47\n    \uD83C\uDF66 clientSocket \uD83C\uDF7A \uD83D\uDE4B server\n    \uD83D\uDD01 \uD83D\uDC4D \uD83C\uDF47\n      \uD83C\uDF66 readData \uD83D\uDC42 clientSocket 50\n      \uD83C\uDF4A\uD83C\uDF66 data readData \uD83C\uDF47\n        \uD83D\uDC74 We\u2019ve read 50 bytes and send them back\n        \uD83D\uDCAC clientSocket data\n      \uD83C\uDF49\n    \uD83C\uDF49\n  \uD83C\uDF49\n\uD83C\uDF49'
    }, {
      title: 'Optionals',
      text: 'Optionals (and more) make Emojicode extremly safe. Programmer safety is the highest precept in Emojicode!',
      example: '\uD83C\uDF2E This enum contains various breakfast dishes. \uD83C\uDF2E\n\uD83E\uDD83 \u23F0 \uD83C\uDF47\n  \uD83D\uDD18\uD83E\uDD53\n  \uD83D\uDD18\uD83E\uDD50\n\n  \uD83D\uDC16 \uD83D\uDD21 \u27A1\uFE0F \uD83D\uDD21 \uD83C\uDF47\n    \uD83C\uDF4A \uD83D\uDE1B \uD83D\uDC15 \uD83D\uDD37\u23F0\uD83E\uDD50 \uD83C\uDF47\n      \uD83C\uDF4E \uD83D\uDD24croissant\uD83D\uDD24\n    \uD83C\uDF49\n    \uD83C\uDF4A \uD83D\uDE1B \uD83D\uDC15 \uD83D\uDD37\u23F0\uD83E\uDD53 \uD83C\uDF47\n      \uD83C\uDF4E \uD83D\uDD24bacon\uD83D\uDD24\n    \uD83C\uDF49\n    \uD83C\uDF4E \uD83D\uDD24\uD83D\uDD24\n  \uD83C\uDF49\n\uD83C\uDF49\n\n\uD83C\uDFC1 \uD83C\uDF47\n  \uD83C\uDF70 anything \u26AA\uFE0F\n  \uD83C\uDF6E anything \uD83D\uDD37\u23F0\uD83E\uDD50\n\n  \uD83D\uDC74 Cast anything to a \u23F0, the return is an optional\n  \uD83C\uDF4A\uD83C\uDF66 breakfast \uD83D\uDD32 anything \u23F0 \uD83C\uDF47\n    \uD83D\uDC74 breakfast does contain a value\n    \uD83D\uDE00 \uD83C\uDF6A\uD83D\uDD24You ordered \uD83D\uDD24 \uD83D\uDD21breakfast\uD83C\uDF6A \uD83D\uDC74 Prints "You ordered croissant"\n  \uD83C\uDF49\n\uD83C\uDF49\n'
    }],
    activeFeature: null
  },
  created: function created() {
    this.activeFeature = this.features[0];
  }
});