import { useRef, useState } from "react";
import type { Lap, Status } from "./type";

export const useStopwatch = () => {
  const [status, setStatus] = useState<Status>("idle");
  const [laps, setLaps] = useState<Lap[]>([]);
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  const startTimeRef = useRef<number>(0);
  const intervalRef = useRef<number | null>(null);

  const start = () => {
    if (status === "running") return;
    setStatus("running");
    // 再開に対応するための処理
    startTimeRef.current = Date.now() - elapsedTime;

    // 0.01秒ごとに経過時間を計算する
    intervalRef.current = setInterval(() => {
      setElapsedTime(Date.now() - startTimeRef.current);
    }, 10);
  };

  const stop = () => {
    if (intervalRef.current === null) return;

    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setStatus("stopped");
  };

  const reset = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setElapsedTime(0);
    setLaps([]);
    setStatus("idle");
  };

  const lap = () => {
    if (status !== "running") return;

    // 前回ラップ時点の totalTime を覚えておき、今の elapsedTime との差を取る
    setLaps((prev) => {
      // 前回ラップ時点のtotalTime、存在しない場合は0
      const lastTotal = prev.at(-1)?.totalTime ?? 0;
      // その時点の合計時間
      const currentTotal = elapsedTime;

      //
      return [
        ...prev,
        {
          lap: prev.length + 1,
          lapTime: currentTotal - lastTotal,
          totalTime: currentTotal,
        },
      ];
    });
  };

  return { status, laps, elapsedTime, start, stop, reset, lap };
};
