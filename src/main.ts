import { rehypeSplitWhitespace, rehypeUnwrap } from "../deps.ts";

/**
 * Unwraps leading and trailing space from inline nodes
 * into new text node in closest ancestor where branch is not first or last child
 */
const rehypeUnwrapSpaces = [rehypeSplitWhitespace, [rehypeUnwrap, {
  childTest: (node) => node.type == "text" && node.value.match(/^\s+$/),
  parentTest: (node) => ["em", "a", "strong"].includes(node?.tagName),
}]];

export default rehypeUnwrapSpaces;
