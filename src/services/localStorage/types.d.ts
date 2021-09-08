export interface ILocalStorage {
  getItem(x: string): string | number;
  setItem(x: string, y: string | number): void;
  clearLocalStorage(): void;
}

export type SetItemUnion = string | number | NodeJS.Timer;
