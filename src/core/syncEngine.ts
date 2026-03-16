// Simulates a server response
import { TransactionRepo } from "../repositories/transactionRepo";
import { QueueRepo } from "../repositories/queuRepo";
import { TransactionStatus } from "../models/transaction";
import { QueueState } from "../models/syncQueu";

export class SyncEngine {
    static async sendTransaction(queueItemId: string, transactionId: string){
        const tx = TransactionRepo.getById(transactionId);
        if (!tx) throw new Error("Transaction not found");
        tx.status = TransactionStatus.SYNCING;
        tx.updatedAt = Date.now();
        TransactionRepo.update(tx);
        await new Promise((r) => setTimeout(r, 1200));
        const success = Math.random() > 0.3;
        if (!success) {
           throw new Error("Network error");
        }
        tx.status = TransactionStatus.CONFIRMED;
        tx.updatedAt = Date.now();
        TransactionRepo.update(tx);

        const queueItem = QueueRepo.getById(queueItemId);
        if (!queueItem) return;
        queueItem.state = QueueState.SUCCEEDED;
        queueItem.updatedAt = Date.now();
        QueueRepo.update(queueItem);
    }
}