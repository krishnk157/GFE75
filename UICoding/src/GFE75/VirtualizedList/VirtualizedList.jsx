import { useState } from "react";

export default function VirtualizedList({
  list,
  height,
  width,
  itemHeight,
  overscan = 2,
}) {
  const visibleCount = Math.floor(height / itemHeight);
  const [indices, setIndices] = useState([
    0,
    Math.min(list.length - 1, visibleCount + overscan),
  ]);

  const handleScroll = (e) => {
    const { scrollTop } = e.target;

    const startIndex = Math.floor(scrollTop / itemHeight);

    const overscannedStart = Math.max(0, startIndex - overscan);
    const overscannedEnd = Math.min(
      list.length - 1,
      startIndex + visibleCount + overscan
    );

    setIndices([overscannedStart, overscannedEnd]);
  };
  const visibleList = list.slice(indices[0], indices[1] + 1);
  return (
    <div
      className="container"
      onScroll={handleScroll}
      style={{ height, width, overflow: "auto", margin: "10% 40%" }}
    >
      <div
        style={{
          height: list.length * itemHeight,
          position: "relative",
        }}
      >
        {visibleList.map((item, index) => {
          return (
            <div
              className="item"
              key={index + indices[0]}
              style={{
                height: itemHeight,
                border: "1px solid grey",
                position: "absolute",
                top: (indices[0] + index) * itemHeight,
                width: "100%",
                textAlign: "center",
                background: "yellow",
              }}
            >
              {"Item " + item}
            </div>
          );
        })}
      </div>
    </div>
  );
}
