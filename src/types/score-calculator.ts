export type Matrix = {
  [row: number]: { g10: string; g11: string; g12: string; quickAvg: string; [col: string]: string };
};

export type HistoryRecord = {
  id: string;
  time: string;
  combo: string;
  major: string;
  rawTotal: number;
  priorityTotal: number;
  finalScore: number;
  benchmark: number;
  status: "PASS" | "FAIL";
};

export type ScoreResult = {
  subjectAvgs: number[];
  rawTotal: number;
  priorityTotal: number;
  finalScore: number;
  status: "PASS" | "FAIL" | "IDLE";
  messages: string[];
  benchmark: number;
};
