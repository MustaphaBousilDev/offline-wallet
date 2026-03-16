import { createMMKV } from "react-native-mmkv";
export const storage = createMMKV({
  id: "offline-wallet-storage",
});

/**Generec Helper */

export function setObject(key: string, value: unknown) {
  storage.set(key, JSON.stringify(value));
}

export function getObject<T>(key: string): T | null {
  const value = storage.getString(key);
  if (!value) {
    return null;
  }
  return JSON.parse(value) as T;
}

export function removeKey(key: string) {
  storage.remove(key);
}
