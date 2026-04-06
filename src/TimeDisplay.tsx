type Props = {
  minutes: string;
  seconds: string;
  milliseconds: string;
};

export const TimeDisplay = ({
  minutes,
  seconds,
  milliseconds,
}: Props) => {
  return (
    <div className="flex w-full max-w-[460px] items-end justify-center font-mono tabular-nums">
      <span className="inline-block w-[2ch] text-center text-5xl font-semibold tracking-tight sm:text-6xl">
        {minutes}
      </span>
      <span className="inline-block w-[1ch] pb-5 text-center text-2xl text-slate-300">
        '
      </span>
      <span className="inline-block w-[2ch] text-center text-5xl font-semibold tracking-tight sm:text-6xl">
        {seconds}
      </span>
      <span className="inline-block w-[1ch] pb-5 text-center text-2xl text-slate-300">
        "
      </span>
      <span className="inline-block w-[3ch] text-center text-2xl text-slate-200 sm:text-3xl">
        {milliseconds}
      </span>
    </div>
  );
};