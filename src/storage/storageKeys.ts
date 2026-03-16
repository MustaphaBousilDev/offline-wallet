export const STORAGE_KEY = {
  WALLET_SNAPSHOT: "wallet:snapshot",
  TX_INDEX: "tx:index",
  TX_ITEM: (id: string) => `tx:${id}`,
  QUEUE_INDEX: "queue:index",
  QUEUE_ITEM: (id: string) => `queue:${id}`,
};


