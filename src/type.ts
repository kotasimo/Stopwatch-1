// 表示
export type Status = "idle" | "running" | "stopped";

// ラップ
export type Lap = {
  lap: number;
  lapTime: number; // ms
  totalTime: number; // ms
};
