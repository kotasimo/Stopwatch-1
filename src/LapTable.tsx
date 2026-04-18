import { useEffect, useState } from "react";
import type { Lap } from "./type";

type Props = {
  laps: Lap[];
  formatTimeText: (ms: number) => string;
};

export const LapTable = ({ laps, formatTimeText }: Props) => {
  const [selectedLap, setSelectedLap] = useState<number | null>(() => {
    const saved = localStorage.getItem("selectedLap");
    return saved ? Number(saved) : null;
  });

  useEffect(() => {
    if (selectedLap !== null) {
      localStorage.setItem("selectedLap", String(selectedLap));
    } else {
      localStorage.removeItem("selectedLap");
    }
  }, [selectedLap]);

  return (

    <div className="max-h-88 text-center overflow-auto border-t border-white/10 ">
      <table className="w-full text-sm">
        <thead className="sticky top-0 z-10 bg-slate-950/70">
          <tr className="text-slate-300">
            <th className="color px-1 py-2 text-center font-medium">Lap</th>
            <th className="color px-1 py-2 text-center font-medium">Lap Time</th>
            <th className="color px-1 py-2 text-center font-medium">Total</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-white/10">
          {laps.map((lap) => (
            <tr
              key={lap.lap}
              onClick={() =>
                setSelectedLap((prev) => (prev === lap.lap ? null : lap.lap))
              }
              className={`cursor-pointer transition-colors active:bg-green-700 ${selectedLap === lap.lap ? "bg-green-700" : "bg-white/7"
                }`}
            >
              <td className="px-2 py-2 text-center text-slate-200">{lap.lap}</td>
              <td className="px-2 py-2 text-center font-mono tabular-nums text-slate-100">
                {formatTimeText(lap.lapTime)}
              </td>
              <td className="px-2 py-2 font-mono tabular-nums text-slate-100">
                {formatTimeText(lap.totalTime)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
