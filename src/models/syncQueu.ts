export enum QueueState {
  QUEUED = "queued",
  PROCESSING = "processing",
  SUCCEEDED = "succeeded",
  FAILED = "failed",
  DEAD = "dead",
}

export enum QueueOperation {
  CREATE_TRANSACTION = "create_transaction",
}

export interface SyncQueueItem {
  id: string;

  transactionId: string;

  operation: QueueOperation;

  state: QueueState;

  retryCount: number;

  nextRetryAt: number | null;

  lastError: string | null;

  createdAt: number;

  updatedAt: number;

  lockedAt: number | null;
}
