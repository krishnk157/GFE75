export default function getElementsByClassName(element, classNames) {
  if (!element || classNames == "") return [];

  const res = [];
  const classList = classNames.trim().split(/\s+/);

  function traverse(node) {
    if (node == null) return;
    if (classList.every((cl) => node.classList.contains(cl))) {
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
