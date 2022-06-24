export interface Dictionary<T> {
  [Key: string]: T;
}

export enum KEY_STATE {
  CORRECT = " correct",
  CONTAINED = " contained",
  INCORRECT = " incorrect",
}
