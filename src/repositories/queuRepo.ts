import { QueueState, SyncQueueItem } from "../models/syncQueu";
import { getObject, setObject } from "../storage/mmkv";
import { STORAGE_KEY } from "../storage/storageKeys";

export class QueueRepo {
  static enqueue(item: SyncQueueItem) {
    const index = getObject<string[]>(STORAGE_KEY.QUEUE_INDEX) || [];

    if (!index.includes(item.id)) {
      index.push(item.id);
      setObject(STORAGE_KEY.QUEUE_INDEX, index);
    }

    setObject(STORAGE_KEY.QUEUE_ITEM(item.id), item);
  }

  static getById(id: string): SyncQueueItem | null {
    return getObject<SyncQueueItem>(STORAGE_KEY.QUEUE_ITEM(id));
  }

  static getQueued(): SyncQueueItem[] {
    const index = getObject<string[]>(STORAGE_KEY.QUEUE_INDEX) || [];

    return index
      .map((id) => getObject<SyncQueueItem>(STORAGE_KEY.QUEUE_ITEM(id)))
      .filter(
        (item) => item && item.state === QueueState.QUEUED,
      ) as SyncQueueItem[];
  }

  static update(item: SyncQueueItem) {
    setObject(STORAGE_KEY.QUEUE_ITEM(item.id), item);
  }
}
