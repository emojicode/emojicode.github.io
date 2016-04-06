# Memory Management

All objects created are placed on the heap. The heap is a memory area that is
allocated when the Real-Time Engine starts up. When the heap becomes full a
garbage collection is performed, which can automatically clean up the heap, by
removing inaccessible objects.

The variable values, these are primitives and object references, are stored on
the stack. The stack is optimized to quickly allocate space for a method call
and its variables. Instance variables, however, are integrated in the object.
Additionally the Real-Time Engine will allocate memory for the String Pool and
for your code, which is loaded into memory on startup.

## Garbage Collection

Emojicode automatically manages the heap and removes objects you no longer
have access to. An object counts as inaccessible if you do not have any
reference to it.

### Memory Management of the Real-Time Engine

Allocations are performed in constant time (`O(1)`) except the
heap is full. In this case a garbage collection cycle is performed which has
approximately a complexity of
`O(2 * number of objects + number of reached objects)`. The garbage collection
is performed after
[C. J. Cheney’s algorithm](https://en.wikipedia.org/wiki/Cheney%27s_algorithm).
If a program uses multiple threads, all threads are paused in order to
perform the garbage collection.
