import type { Lap } from "./type";

type Props = {
  laps: Lap[];
  formatTimeText: (ms: number) => string;
  lapHistory: () => void;
  variant: "A" | "B" | "C" | "D" | "D2" | "E";
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
    const minutes = Math.floor(ms / 60000);

    const seconds = Math.floor((ms % 60000) / 1000)
      .toString()
      .padStart(2, "0");

    const tenths = Math.floor((ms % 1000) / 100);

    return `${minutes}:${seconds}.${tenths}`;
  };

  if (variant === "B" || variant === "C") {
    return (
      <div className="lap-latest-standard">
        <div className="lap-latest-grid">

          <div className="lap-latest-label text-slate-300">
            LIVE
          </div>

          <div className="lap-latest-number text-slate-200">
            {lapNumber}
          </div>

          <div className="lap-latest-time text-slate-100">
            {formatTimeText(liveLapTime)}
          </div>

          <div className="lap-latest-label lap-label text-slate-300" onClick={lapHistory}>
            LAST
          </div>

          <div className="lap-latest-time lap-label text-slate-100" onClick={lapHistory}>
            {formatTimeText(lastLapTime)}
          </div>

        </div>
      </div>
    );
  }



  if (variant === "D" || variant === "D2" || variant === "E") {
    return (
      <div className="lap-latest-phone" onClick={lapHistory}>
        <div className="lap-latest-phone-live">
          {formatLapTimeText(liveLapTime)}
        </div>

        <div className="lap-latest-phone-last">
          {formatLapTimeText(lastLapTime)}
        </div>
      </div>
    );
  }

  return (
    <div className="lap-latest-standard">
      <div className="lap-latest-grid">
        <div className="lap-latest-label text-slate-300" translate="no">
          SPLIT
        </div>

        <div className="lap-latest-number text-slate-200">
          {lapNumber}
        </div>

        <div className="lap-latest-time text-slate-100">
          {formatTimeText(totalTime)}
        </div>

        <div className="lap-latest-label lap-label text-slate-300" onClick={lapHistory} translate="no">
          LAP
        </div>

        <div className="lap-latest-time lap-label text-slate-100" onClick={lapHistory}>
          {formatTimeText(lapTime)}
        </div>
      </div>
    </div>
  );
};
