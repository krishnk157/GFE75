import { useState, useEffect, useRef } from "react";

// Individual Timer Component
function Timer({ id, onDelete }) {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const handleStartPause = () => {
    setIsRunning((prev) => !prev);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
  };

  return (
    <div style={{ marginBottom: "10px" }}>
      <span>
        Timer {id}: {time}s
      </span>
      <button onClick={handleStartPause}>
        {isRunning ? "Pause" : "Start"}
      </button>
      <button onClick={handleReset}>Reset</button>
      <button onClick={() => onDelete(id)}>Delete</button>
    </div>
  );
}

// Parent Component
export default function TimerApp() {
  const [timers, setTimers] = useState([]);

  const addTimer = () => {
    setTimers((prev) => [...prev, Date.now()]);
  };

  const deleteTimer = (id) => {
    setTimers((prev) => prev.filter((t) => t !== id));
  };

  return (
    <div>
      <h2>Multiple Timers</h2>
      <button onClick={addTimer}>Add Timer</button>

      {timers.map((id) => (
        <Timer key={id} id={id} onDelete={deleteTimer} />
      ))}
    </div>
  );
}
