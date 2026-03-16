export interface WalletSnapshot {
  walletId: string;

  /*** Balance in minor units (ex: $10.50 = 1050)*/
  availableBalance: number;

  /*** Total pending debits not yet confirmed*/
  pendingDebitTotal: number;

  /*** Total pending credits not yet confirmed*/
  pendingCreditTotal: number;

  /*** Timestamp of last computation*/
  lastComputedAt: number;

  /*** Incremented whenever snapshot changes*/
  revision: number;
}
