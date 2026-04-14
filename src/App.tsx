import { useCallback, useState } from "react";
import { StopwatchCard } from "./stopwatchCard";
import { LapTable } from "./LapTable";

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

export default function App() {
  const [stopwatches, setStopwatches] = useState([
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
  ]);

  const [showHistory, setShowHistory] = useState(false);
  const [histories, setHistories] = useState<StopwatchHistory[]>([]);

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

  const handleUpdateHistory = useCallback((history: StopwatchHistory) => {
    setHistories((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.stopwatchId === history.stopwatchId
      );

      if (existingIndex === -1) {
        return [...prev, history];
      }

      const updated = [...prev];
      updated[existingIndex] = history;
      return updated;
    });
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-100">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex gap-4">
          <div className="grid grid-cols-3 gap-4 flex-1">
            {stopwatches.map((sw) => (
              <StopwatchCard
                key={sw.id}
                stopwatchId={sw.id}
                onUpdateHistory={handleUpdateHistory}
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
              onClick={() => setShowHistory(true)}
              className="rounded-full bg-slate-800 px-4 py-2 hover:bg-slate-700 text-sm font-bold"
            >
              履歴
            </button>
          </div>
        </div>
        {showHistory && (
          <div className="fixed inset-0 z-50 bg-slate-950/90 text-slate-100 overflow-y-auto" onClick={() => setShowHistory(false)}>
            <div className="flex justify-center pt-10">
              <div className="w-full max-w-7xl px-4" onClick={(e) => e.stopPropagation()}>
                <div className="mb-6 flex items-center justify-between">
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {histories.length === 0 ? (
                    <div className="rounded-2xl bg-slate-800 p-4 text-slate-300">
                      まだ履歴はありません
                    </div>
                  ) : (
                    histories.map((history) => (
                      <div
                        key={history.stopwatchId}
                        className="rounded-2xl bg-slate-800 p-4 shadow"
                      >
                        <div className="mb-4 flex items-center gap-3">
                          <div className="text-sm text-slate-400">
                            {history.stopwatchId}
                          </div>
                          <div className="text-lg font-bold">
                            {history.name || "stopwatchName"}
                          </div>
                        </div>

                        <LapTable
                          laps={history.laps}
                          formatTimeText={formatTimeText}
                          name={history.name}
                        />
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}