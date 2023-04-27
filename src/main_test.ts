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
  const input = "foo<strong> bar</strong>baz";
  const expected = "foo <strong>bar</strong>baz";

  const actual = (await pipeline
    .process(input)).toString();

  assertEquals(actual, expected);
});

Deno.test("one strong, trailing", async () => {
  const input = "foo<strong>bar </strong>baz";
  const expected = "foo<strong>bar</strong> baz";

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

Deno.test("two strong, first leading", async () => {
  const input = "foo<strong> bar</strong><strong>baz</strong>buz";
  const expected = "foo <strong>bar</strong><strong>baz</strong>buz";

  const actual = (await pipeline
    .process(input)).toString();

  assertEquals(actual, expected);
});

Deno.test("two strong, first trailing", async () => {
  const input = "foo<strong>bar </strong><strong>baz</strong>buz";
  const expected = "foo<strong>bar</strong> <strong>baz</strong>buz";

  const actual = (await pipeline
    .process(input)).toString();

  assertEquals(actual, expected);
});

Deno.test("two strong, first leading and trailing", async () => {
  const input = "foo<strong> bar </strong><strong>baz</strong>buz";
  const expected = "foo <strong>bar</strong> <strong>baz</strong>buz";

  const actual = (await pipeline
    .process(input)).toString();

  assertEquals(actual, expected);
});

Deno.test("two strong, second leading", async () => {
  const input = "foo<strong>bar</strong><strong> baz</strong>buz";
  const expected = "foo<strong>bar</strong> <strong>baz</strong>buz";

  const actual = (await pipeline
    .process(input)).toString();

  assertEquals(actual, expected);
});

Deno.test("two strong, second trailing", async () => {
  const input = "foo<strong>bar</strong><strong>baz </strong>buz";
  const expected = "foo<strong>bar</strong><strong>baz</strong> buz";

  const actual = (await pipeline
    .process(input)).toString();

  assertEquals(actual, expected);
});

Deno.test("two strong, second leading and trailing", async () => {
  const input = "foo<strong>bar</strong><strong> baz </strong>buz";
  const expected = "foo<strong>bar</strong> <strong>baz</strong> buz";

  const actual = (await pipeline
    .process(input)).toString();

  assertEquals(actual, expected);
});

Deno.test("two strong, both leading", async () => {
  const input = "foo<strong> bar</strong><strong> baz</strong>buz";
  const expected = "foo <strong>bar</strong> <strong>baz</strong>buz";

  const actual = (await pipeline
    .process(input)).toString();

  assertEquals(actual, expected);
});

Deno.test("two strong, both trailing", async () => {
  const input = "foo<strong>bar </strong><strong>baz </strong>buz";
  const expected = "foo<strong>bar</strong> <strong>baz</strong> buz";

  const actual = (await pipeline
    .process(input)).toString();

  assertEquals(actual, expected);
});

Deno.test("two strong, first leading second trailing", async () => {
  const input = "foo<strong> bar</strong><strong>baz </strong>buz";
  const expected = "foo <strong>bar</strong><strong>baz</strong> buz";

  const actual = (await pipeline
    .process(input)).toString();

  assertEquals(actual, expected);
});

Deno.test("two strong, first trailing second leading", async () => {
  const input = "foo<strong>bar </strong><strong> baz</strong>buz";
  const expected = "foo<strong>bar</strong>  <strong>baz</strong>buz";

  const actual = (await pipeline
    .process(input)).toString();

  assertEquals(actual, expected);
});

Deno.test("two strong, both leading and trailing", async () => {
  const input = "foo<strong> bar </strong><strong> baz </strong>buz";
  const expected = "foo <strong>bar</strong>  <strong>baz</strong> buz";

  const actual = (await pipeline
    .process(input)).toString();

  assertEquals(actual, expected);
});

Deno.test("two nested strong, inner leading", async () => {
  const input = "foo<strong><strong> bar</strong></strong>baz";
  const expected = "foo <strong><strong>bar</strong></strong>baz";

  const actual = (await pipeline
    .process(input)).toString();

  assertEquals(actual, expected);
});

Deno.test("two nested strong, inner trailing", async () => {
  const input = "foo<strong><strong>bar </strong></strong>baz";
  const expected = "foo<strong><strong>bar</strong></strong> baz";

  const actual = (await pipeline
    .process(input)).toString();

  assertEquals(actual, expected);
});

Deno.test("two nested strong, inner leading and trailing", async () => {
  const input = "foo<strong><strong> bar </strong></strong>baz";
  const expected = "foo <strong><strong>bar</strong></strong> baz";

  const actual = (await pipeline
    .process(input)).toString();

  assertEquals(actual, expected);
});

Deno.test("two nested strong, outer leading", async () => {
  const input = "foo<strong> <strong>bar</strong></strong>baz";
  const expected = "foo <strong><strong>bar</strong></strong>baz";

  const actual = (await pipeline
    .process(input)).toString();

  assertEquals(actual, expected);
});

Deno.test("two nested strong, outer trailing", async () => {
  const input = "foo<strong><strong>bar</strong> </strong>baz";
  const expected = "foo<strong><strong>bar</strong></strong> baz";

  const actual = (await pipeline
    .process(input)).toString();

  assertEquals(actual, expected);
});

Deno.test("two nested strong, outer leading and trailing", async () => {
  const input = "foo<strong> <strong>bar</strong> </strong>baz";
  const expected = "foo <strong><strong>bar</strong></strong> baz";

  const actual = (await pipeline
    .process(input)).toString();

  assertEquals(actual, expected);
});

Deno.test("two nested strong, both leading", async () => {
  const input = "foo<strong> <strong> bar</strong></strong>baz";
  const expected = "foo  <strong><strong>bar</strong></strong>baz";

  const actual = (await pipeline
    .process(input)).toString();

  assertEquals(actual, expected);
});

Deno.test("two nested strong, both trailing", async () => {
  const input = "foo<strong><strong>bar </strong> </strong>baz";
  const expected = "foo<strong><strong>bar</strong></strong>  baz";

  const actual = (await pipeline
    .process(input)).toString();

  assertEquals(actual, expected);
});

Deno.test("two nested strong, inner leading and outer trailing", async () => {
  const input = "foo<strong><strong> bar</strong> </strong>baz";
  const expected = "foo <strong><strong>bar</strong></strong> baz";

  const actual = (await pipeline
    .process(input)).toString();

  assertEquals(actual, expected);
});

Deno.test("two nested strong, inner trailing and outer leading", async () => {
  const input = "foo<strong> <strong>bar </strong></strong>baz";
  const expected = "foo <strong><strong>bar</strong></strong> baz";

  const actual = (await pipeline
    .process(input)).toString();

  assertEquals(actual, expected);
});

Deno.test("two nested strong, both leading and trailing", async () => {
  const input = "foo<strong> <strong> bar </strong> </strong>baz";
  const expected = "foo  <strong><strong>bar</strong></strong>  baz";

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

Deno.test("two a, first trailing", async () => {
  const input = "<a>foo </a><a>bar</a>";
  const expected = "<a>foo</a> <a>bar</a>";

  const actual = (await pipeline
    .process(input)).toString();

  assertEquals(actual, expected);
});

Deno.test("one em nested in a, outer leading", async () => {
  const input = "<a> <em>foo</em></a>";
  const expected = " <a><em>foo</em></a>";

  const actual = (await pipeline
    .process(input)).toString();

  assertEquals(actual, expected);
});

Deno.test("outside leading", async () => {
  const input = " <strong>foo</strong>";
  const expected = " <strong>foo</strong>";

  const actual = (await pipeline
    .process(input)).toString();

  assertEquals(actual, expected);
});

Deno.test("outside trailing", async () => {
  const input = "<strong>foo</strong> ";
  const expected = "<strong>foo</strong> ";

  const actual = (await pipeline
    .process(input)).toString();

  assertEquals(actual, expected);
});

Deno.test("outside in between", async () => {
  const input = "<strong>foo</strong> <strong>bar</strong>";
  const expected = "<strong>foo</strong> <strong>bar</strong>";

  const actual = (await pipeline
    .process(input)).toString();

  assertEquals(actual, expected);
});
