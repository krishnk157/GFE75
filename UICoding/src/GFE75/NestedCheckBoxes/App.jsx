import Checkboxes from "./Checkboxes";
import { useState } from "react";

export const INDETERMINATE = "indeterminate";

const initialData = [
  {
    id: 1,
    name: "Electronics",
    checked: INDETERMINATE,
    children: [
      {
        id: 2,
        name: "Mobile phones",
        checked: true,
        children: [
          {
            id: 3,
            name: "iPhone",
            checked: false,
          },
          {
            id: 4,
            name: "Android",
            checked: false,
          },
        ],
      },
      {
        id: 5,
        name: "Laptops",
        checked: false,
        children: [
          {
            id: 6,
            name: "MacBook",
            checked: false,
          },
          {
            id: 7,
            name: "Surface Pro",
            checked: false,
          },
        ],
      },
    ],
  },
  {
    id: 8,
    name: "Books",
    checked: false,
    children: [
      {
        id: 9,
        name: "Fiction",
        checked: false,
      },
      {
        id: 10,
        name: "Non-fiction",
        checked: false,
      },
    ],
  },
  {
    id: 11,
    name: "Toys",
    checked: false,
  },
];

export default function App() {
  const [checkboxData, setCheckBoxData] = useState(initialData);

  const computeStatus = (node) => {
    if (!node?.children?.length > 0) {
      return;
    }
    const checkedCount = node.children.reduce(
      (total, item) => total + Number(item.checked === true),
      0
    );
    const unCheckedCount = node.children.reduce(
      (total, item) => total + Number(item.checked === false),
      0
    );

    if (checkedCount === node.children.length) {
      node.checked = true;
    } else if (unCheckedCount === node.children.length) {
      node.checked = false;
    } else {
      node.checked = INDETERMINATE;
    }
  };

  const traverse = (targetId, node, isDescendent, ancestorStatus) => {
    if (node.id === targetId) {
      if (node.checked) {
        node.checked = false;
      } else {
        node.checked = true;
      }
    }
    if (isDescendent) {
      node.checked = ancestorStatus;
    }
    if (node?.children?.length > 0) {
      node.children.map((child) =>
        traverse(
          targetId,
          child,
          node.id === targetId || isDescendent,
          node.checked
        )
      );
    }
    computeStatus(node);
  };

  const handleChange = (targetId) => {
    const clonedCheckBoxSate = structuredClone(checkboxData);
    clonedCheckBoxSate.map((rootNode) => {
      traverse(targetId, rootNode);
    });

    setCheckBoxData(clonedCheckBoxSate);
  };
  return (
    <div>
      <Checkboxes checkboxData={checkboxData} handleChange={handleChange} />
    </div>
  );
}
