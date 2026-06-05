export default function serializeHTML(root) {
  function traverse(node, depth = 0) {
    const indentation = "\t".repeat(depth);
    if (typeof node === "string") {
      return `${indentation}${node}`;
    }

    // Each element -> opening tag, its serialized children, and closing tag
    return [
      `${indentation}<${node.tag.toLowerCase()}>`,
      ...node.children.map((child) => traverse(child, depth + 1)),
      `${indentation}</${node.tag.toLowerCase()}>`,
    ].join("\n");
  }
  return traverse(root);
}
