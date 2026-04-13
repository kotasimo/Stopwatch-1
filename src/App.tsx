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

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-100">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

        <div className="grid grid-cols-3 gap-4">
          {stopwatches.map((sw) => (
            <StopwatchCard key={sw.id} />
          ))}
        </div>
        <button
          onClick={addStopwatch}
          className="mt-6 rounded-lg bg-slate-800 px-4 py-2 hover:bg-slate-700"
        >
          追加
        </button>
      </div>
    </div>
  );
}