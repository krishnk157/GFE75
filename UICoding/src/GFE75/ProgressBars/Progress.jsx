import { useEffect, useState } from "react";

function ProgressBar() {
  const [startTransition, setStartTransition] = useState(false);

  //Start transition after first render and never apply this effect again
  useEffect(() => {
    if (startTransition) {
      return;
    }
    setStartTransition(true);
  });
  return (
    <div className="progress-bar">
      <div
        className={[
          "progress-status",
          startTransition && "progress-status--filled",
        ]
          .filter(Boolean)
          .join(" ")}
      ></div>
    </div>
  );
}

export default function App() {
  const [barCount, setBarCount] = useState(0);

  return (
    <div>
      <button
        onClick={() => {
          setBarCount((prev) => prev + 1);
        }}
      >
        Add
      </button>
      {Array(barCount)
        .fill(null)
        .map((_, index) => (
          <ProgressBar key={index} />
        ))}
    </div>
  );
}
