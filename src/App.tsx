import { StopwatchCard } from "./stopwatchCard";

export default function App() {
  return (
    <div className="min-h-screen bg-linear-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-100">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 gap-4">
          <StopwatchCard />
          <StopwatchCard />
          <StopwatchCard />
          <StopwatchCard />
          <StopwatchCard />
          <StopwatchCard />
        </div>
      </div>
    </div>
  );
}