import { useState } from "react";
import { StopwatchCard } from "./stopwatchCard";

export default function App() {
  const [stopwatches, setStopwatches] = useState([
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
  ]);

  const addStopwatch = () => {
    setStopwatches((prev) => [...prev, { id: Date.now() }]);
  };

  const removeStopwatch = () => {
    setStopwatches((prev) => prev.slice(0, -1));
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-100">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex gap-4">
          <div className="grid grid-cols-3 gap-4 flex-1">
            {stopwatches.map((sw) => (
              <StopwatchCard key={sw.id} />
            ))}
          </div>
          <div className="flex flex-col gap-2 self-start">
            <button
              onClick={addStopwatch}
              className="h-fit rounded-full bg-slate-800 px-4 py-2 hover:bg-slate-700 text-2xl font-extrabold "
            >
              ＋
            </button>


            <button
              onClick={removeStopwatch}
              className="rounded-full bg-slate-800 px-4 py-2 hover:bg-slate-700 text-2xl font-extrabold"
            >
              ー
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}