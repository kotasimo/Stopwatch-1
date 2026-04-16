import { Controls } from "./Controls";
import { TimeDisplay } from "./TimeDisplay";
import { LapLatest } from "./LapLatest";
import { LapTable } from "./LapTable";
import "./stopwatch.css";

type Lap = {
  lap: number;
  lapTime: number;
  totalTime: number;
};

type StopwatchCardProps = {
  stopwatchId: number;
  name: string;
  elapsedTime: number;
  status: "idle" | "running" | "stopped";
  laps: Lap[];
  showLaps: boolean;
  onChangeName: (id: number, name: string) => void;
  onStart: (id: number) => void;
  onStop: (id: number) => void;
  onReset: (id: number) => void;
  onLap: (id: number) => void;
  onToggleLapHistory: (id: number) => void;
  index: number;
  onDuplicate: (id: number) => void;
  onRemove: (id: number) => void;
  onDragStart: (id: number) => void;
  onDragEnter: (id: number) => void;
  onDragEnd: () => void;
  isDragging: boolean;
};

export const StopwatchCard = ({
  stopwatchId,
  name,
  elapsedTime,
  status,
  laps,
  showLaps,
  onChangeName,
  onStart,
  onStop,
  onReset,
  onLap,
  onToggleLapHistory,
  index,
  onDuplicate,
  onRemove,
  onDragStart,
  onDragEnter,
  onDragEnd,
  isDragging,
}: StopwatchCardProps) => {
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

  return (
    <div
      className={`stopwatch-card ${isDragging ? "dragging" : ""}`}
      draggable
      onDragStart={() => onDragStart(stopwatchId)}
      onDragEnter={() => onDragEnter(stopwatchId)}
      onDragOver={(e) => e.preventDefault()}
      onDragEnd={onDragEnd}
    >
      <div className="stopwatch-card-inner">
        <div className="flex items-center gap-1 mb-1">
          {/* 左：番号 */}
          <div className="text-sm text-slate-400 w-6 text-center">{index}</div>

          {/* 中央：input */}
          <input
            value={name}
            onChange={(e) => onChangeName(stopwatchId, e.target.value)}
            className="flex-1 name"
            placeholder="stopwatchName"
          />

          {/* 右：copyボタン */}
          <button
            onClick={() => onDuplicate(stopwatchId)}
            className="text-xs px-2 py-1 rounded bg-blue-500/70 hover:bg-slate-600"
          >
            ＋
          </button>

          <button
            onClick={() => onRemove(stopwatchId)}
            className="text-xs px-2 py-1 rounded bg-red-500/70 hover:bg-red-500"
          >
            ✕
          </button>
        </div>

        <div className="stopwatch-display-panel">
          <LapLatest
            laps={laps}
            formatTimeText={formatTimeText}
            lapHistory={() => onToggleLapHistory(stopwatchId)}
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
            onStart={() => onStart(stopwatchId)}
            onStop={() => onStop(stopwatchId)}
            onReset={() => onReset(stopwatchId)}
            onLap={() => onLap(stopwatchId)}
          />
        </div>
      </div>

      {showLaps && (
        <div
          className="lap-modal-overlay"
          onClick={() => onToggleLapHistory(stopwatchId)}
        >
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
