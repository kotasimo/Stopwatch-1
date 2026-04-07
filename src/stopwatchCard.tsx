import { Controls } from "./Controls";
import { TimeDisplay } from "./TimeDisplay";
import { LapLatest } from "./LapLatest";
import { useStopwatch } from "./useStopwatch";
import { useState } from "react";
import "./stopwatch.css"

export const StopwatchCard = () => {
  const { status, laps, elapsedTime, start, stop, reset, lap } = useStopwatch();

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 1000 / 60)
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor((ms / 1000) % 60)
      .toString()
      .padStart(2, "0");
    const milliseconds = Math.floor(ms % 1000)
      .toString()
      .padStart(3, "0");

    return { minutes, seconds, milliseconds };
  };

  const formatTimeText = (ms: number) => {
    const { minutes, seconds, milliseconds } = formatTime(ms);
    return `${minutes}'${seconds}"${milliseconds}`;
  };

  const [name, setName] = useState("stopwatchName")

  const { minutes, seconds, milliseconds } = formatTime(elapsedTime);

  return (
    <div className="stopwatch-card">
      <div className="stopwatch-card-inner">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="name"
        />
        <div className="stopwatch-display-panel">
          <LapLatest laps={laps} formatTimeText={formatTimeText} />
          <TimeDisplay
            minutes={minutes}
            seconds={seconds}
            milliseconds={milliseconds}
          />
        </div>
        <div className="stopwatch-controls-row">
          <Controls
            statusConf={status}
            onStart={start}
            onStop={stop}
            onReset={reset}
            onLap={lap}
            onHistory={history}
          />
        </div>
      </div>
      
    </div>
  );
};
