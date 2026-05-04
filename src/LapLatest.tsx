import type { Lap } from "./type";

type Props = {
  laps: Lap[];
  formatTimeText: (ms: number) => string;
  lapHistory: () => void;
  variant: "A" | "B" | "C" | "D" | "GROUP";
  liveLapTime: number;
  lastLapTime: number;
};

export const LapLatest = ({ laps, formatTimeText, lapHistory, variant,
  liveLapTime,
  lastLapTime, }: Props) => {
  const latest = laps.at(-1);

  const lapNumber = latest?.lap ?? 0;
  const lapTime = latest?.lapTime ?? 0;
  const totalTime = latest?.totalTime ?? 0;

  const formatLapTimeText = (ms: number) => {
    const minutes = Math.floor(ms / 1000 / 60);
    const seconds = Math.floor((ms / 1000) % 60)
      .toString()
      .padStart(2, "0");

    const centiseconds = Math.floor((ms % 1000) / 10)
      .toString()
      .padStart(2, "0");
    return `${minutes}'${seconds}"${centiseconds}`;
  };

  if (variant === "B") {
    return (
      <div>
        <div className="grid grid-cols-[36px_70px_1fr] grid-rows-[60px_60px] items-center gap-x-1 gap-y-0">

          <div className="text-[20px] uppercase tracking-wide text-slate-300">
            LIVE
          </div>

          <div className="row-span-2 self-center text-right text-3xl text-slate-200">
            {lapNumber}
          </div>

          <div className="text-right font-mono tabular-nums text-3xl text-slate-100">
            {formatTimeText(liveLapTime)}
          </div>

          <div className="text-[20px] uppercase tracking-wide text-slate-300">
            LAST
          </div>

          <div className="text-right font-mono tabular-nums text-3xl text-slate-100">
            {formatTimeText(lastLapTime)}
          </div>

        </div>

        <div className="mt-1 border-t border-white/20" />
      </div>
    );
  }

  if (variant === "D") {
    return (
      <div>
        <div className="text-4xl">
          {formatLapTimeText(liveLapTime)}
        </div>

        <div className="text-2xl text-slate-400">
          {formatLapTimeText(lastLapTime)}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-[36px_70px_1fr] grid-rows-[60px_60px] items-center gap-x-1 gap-y-0">
        <div className="text-[20px] uppercase tracking-wide text-slate-300 " translate="no">
          SPLIT
        </div>

        <div className="row-span-2 self-center text-right text-3xl text-slate-200">
          {lapNumber}
        </div>

        <div className="text-right font-mono tabular-nums text-3xl text-slate-100">
          {formatTimeText(totalTime)}
        </div>

        <div className="lap-label text-[20px] uppercase tracking-wide text-slate-300" onClick={lapHistory} translate="no">
          LAP
        </div>

        <div className="lap-label text-right font-mono tabular-nums text-3xl text-slate-100" onClick={lapHistory}>
          {formatTimeText(lapTime)}
        </div>
      </div>

      <div className="mt-1 border-t border-white/20" />
    </div>
  );
};
