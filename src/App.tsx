import { useState } from "react";
import { StopwatchCard } from "./stopwatchCard";

type AllLap = {
  stopwatchId: number;
  lapTime: number;
  totalTime: number;
  name: string;
};

export default function App() {
  const [stopwatches, setStopwatches] = useState([
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
  ]);

  const [allLaps, setAllLaps] = useState<AllLap[]>([]);
  const [page, setPage] = useState<"main" | "history">("main");

  const addStopwatch = () => {
    setStopwatches((prev) => [...prev, { id: Date.now() }]);
  };

  const removeStopwatch = () => {
    setStopwatches((prev) => {
      if (prev.length === 0) return prev;
      return prev.slice(0, -1);
    });
  };

  const formatTimeText = (ms: number) => {
    const minutes = Math.floor(ms / 1000 / 60)
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor((ms / 1000) % 60)
      .toString()
      .padStart(2, "0");
    const milliseconds = Math.floor(ms % 1000)
      .toString()
      .padStart(3, "0");

    return `${minutes}'${seconds}"${milliseconds}`;
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-100">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {page === "main" && (
          <div className="flex gap-4">
            <div className="grid grid-cols-3 gap-4 flex-1">
              {stopwatches.map((sw) => (
                <StopwatchCard
                  key={sw.id}
                  stopwatchId={sw.id}
                  onAddLap={(lap) => {
                    setAllLaps((prev) => [...prev, lap]);
                  }}
                />
              ))}
            </div>

            <div className="flex flex-col gap-2 self-start">
              <button
                onClick={addStopwatch}
                className="h-fit rounded-full bg-slate-800 px-4 py-2 hover:bg-slate-700 text-2xl font-extrabold"
              >
                ＋
              </button>

              <button
                onClick={removeStopwatch}
                className="rounded-full bg-slate-800 px-4 py-2 hover:bg-slate-700 text-2xl font-extrabold"
              >
                ー
              </button>

              <button
                onClick={() => setPage("history")}
                className="rounded-full bg-slate-800 px-4 py-2 hover:bg-slate-700 text-sm font-bold"
              >
                履歴
              </button>
            </div>
          </div>
        )}

        {page === "history" && (
          <div>
            <div className="mb-6 flex items-center justify-between">
              <h1 className="text-2xl font-bold">Lap History</h1>
              <button
                onClick={() => setPage("main")}
                className="rounded-full bg-slate-800 px-4 py-2 hover:bg-slate-700 text-sm font-bold"
              >
                戻る
              </button>
            </div>

            <div className="space-y-3">
              {allLaps.length === 0 ? (
                <div className="rounded-2xl bg-slate-800 p-4 text-slate-300">
                  まだラップ履歴はありません
                </div>
              ) : (
                allLaps
                  .slice()
                  .reverse()
                  .map((lap, index) => (
                    <div
                      key={index}
                      className="rounded-2xl bg-slate-800 p-4 shadow"
                    >
                      <div className="mb-1 text-sm text-slate-400">
                        Stopwatch {lap.stopwatchId}
                      </div>
                      <div className="mb-1 text-lg font-bold">
                        {lap.name || "stopwatchName"}
                      </div>
                      <div className="text-sm text-slate-300">
                        Lap: {formatTimeText(lap.lapTime)}
                      </div>
                      <div className="text-sm text-slate-300">
                        Total: {formatTimeText(lap.totalTime)}
                      </div>
                    </div>
                  ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}