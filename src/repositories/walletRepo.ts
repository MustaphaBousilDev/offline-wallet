import { WalletSnapshot } from "../models/wallet";
import { STORAGE_KEY } from "../storage/storageKeys";
import { getObject, setObject } from "../storage/mmkv";

export class WalletRepo {

  static getSnapshot(): WalletSnapshot | null {
    return getObject<WalletSnapshot>(STORAGE_KEY.WALLET_SNAPSHOT);
  }

  static saveSnapshot(snapshot: WalletSnapshot) {
    setObject(STORAGE_KEY.WALLET_SNAPSHOT, snapshot);
  }
}