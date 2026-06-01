export default function getElementsByStyle(element, property, value) {
  let res = [];

  function traverse(node) {
    if (node == null) return;
    const compStyles = window.getComputedStyle(node);
    if (compStyles.getPropertyValue(property) == value) {
      res.push(node);
    }
    for (const child of node.children) {
      traverse(child);
    }
  }

  for (const child of element.children) {
    traverse(child);
  }

  return res;
}
