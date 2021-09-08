import { StorageNumberTypes, StorageNumberTypesUnion } from './enums';
import { ILocalStorage, SetItemUnion } from './types';

class LocalStorage implements ILocalStorage {
  private numberTypes = Object.values(StorageNumberTypes) as string[];

  getItem(item: StorageNumberTypesUnion): number;
  getItem(item: string): string;
  getItem(item: string) {
    if (this.numberTypes.includes(item)) {
      const searchedItem = window.localStorage.getItem(item);
      return Number(searchedItem);
    }
    return window.localStorage.getItem(item);
  };

  setItem(item: string, value: SetItemUnion) {
    window.localStorage.setItem(item, value.toString());
  };

  clearLocalStorage() {
    window.localStorage.clear();
  };
}

export default new LocalStorage();
