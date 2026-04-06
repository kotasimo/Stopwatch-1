import type { Lap } from "./type";

type Props = {
  laps: Lap[];
  formatTimeText: (ms: number) => string;
};

export const LapLatest = ({ laps, formatTimeText }: Props) => {
  const latest = laps.at(-1);

  const lapNumber = latest?.lap ?? 0;
  const lapTime = latest?.lapTime ?? 0;
  const totalTime = latest?.totalTime ?? 0;

  return (
    <div>
      <div className="grid grid-cols-[36px_100px_1fr] grid-rows-[60px_60px] items-center gap-x-1 gap-y-0">
        <div className="text-[20px] uppercase tracking-wide text-slate-300">
          SPLIT
        </div>

        <div className="row-span-2 self-center text-right text-3xl text-slate-200">
          {lapNumber}
        </div>

        <div className="text-right font-mono tabular-nums text-3xl text-slate-100">
          {formatTimeText(totalTime)}
        </div>

        <div className="text-[20px] uppercase tracking-wide text-slate-300">
          LAP
        </div>

        <div className="text-right font-mono tabular-nums text-3xl text-slate-100">
          {formatTimeText(lapTime)}
        </div>
      </div>

      <div className="mt-1 border-t border-white/20" />
    </div>
  );
};
