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
  variant: "A" | "B" | "C" | "D" | "GROUP";
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
  isNew?: boolean;
};

export const StopwatchCard = ({
  stopwatchId,
  name,
  elapsedTime,
  status,
  laps,
  showLaps,
  variant,
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
  isNew
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

  const formatTotalTimeText = (ms: number) => {
    const minutes = Math.floor(ms / 1000 / 60);
    const seconds = Math.floor((ms / 1000) % 60);
    const tenth = Math.floor((ms % 1000) / 100);

    const secondsText = seconds.toString().padStart(2, "0");

    return `${minutes}'${secondsText}"${tenth}`;
  };

  const { minutes, seconds, milliseconds } = formatTime(elapsedTime);

  const latest = laps.at(-1);
  const lastTotalTime = latest?.totalTime ?? 0;
  const liveLapTime = elapsedTime - lastTotalTime;
  const lastLapTime = latest?.lapTime ?? 0;

  return (
    <div
      className={`stopwatch-card ${isDragging ? "dragging" : ""} ${isNew ? "new-card" : ""}`}
      draggable
      onDragStart={() => onDragStart(stopwatchId)}
      onDragEnter={() => onDragEnter(stopwatchId)}
      onDragOver={(e) => e.preventDefault()}
      onDragEnd={onDragEnd}

    >
      <div className="stopwatch-card-content">
        <div className="flex items-center gap-1 mb-1">
          {/* 左：番号 */}
          {variant !== "D" && (
            <div className="text-sm text-slate-400 w-6 text-center shrink-0">
              {index}
            </div>
          )}

          {/* 中央：input */}
          <input
            value={name}
            onChange={(e) => onChangeName(stopwatchId, e.target.value)}
            className="flex-1 min-w-0 name text-xs"
            placeholder="A"
          />

          {/* 右：ボタンまとめる */}
          <div className="flex gap-1 shrink-0">
            <button
              onClick={() => onDuplicate(stopwatchId)}
              className="text-xs px-2 py-1 rounded bg-blue-500/70"
            >
              ＋
            </button>

            <button
              onClick={() => onRemove(stopwatchId)}
              className="text-xs px-2 py-1 rounded bg-red-500/70"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="stopwatch-display-panel">
          <LapLatest
            laps={laps}
            formatTimeText={formatTimeText}
            lapHistory={() => onToggleLapHistory(stopwatchId)}
            variant={variant}
            liveLapTime={liveLapTime}
            lastLapTime={lastLapTime}
          />

          <div className="mt-1 border-t border-white/20 pt-0">
            {variant === "D" ? (
              <div className="flex w-full items-end justify-center font-mono tabular-nums overflow-hidden">
                <span className="inline-block w-[2ch] text-center text-4xl font-semibold">
                  {minutes.toString().padStart(2, "0")}
                </span>
                <span className="inline-block w-[1ch] pb-3 text-center text-xl text-slate-300">
                  '
                </span>
                <span className="inline-block w-[2ch] text-center text-4xl font-semibold">
                  {seconds}
                </span>
                <span className="inline-block w-[1ch] pb-3 text-center text-xl text-slate-300">
                  "
                </span>
                <span className="inline-block w-[1ch] text-center text-xl text-slate-200">
                  {Math.floor(Number(milliseconds) / 100)}
                </span>
              </div>
            ) : (
              <TimeDisplay
                minutes={minutes}
                seconds={seconds}
                milliseconds={milliseconds}
              />
            )}
          </div>

        </div>

        <div className="stopwatch-controls-row">
          <Controls
            statusConf={status}
            onStart={() => onStart(stopwatchId)}
            onStop={() => onStop(stopwatchId)}
            onReset={variant === "D" ? undefined : () => onReset(stopwatchId)}
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
            <div className="text-lg font-bold mb-2 text-center">
              {name || "stopwatchName"}
            </div>
            <LapTable laps={laps} formatTimeText={formatTimeText} />
          </section>
        </div>
      )}
    </div>
  );
};
