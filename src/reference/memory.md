# Memory Management

All objects created are placed on the heap. The heap is a memory area that is
allocated when the Real-Time Engine starts up. When the heap becomes full a
garbage collection is performed, which can automatically clean up the heap, by
removing inaccessible objects.

## Garbage Collection

Emojicode automatically manages the heap and disposes of objects which cannot be
accessed anymore. An object is considered inaccessible if there are no
references to it. Since the Real-Time Engine uses a Garbage Collector, circular
references are dealt with and do not cause objects to persist.

### Memory Management of the Real-Time Engine

Allocations are performed in constant time except when there is no
memory left and a garbage collection cycle must be performed. The garbage
collection is performed after Cheney’s algorithm, which is a stop the world
garbage collector and needs to hold all threads.
