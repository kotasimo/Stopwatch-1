import { useEffect, useState } from "react";
import { StopwatchCard } from "./stopwatchCard";
import { LapTable } from "./LapTable";
import { Analytics } from "@vercel/analytics/react";

type Lap = {
  lap: number;
  lapTime: number;
  totalTime: number;
};

type StopwatchItem = {
  id: number;
  name: string;
  elapsedTime: number;
  status: "idle" | "running" | "stopped";
  laps: Lap[];
  showLaps: boolean;
  startedAt: number | null;
  isNew?: boolean;
};


export default function App() {
  const createStopwatch = (id: number): StopwatchItem => ({
    id,
    name: "",
    elapsedTime: 0,
    status: "idle",
    laps: [],
    showLaps: false,
    startedAt: null,
  });

  const [stopwatches, setStopwatches] = useState<StopwatchItem[]>([
    createStopwatch(1),
    createStopwatch(2),
    createStopwatch(3),
    // createStopwatch(4),
    // createStopwatch(5),
    // createStopwatch(6),
  ]);

  const [showHistory, setShowHistory] = useState(false);
  const [draggingId, setDraggingId] = useState<number | null>(null);
  const [showInfo, setShowInfo] = useState(false);

  const addStopwatch = () => {
    const newId = Date.now();
    setStopwatches((prev) => [...prev, createStopwatch(newId)]);
  };

  const updateStopwatch = (
    id: number,
    updater: (sw: StopwatchItem) => StopwatchItem,
  ) => {
    setStopwatches((prev) =>
      prev.map((sw) => (sw.id === id ? updater(sw) : sw)),
    );
  };

  const changeName = (id: number, name: string) => {
    updateStopwatch(id, (sw) => ({
      ...sw,
      name,
    }));
  };

  const startStopwatch = (id: number) => {
    updateStopwatch(id, (sw) => {
      if (sw.status === "running") return sw;

      return {
        ...sw,
        status: "running",
        startedAt: Date.now() - sw.elapsedTime,
      };
    });
  };

  const stopStopwatch = (id: number) => {
    updateStopwatch(id, (sw) => {
      if (sw.status !== "running") return sw;

      return {
        ...sw,
        status: "stopped",
        startedAt: null,
      };
    });
  };

  const resetStopwatch = (id: number) => {
    updateStopwatch(id, (sw) => ({
      ...sw,
      status: "idle",
      elapsedTime: 0,
      laps: [],
      showLaps: false,
      startedAt: null,
    }));
  };

  const lapStopwatch = (id: number) => {
    updateStopwatch(id, (sw) => {
      if (sw.status !== "running") return sw;

      const totalTime = sw.elapsedTime;
      const previousTotal =
        sw.laps.length > 0 ? sw.laps[sw.laps.length - 1].totalTime : 0;

      const newLap: Lap = {
        lap: sw.laps.length + 1,
        lapTime: totalTime - previousTotal,
        totalTime,
      };

      return {
        ...sw,
        laps: [...sw.laps, newLap],
      };
    });
  };

  const toggleLapHistory = (id: number) => {
    updateStopwatch(id, (sw) => ({
      ...sw,
      showLaps: !sw.showLaps,
    }));
  };

  useEffect(() => {
    const interval = window.setInterval(() => {
      setStopwatches((prev) =>
        prev.map((sw) => {
          if (sw.status !== "running" || sw.startedAt === null) return sw;

          return {
            ...sw,
            elapsedTime: Date.now() - sw.startedAt,
          };
        }),
      );
    }, 10);

    return () => clearInterval(interval);
  }, []);

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


  const duplicateStopwatch = (id: number) => {
    setStopwatches((prev) => {
      const targetIndex = prev.findIndex((sw) => sw.id === id);
      if (targetIndex === -1) return prev;

      const target = prev[targetIndex];
      const newId = Date.now();

      const duplicated: StopwatchItem = {
        ...target,
        id: newId,
        name: target.name ? `${target.name} copy` : "",
        laps: [...target.laps],
        startedAt:
          target.status === "running"
            ? Date.now() - target.elapsedTime
            : null,
        isNew: true,
      };

      const updated = [...prev];
      updated.splice(targetIndex + 1, 0, duplicated);

      return updated;
    });
  };

  const removeStopwatchById = (id: number) => {
    setStopwatches((prev) => prev.filter((sw) => sw.id !== id));
  };

  const reorderStopwatch = (dragId: number, hoverId: number) => {
    setStopwatches((prev) => {
      const dragIndex = prev.findIndex((sw) => sw.id === dragId);
      const hoverIndex = prev.findIndex((sw) => sw.id === hoverId);

      if (dragIndex === -1 || hoverIndex === -1 || dragIndex === hoverIndex) {
        return prev;
      }

      const updated = [...prev];
      const [draggedItem] = updated.splice(dragIndex, 1);
      updated.splice(hoverIndex, 0, draggedItem);

      return updated;
    });
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-100">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col xl:flex-row gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 flex-1">
            {stopwatches.map((sw, index) => (
              <div key={sw.id} className="w-full max-w-[340px] mx-auto">
                <StopwatchCard
                  key={sw.id}
                  stopwatchId={sw.id}
                  name={sw.name}
                  elapsedTime={sw.elapsedTime}
                  status={sw.status}
                  laps={sw.laps}
                  showLaps={sw.showLaps}
                  onChangeName={changeName}
                  onStart={startStopwatch}
                  onStop={stopStopwatch}
                  onReset={resetStopwatch}
                  onLap={lapStopwatch}
                  onToggleLapHistory={toggleLapHistory}
                  onDuplicate={duplicateStopwatch}
                  index={index + 1}
                  onRemove={removeStopwatchById}
                  onDragStart={setDraggingId}
                  onDragEnter={(hoverId) => {
                    if (draggingId !== null) {
                      reorderStopwatch(draggingId, hoverId);
                    }
                  }}
                  onDragEnd={() => setDraggingId(null)}
                  isDragging={draggingId === sw.id}
                  isNew={sw.isNew}
                />
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-2 self-start hidden xl:flex">
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
            <button
              onClick={() => setShowInfo(true)}
              className="rounded-full bg-slate-800 px-4 py-2 hover:bg-slate-700 text-sm font-bold " translate="no"
            >
              i
            </button>
          </div>
          <div className="fixed bottom-0 left-0 w-full z-50 bg-slate-900/95 backdrop-blur border-t border-slate-700 xl:hidden flex">
            <div className="fixed bottom-0 left-0 z-50 grid h-14 w-full grid-cols-4 border-t border-slate-700 bg-slate-900/95 backdrop-blur xl:hidden">
              <button
                onClick={addStopwatch}
                className="h-full w-full text-sm border-r border-slate-700 font-bold text-slate-200 transition-all duration-100 hover:bg-slate-700 active:scale-95 active:bg-slate-700"
              >
                追加
              </button>

              <button
                onClick={removeStopwatch}
                className="h-full w-full text-sm border-r border-slate-700 font-bold text-slate-200 transition-all duration-100 hover:bg-slate-700 active:scale-95 active:bg-slate-700 "
              >
                削除
              </button>

              <button
                onClick={() => setShowHistory(true)}
                className="h-full w-full text-sm border-r border-slate-700 font-bold text-slate-200 transition-all duration-100 hover:bg-slate-700 active:scale-95 active:bg-slate-700"
              >
                履歴
              </button>

              <button
                onClick={() => setShowInfo(true)}
                className="h-full w-full text-sm font-bold text-slate-200 transition-all duration-100 hover:bg-slate-700 active:scale-95 active:bg-slate-700" translate="no"
              >
                i
              </button>
            </div>
          </div>
        </div>
        {showHistory && (
          <div
            className="fixed inset-0 z-50 bg-slate-950/90 text-slate-100 overflow-y-auto"
            onClick={() => setShowHistory(false)}
          >
            <div className="flex justify-center pt-10">
              <div
                className="w-[80%] max-w-md mx-auto md:w-full md:max-w-4xl xl:max-w-7xl"
                onClick={(e) => e.stopPropagation()}
              >


                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {stopwatches.length === 0 ? (
                    <div className="rounded-2xl bg-slate-800 p-4 text-slate-300">
                      まだ履歴はありません
                    </div>
                  ) : (
                    stopwatches.map((sw, index) => (
                      <div
                        key={sw.id}
                        className="rounded-2xl bg-slate-800 p-4 shadow"
                      >
                        <div className="mb-2 flex items-center gap-5">
                          <div className="text-lg">
                            {index + 1}
                          </div>
                          <div className="text-lg font-bold">
                            {sw.name || "stopwatchName"}
                          </div>
                        </div>

                        <LapTable
                          laps={sw.laps}
                          formatTimeText={formatTimeText}
                        />
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {showInfo && (
          <div
            className="fixed inset-0 z-50 bg-slate-950/90 text-slate-100"
            onClick={() => setShowInfo(false)}
          >
            <div className="flex justify-center items-start pt-20">
              <div
                className="w-full max-w-md px-4"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="rounded-2xl bg-slate-800 p-6 shadow">
                  <div className="mb-4 text-lg font-bold">How to use</div>

                  <div className="text-sm text-slate-200">ここに説明入れる</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Analytics />
    </div>
  );
}
