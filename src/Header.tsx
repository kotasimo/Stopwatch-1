type Props = {
  label: "待機中" | "計測中" | "一時停止中";
  dot: string;
};

export const Header = ({ label, dot }: Props) => {
  return (
    <header className="flex items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          ストップウォッチ
        </h1>
      </div>
      <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/7 px-3 py-1 text-xs text-slate-200 sm:flex">
        <span className={`h-2 w-2 rounded-full ${dot}`} />
        {label}
      </div>
    </header>
  );
};
