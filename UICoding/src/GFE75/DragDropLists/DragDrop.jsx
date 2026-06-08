import { useRef, useState } from "react";

export default function DragAndDrop({ initialState }) {
  const [newItem, setNewItem] = useState("");
  const [data, setData] = useState(initialState);
  const dragItem = useRef();
  const dragContainer = useRef();
  const dragIndex = useRef();

  const handleDragStart = (e, item, container, index) => {
    dragItem.current = item;
    dragContainer.current = container;
    dragIndex.current = index;
    e.target.style.opacity = "0.5";
  };

  const handleDragEnd = (e) => {
    e.target.style.opacity = "1";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetContainer, targetIndex) => {
    const item = dragItem.current;
    const sourceContainer = dragContainer.current;
    const sourceIndex = dragIndex.current;

    //If reordering in same category
    if (sourceContainer === targetContainer) {
      setData((prev) => {
        const newData = { ...prev };
        const items = [...newData[sourceContainer]];
        const [draggedItem] = items.splice(sourceIndex, 1);
        items.splice(targetIndex, 0, draggedItem);
        newData[sourceContainer] = items;
        return newData;
      });
      return;
    }
    setData((prev) => {
      const newData = { ...prev };
      newData[sourceContainer] = newData[sourceContainer].filter(
        (i) => i !== item
      );
      newData[targetContainer] = [...newData[targetContainer], item];
      return newData;
    });
  };

  const handleDelete = (item, container) => {
    setData((prev) => {
      const newData = { ...prev };
      newData[container] = newData[container].filter((i) => i !== item);
      return newData;
    });
  };

  const handleAddItem = (e) => {
    if (e.key === "Enter") {
      setData((prev) => ({
        ...prev,
        Todo: [...prev.Todo, newItem],
      }));
      setNewItem("");
    }
  };

  return (
    <div
      className="wrapper"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        alignItems: "center",
      }}
    >
      <h1> Task Board </h1>
      <input
        type="text"
        placeholder="Add new tasks"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        onKeyDown={(e) => handleAddItem(e)}
      />
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        {Object.keys(data).map((container, index) => {
          return (
            <div
              key={index}
              onDrop={(e) => handleDrop(e, container, index)}
              onDragOver={handleDragOver}
              style={{
                background: "#f0f0f0",
                padding: "1rem",
                width: 250,
                minHeight: 300,
              }}
            >
              <h2>{container}</h2>
              {data[container].map((item, idx) => {
                return (
                  <div
                    key={idx}
                    onDragStart={(e) =>
                      handleDragStart(e, item, container, idx)
                    }
                    onDrop={(e) => handleDrop(e, container, idx)}
                    onDragEnd={handleDragEnd}
                    draggable
                    style={{
                      userSelect: "none",
                      padding: 16,
                      margin: "0 0 8px 0",
                      backgroundColor: "white",
                      cursor: "move",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    {item}{" "}
                    <button onClick={() => handleDelete(item, container)}>
                      X
                    </button>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
