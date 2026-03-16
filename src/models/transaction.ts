export enum TransactionStatus {
  PENDING = "pending",
  SYNCING = "syncing",
  CONFIRMED = "confirmed",
  FAILED = "failed",
  CANCELED = "cancelled",
}

export enum TransactionType {
    DEBIT = "debit",
    CREDIT = "credit"
}

export interface Transaction {
    id: string;
    walletId: string;
    type: TransactionType;
    /**Amount stored in minor units, Example: $10.50 = 1050 */
    amount: number;
    currency: string;
    status: TransactionStatus;
    origin: "local" | "remote";
    createdAt: number;
    updatedAt: number;
    /**user for reconciliation or conflit resolution */
    version: number;
}
