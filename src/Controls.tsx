import type { Status } from "./type";

type Props = {
  statusConf: Status;
  onStart: () => void;
  onStop: () => void;
  onReset: () => void;
  onLap: () => void;
};

export const Controls = ({
  statusConf,
  onStart,
  onStop,
  onReset,
  onLap,
}: Props) => {
  // ボタン onclickとlabel
  const mainLabel =
    statusConf === "running"
      ? "ストップ"
      : statusConf === "stopped"
        ? "再開"
        : "スタート";

  const mainHandler = statusConf === "running" ? onStop : onStart;

  return (
    <>
      <div className="mt-6 grid grid-cols-3 gap-3">
        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-500 px-4 py-3 text-sm font-semibold text-white shadow-sm shadow-indigo-500/20 ring-1 ring-inset ring-white/10 transition hover:bg-indigo-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300/80 active:translate-y-px"
          onClick={mainHandler}
        >
          {mainLabel}
        </button>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-xl bg-white/7 px-4 py-3 text-sm font-semibold text-slate-100 ring-1 ring-inset ring-white/10 transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300/60 active:translate-y-px disabled:cursor-not-allowed disabled:opacity-40"
          onClick={onLap}
        >
          ラップ
        </button>

         <button
          type="button"
          className="inline-flex items-center justify-center rounded-xl bg-white/7 px-4 py-2 text-sm font-medium text-slate-100 ring-1 ring-inset ring-white/10 transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300/60 disabled:cursor-not-allowed disabled:opacity-40"
          onClick={onReset}
        >
          リセット
        </button>
      </div>
    </>
  );
};
