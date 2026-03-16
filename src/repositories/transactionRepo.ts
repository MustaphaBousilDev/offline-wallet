import { Transaction } from "../models/transaction";
import { getObject, setObject } from "../storage/mmkv";
import { STORAGE_KEY } from "../storage/storageKeys";

export class TransactionRepo {
  static getAll(): Transaction[] {
    const index = getObject<string[]>(STORAGE_KEY.TX_INDEX) || [];
    return index
      .map((id) => getObject<Transaction>(STORAGE_KEY.TX_ITEM(id)))
      .filter(Boolean) as Transaction[];
  }

  static getById(id: string): Transaction | null {
    return getObject<Transaction>(STORAGE_KEY.TX_ITEM(id));
  }

  static save(tx: Transaction) {
    const index = getObject<string[]>(STORAGE_KEY.TX_INDEX) || [];

    if (!index.includes(tx.id)) {
      index.push(tx.id);
      setObject(STORAGE_KEY.TX_INDEX, index);
    }

    setObject(STORAGE_KEY.TX_ITEM(tx.id), tx);
  }

  static update(tx: Transaction) {
    setObject(STORAGE_KEY.TX_ITEM(tx.id), tx);
  }
}
