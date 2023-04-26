# README

Rehype plugin that unwraps leading and trailing spaces from inline nodes



## Features

- unwraps leading and trailing spaces from inline nodes
- inline nodes currently used: `<em>`, `<strong>`, `<a>`



## Example

```js
import { unified, rehypeParse, rehypeStringify } from "./deps.ts";
import rehypeUnwrapSpaces from "./src/main.ts";

const result = (await unified()
  .use(rehypeParse, { fragment: true })
  .use(rehypeUnwrapSpaces)
  .use(rehypeStringify)
  .process(`<strong>foo </strong>bar`))
  .toString();
console.log(result);
```

Before

```html
<strong>foo </strong>bar
```

After

```html
<strong>foo</strong> bar
```
