import { Controls } from "./Controls";
import { TimeDisplay } from "./TimeDisplay";
import { LapLatest } from "./LapLatest";
import { LapTable } from "./LapTable";
import { useStopwatch } from "./useStopwatch";
import { useEffect, useState } from "react";
import "./stopwatch.css";

type Lap = {
  lap: number;
  lapTime: number;
  totalTime: number;
};

type StopwatchHistory = {
  stopwatchId: number;
  name: string;
  laps: Lap[];
};

type StopwatchCardProps = {
  stopwatchId: number;
  onUpdateHistory: (history: StopwatchHistory) => void;
};

export const StopwatchCard = ({
  stopwatchId,
  onUpdateHistory,
}: StopwatchCardProps) => {
  const {
    status,
    laps,
    elapsedTime,
    showLaps,
    start,
    stop,
    reset,
    lap,
    lapHistory,
  } = useStopwatch();

  const [name, setName] = useState("");

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

  const { minutes, seconds, milliseconds } = formatTime(elapsedTime);

  useEffect(() => {
    onUpdateHistory({
      stopwatchId,
      name,
      laps,
    });
  }, [stopwatchId, name, laps, onUpdateHistory]);

  return (
    <div className="stopwatch-card">
      <div className="stopwatch-card-inner">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="name"
          placeholder="stopwatchName"
        />

        <div className="stopwatch-display-panel">
          <LapLatest
            laps={laps}
            formatTimeText={formatTimeText}
            lapHistory={lapHistory}
          />

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
          />
        </div>
      </div>

      {showLaps && (
        <div className="lap-modal-overlay" onClick={lapHistory}>
          <section
            className="lap-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <LapTable laps={laps} formatTimeText={formatTimeText} name={name} />
          </section>
        </div>
      )}
    </div>
  );
};