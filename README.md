# deep-freeze

```js
import deepFreeze from "@fal-works/deep-freeze";

const a = deepFreeze({ b: { c: 42 } });
a.b.c = 1984; // compile error
```

*Note:* There are many implementation ideas for freezing objects deeply and probably this module does not cover all cases, so you might also want to consider using another library.
