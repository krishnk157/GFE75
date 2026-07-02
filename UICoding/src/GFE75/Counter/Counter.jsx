import { useState } from "react";

function Stepper({ min = 0, max = 9, step = 1, defaultValue = 0, onChange }) {
  const [count, setCount] = useState(
    Math.min(max, Math.max(min, defaultValue))
  );

  const update = (next) => {
    const clamped = Math.min(max, Math.max(min, next));
    setCount(clamped);
    onChange?.(clamped);
  };

  const handleInput = (e) => {
    const val = Number(e.target.value);
    if (!isNaN(val)) update(val);
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <button
        onClick={() => update(count - step)}
        disabled={count <= min}
        aria-label="Decrease"
      >
        −
      </button>
      <input
        type="number"
        value={count}
        min={min}
        max={max}
        step={step}
        onChange={handleInput}
        onBlur={(e) => update(Number(e.target.value))}
        aria-label="Quantity"
      />
      <button
        onClick={() => update(count + step)}
        disabled={count >= max}
        aria-label="Increase"
      >
        +
      </button>
    </div>
  );
}

export default Stepper;
