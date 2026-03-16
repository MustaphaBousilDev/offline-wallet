import { QueueRepo } from "../repositories/queuRepo";
import { QueueState } from "../models/syncQueu";
import { SyncEngine } from "./syncEngine";
import { computeNextRetry } from "./backoff";

export class QueueManager {

  static async processQueue() {

    const items = QueueRepo.getQueued();

    for (const item of items) {

      if (item.nextRetryAt && item.nextRetryAt > Date.now()) {
        continue;
      }

      item.state = QueueState.PROCESSING;
      item.lockedAt = Date.now();
      item.updatedAt = Date.now();

      QueueRepo.update(item);

      try {

        await SyncEngine.sendTransaction(item.id, item.transactionId);

      } catch (err: any) {

        item.retryCount += 1;

        item.state = QueueState.QUEUED;

        item.lastError = err.message;

        item.nextRetryAt = computeNextRetry(item.retryCount);

        item.updatedAt = Date.now();

        QueueRepo.update(item);

      }
    }
  }
}