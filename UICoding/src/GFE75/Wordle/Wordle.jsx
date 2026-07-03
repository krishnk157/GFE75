import { useState, useEffect } from "react";

// ─── Constants ───────────────────────────────────────────────────────────────

const WORDS = [
  "CRANE",
  "SLATE",
  "FLINT",
  "GROVE",
  "BRISK",
  "SPOUT",
  "DWARF",
  "PLUMB",
  "CRISP",
  "YACHT",
  "BLAZE",
  "FROZE",
  "STOMP",
  "QUIRK",
  "SWAMP",
  "CAULK",
];

const MAX_GUESSES = 6;
const WORD_LENGTH = 5;

const KEYBOARD_ROWS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "⌫"],
];

// ─── Core Logic (pure functions — easy to unit test) ─────────────────────────

function pickWord() {
  return WORDS[Math.floor(Math.random() * WORDS.length)];
}

/**
 * Returns an array of statuses for each letter in the guess.
 * Two-pass approach to handle duplicate letters correctly.
 *
 * Pass 1: mark greens, remove matched letters from pool
 * Pass 2: mark yellows from remaining pool
 */
function getStatuses(guess, answer) {
  const result = Array(WORD_LENGTH).fill("absent");
  const pool = answer.split(""); // mutable copy to track consumed letters

  // Pass 1 — greens
  guess.split("").forEach((ch, i) => {
    if (ch === pool[i]) {
      result[i] = "correct";
      pool[i] = null; // consumed
    }
  });

  // Pass 2 — yellows
  guess.split("").forEach((ch, i) => {
    if (result[i] === "correct") return;
    const poolIdx = pool.indexOf(ch);
    if (poolIdx !== -1) {
      result[i] = "present";
      pool[poolIdx] = null; // consumed so it's not double-counted
    }
  });

  return result;
}

/**
 * Merges new letter statuses into the keyboard map.
 * Priority: correct > present > absent — a letter is never downgraded.
 */
function mergeKeyMap(prev, guess, statuses) {
  const priority = { correct: 3, present: 2, absent: 1 };
  const next = { ...prev };
  guess.split("").forEach((ch, i) => {
    if (!next[ch] || priority[statuses[i]] > priority[next[ch]]) {
      next[ch] = statuses[i];
    }
  });
  return next;
}

// ─── Tile ────────────────────────────────────────────────────────────────────

function Tile({ letter = "", status = "", isActive = false }) {
  const base = {
    width: 52,
    height: 52,
    border: "2px solid",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 20,
    fontWeight: 600,
    textTransform: "uppercase",
    borderRadius: 4,
    transition: "background 0.15s, border-color 0.15s",
  };

  const styles = {
    correct: { background: "#538d4e", borderColor: "#538d4e", color: "#fff" },
    present: { background: "#b59f3b", borderColor: "#b59f3b", color: "#fff" },
    absent: { background: "#3a3a3c", borderColor: "#3a3a3c", color: "#fff" },
    filled: { borderColor: "#999", background: "transparent" },
    empty: { borderColor: "#444", background: "transparent" },
    active: { borderColor: "#66aaff", background: "transparent" },
  };

  const style = {
    ...base,
    ...(status
      ? styles[status]
      : isActive
      ? styles.active
      : letter
      ? styles.filled
      : styles.empty),
  };

  return <div style={style}>{letter}</div>;
}

// ─── Row ─────────────────────────────────────────────────────────────────────

function Row({
  word = "",
  statuses = [],
  isActive = false,
  currentInput = "",
}) {
  return (
    <div style={{ display: "flex", gap: 6 }}>
      {Array(WORD_LENGTH)
        .fill("")
        .map((_, i) => (
          <Tile
            key={i}
            letter={statuses.length ? word[i] : currentInput[i] || ""}
            status={statuses[i] || ""}
            isActive={isActive && i === currentInput.length}
          />
        ))}
    </div>
  );
}

// ─── Key ─────────────────────────────────────────────────────────────────────

function Key({ label, status, onPress }) {
  const isWide = label.length > 1;
  const colors = {
    correct: { bg: "#538d4e", color: "#fff", border: "#538d4e" },
    present: { bg: "#b59f3b", color: "#fff", border: "#b59f3b" },
    absent: { bg: "#3a3a3c", color: "#fff", border: "#3a3a3c" },
  };
  const c = colors[status] || {
    bg: "#818384",
    color: "#fff",
    border: "#818384",
  };

  return (
    <button
      onClick={() => onPress(label)}
      style={{
        height: 40,
        minWidth: isWide ? 52 : 32,
        padding: "0 6px",
        background: c.bg,
        color: c.color,
        border: `1px solid ${c.border}`,
        borderRadius: 4,
        fontSize: isWide ? 11 : 13,
        fontWeight: 600,
        cursor: "pointer",
        textTransform: "uppercase",
      }}
    >
      {label}
    </button>
  );
}

// ─── Keyboard ────────────────────────────────────────────────────────────────

function Keyboard({ keyMap, onKey }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 6,
        alignItems: "center",
      }}
    >
      {KEYBOARD_ROWS.map((row, i) => (
        <div key={i} style={{ display: "flex", gap: 5 }}>
          {row.map((k) => (
            <Key key={k} label={k} status={keyMap[k]} onPress={onKey} />
          ))}
        </div>
      ))}
    </div>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────

export default function Wordle() {
  const [answer, setAnswer] = useState(pickWord);
  const [guesses, setGuesses] = useState([]); // [{ word, statuses }]
  const [current, setCurrent] = useState("");
  const [status, setStatus] = useState("playing"); // "playing" | "won" | "lost"
  const [message, setMessage] = useState("");
  const [keyMap, setKeyMap] = useState({});

  // ── Physical keyboard support
  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Enter") handleInput("ENTER");
      else if (e.key === "Backspace") handleInput("⌫");
      else if (/^[a-zA-Z]$/.test(e.key)) handleInput(e.key.toUpperCase());
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [current, status, guesses]); // re-register when these change

  function handleInput(key) {
    if (status !== "playing") return;

    if (key === "⌫") {
      setCurrent((prev) => prev.slice(0, -1));
      return;
    }

    if (key === "ENTER") {
      submitGuess();
      return;
    }

    if (current.length < WORD_LENGTH) {
      setCurrent((prev) => prev + key);
    }
  }

  function submitGuess() {
    if (current.length < WORD_LENGTH) {
      flash("not enough letters");
      return;
    }

    const statuses = getStatuses(current, answer);
    const newGuesses = [...guesses, { word: current, statuses }];

    setKeyMap((prev) => mergeKeyMap(prev, current, statuses));
    setGuesses(newGuesses);
    setCurrent("");

    if (current === answer) {
      setStatus("won");
      setMessage("genius! 🎉");
    } else if (newGuesses.length === MAX_GUESSES) {
      setStatus("lost");
      setMessage(answer); // reveal the answer
    }
  }

  function flash(msg) {
    setMessage(msg);
    setTimeout(() => setMessage(""), 1500);
  }

  function newGame() {
    setAnswer(pickWord());
    setGuesses([]);
    setCurrent("");
    setStatus("playing");
    setMessage("");
    setKeyMap({});
  }

  // ── Derived: how many empty rows to render below active row
  const emptyRows =
    MAX_GUESSES - guesses.length - (status === "playing" ? 1 : 0);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
        padding: "1rem 0",
        fontFamily: "sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          maxWidth: 340,
        }}
      >
        <span style={{ fontSize: 18, fontWeight: 700, letterSpacing: 3 }}>
          WORDLE
        </span>
        <button
          onClick={newGame}
          style={{
            fontSize: 12,
            padding: "4px 10px",
            border: "1px solid #666",
            borderRadius: 4,
            background: "none",
            cursor: "pointer",
          }}
        >
          new word
        </button>
      </div>

      {/* Board */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {/* Completed rows */}
        {guesses.map((g, i) => (
          <Row key={i} word={g.word} statuses={g.statuses} />
        ))}

        {/* Active row */}
        {status === "playing" && <Row isActive currentInput={current} />}

        {/* Empty rows */}
        {Array(emptyRows)
          .fill("")
          .map((_, i) => (
            <Row key={`empty-${i}`} />
          ))}
      </div>

      {/* Message */}
      <div
        style={{ height: 24, fontSize: 14, fontWeight: 600, color: "#4a9eff" }}
      >
        {message}
      </div>

      {/* Keyboard */}
      <Keyboard keyMap={keyMap} onKey={handleInput} />
    </div>
  );
}
