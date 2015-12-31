# Memory Management

All objects created are placed on the heap. The heap is a memory area that is allocated when the Real-Time Engine starts up. When the heap becomes full a garbage collection is performed. The garbage collection finds unused objects and deletes them to free up space for new objects. 

The variable values, these are primitives and object references, are stored on the stack. The stack is optimized to quickly allocate space for a method call and its variables. Instance variables, however, are integrated in the object. Additionally the Real-Time Engine will allocate memory for the String Pool and for your code, which is loaded into memory on startup.


## Garbage Collection

Emojicode automatically manages the heap and removes objects you no longer have access too. An object counts as inaccessible if you do not have any reference to it.

The Real-Time Engine manages the heap using [C.J. Cheney’s algorithm](https://en.wikipedia.org/wiki/Cheney%27s_algorithm).
