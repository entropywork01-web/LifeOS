import { useEffect, useState } from "react";

function Pomodoro() {
  const [seconds, setSeconds] = useState(25 * 60);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;

    const timer = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setRunning(false);
          alert("🎉 Pomodoro completed!");
          return 25 * 60;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [running]);

  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return (
    <div className="summary-card">
      <h2>🍅 Focus Timer</h2>

      <h1 style={{ textAlign: "center", margin: "20px 0" }}>
        {String(minutes).padStart(2, "0")}:
        {String(secs).padStart(2, "0")}
      </h1>

      <div
        style={{
          display: "flex",
          gap: 12,
          justifyContent: "center",
        }}
      >
        <button onClick={() => setRunning(true)}>
          Start
        </button>

        <button onClick={() => setRunning(false)}>
          Pause
        </button>

        <button
          onClick={() => {
            setRunning(false);
            setSeconds(25 * 60);
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default Pomodoro;