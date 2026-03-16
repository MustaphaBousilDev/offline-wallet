import { Transaction, TransactionStatus, TransactionType } from "../models/transaction";
import { SyncQueueItem, QueueOperation, QueueState } from "../models/syncQueu";
import { TransactionRepo } from "../repositories/transactionRepo";
import { QueueRepo } from "../repositories/queuRepo";
import { WalletRepo } from "../repositories/walletRepo";
import { generateId } from "../utils/id";

export class TransactionService {

  static async sendMoney(amount: number) {

    const txId = await generateId();
    const now = Date.now();

    const transaction: Transaction = {
      id: txId,
      walletId: "default-wallet",
      type: TransactionType.DEBIT,
      amount,
      currency: "USD",
      status: TransactionStatus.PENDING,
      origin: "local",
      createdAt: now,
      updatedAt: now,
      version: 1,
    };

    // save transaction locally
    TransactionRepo.save(transaction);

    // update wallit snapshot
    this.updateWalletSnapshot(transaction);

    // add queue item for sync
    const queueItem: SyncQueueItem = {
      id: txId,
      transactionId: txId,
      operation: QueueOperation.CREATE_TRANSACTION,
      state: QueueState.QUEUED,
      retryCount: 0,
      nextRetryAt: null,
      lastError: null,
      createdAt: now,
      updatedAt: now,
      lockedAt: null,
    };

    QueueRepo.enqueue(queueItem);
  }

  private static updateWalletSnapshot(transaction: Transaction) {

    const snapshot = WalletRepo.getSnapshot();

    if (!snapshot) return;

    snapshot.availableBalance -= transaction.amount;
    snapshot.pendingDebitTotal += transaction.amount;
    snapshot.lastComputedAt = Date.now();
    snapshot.revision += 1;

    WalletRepo.saveSnapshot(snapshot);
  }
}