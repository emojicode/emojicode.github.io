# Appendix II: Package API

The package API allows to write a package whose logic can be implemented (partly
if needed) in C.

>!N Before writing a package make sure you have read the **whole** chapter.
>!N A badly written package can destabilize the Real-Time Engine and break
>!N programs.

The C API is specific to the Real-Time Engine. APIs of other Emojicode Engines
may be different.

## C Headers

To get started include the header API header of the latest Emojicode version.
You can get them from the ([GitHub repository](../download)).

	#include "EmojicodeAPI.h"

This headers defines Emojicode’s public interfaces you will use.  It also
includes most of the C standard libraries: `stdlib.h`, `stdio.h`, `stdbool.h`,
`stdint.h`, `stddef.h`. If you need to work with Strings and Lists
you must also include `EmojicodeString.h` and `EmojicodeList.h` respectively.
