import { WalletSnapshot } from "../models/wallet";
import { getObject, setObject } from "../storage/mmkv";
import { STORAGE_KEY } from "../storage/storageKeys";

export class WalletRepo {
  static getSnapshot(): WalletSnapshot | null {
    return getObject<WalletSnapshot>(STORAGE_KEY.WALLET_SNAPSHOT);
  }

  static saveSnapshot(snapshot: WalletSnapshot) {
    setObject(STORAGE_KEY.WALLET_SNAPSHOT, snapshot);
  }
}
