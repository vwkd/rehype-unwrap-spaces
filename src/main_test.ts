import {
  assertEquals,
  rehypeParse,
  rehypeStringify,
  unified,
} from "../deps.ts";
import rehypeUnwrapSpaces from "./main.ts";

const pipeline = unified()
  .use(rehypeParse, { fragment: true })
  .use(rehypeUnwrapSpaces)
  .use(rehypeStringify);

Deno.test("one strong, leading", async () => {
  const input = "foo<strong> bar</strong>";
  const expected = "foo <strong>bar</strong>";

  const actual = (await pipeline
    .process(input)).toString();

  assertEquals(actual, expected);
});

Deno.test("one strong, trailing", async () => {
  const input = "<strong>foo </strong>bar";
  const expected = "<strong>foo</strong> bar";

  const actual = (await pipeline
    .process(input)).toString();

  assertEquals(actual, expected);
});

Deno.test("one strong, leading and trailing", async () => {
  const input = "foo<strong> bar </strong>baz";
  const expected = "foo <strong>bar</strong> baz";

  const actual = (await pipeline
    .process(input)).toString();

  assertEquals(actual, expected);
});

Deno.test("two nested strong, leading inner", async () => {
  const input = "foo<strong><strong> bar</strong></strong>";
  const expected = "foo <strong><strong>bar</strong></strong>";

  const actual = (await pipeline
    .process(input)).toString();

  assertEquals(actual, expected);
});

Deno.test("two nested strong, trailing inner", async () => {
  const input = "<strong><strong>foo </strong></strong>bar";
  const expected = "<strong><strong>foo</strong></strong> bar";

  const actual = (await pipeline
    .process(input)).toString();

  assertEquals(actual, expected);
});

Deno.test("two nested strong, leading and trailing inner", async () => {
  const input = "foo<strong><strong> bar </strong></strong>baz";
  const expected = "foo <strong><strong>bar</strong></strong> baz";

  const actual = (await pipeline
    .process(input)).toString();

  assertEquals(actual, expected);
});

Deno.test("two nested strong, leading outer", async () => {
  const input = "foo<strong> <strong>bar</strong></strong>";
  const expected = "foo <strong><strong>bar</strong></strong>";

  const actual = (await pipeline
    .process(input)).toString();

  assertEquals(actual, expected);
});

Deno.test("two nested strong, trailing outer", async () => {
  const input = "<strong><strong>foo</strong> </strong>bar";
  const expected = "<strong><strong>foo</strong></strong> bar";

  const actual = (await pipeline
    .process(input)).toString();

  assertEquals(actual, expected);
});

Deno.test("two nested strong, leading and trailing outer", async () => {
  const input = "foo<strong> <strong>bar</strong> </strong>baz";
  const expected = "foo <strong><strong>bar</strong></strong> baz";

  const actual = (await pipeline
    .process(input)).toString();

  assertEquals(actual, expected);
});

Deno.test("two chained strong, both leading", async () => {
  const input = "foo<strong> bar</strong><strong> baz</strong>";
  const expected = "foo <strong>bar</strong> <strong>baz</strong>";

  const actual = (await pipeline
    .process(input)).toString();

  assertEquals(actual, expected);
});

Deno.test("two chained strong, both trailing", async () => {
  const input = "<strong>foo </strong><strong>bar </strong>baz";
  const expected = "<strong>foo</strong> <strong>bar</strong> baz";

  const actual = (await pipeline
    .process(input)).toString();

  assertEquals(actual, expected);
});

Deno.test("two chained strong, both leading and trailing", async () => {
  const input = "foo<strong> bar </strong><strong> baz </strong>buz";
  const expected = "foo <strong>bar</strong>  <strong>baz</strong> buz";

  const actual = (await pipeline
    .process(input)).toString();

  assertEquals(actual, expected);
});

Deno.test("one a, leading", async () => {
  const input = "foo<a> bar</a>";
  const expected = "foo <a>bar</a>";

  const actual = (await pipeline
    .process(input)).toString();

  assertEquals(actual, expected);
});

Deno.test("two chained a, first trailing", async () => {
  const input = "<a>foo </a><a>bar</a>";
  const expected = "<a>foo</a> <a>bar</a>";

  const actual = (await pipeline
    .process(input)).toString();

  assertEquals(actual, expected);
});

Deno.test("one em in a, leading outer", async () => {
  const input = "<a> <em>foo</em></a>";
  const expected = " <a><em>foo</em></a>";

  const actual = (await pipeline
    .process(input)).toString();

  assertEquals(actual, expected);
});
