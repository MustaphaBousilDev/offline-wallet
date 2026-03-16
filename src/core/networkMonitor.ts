import * as Network from "expo-network";
import { QueueManager } from "./queueManager";

export class NetworkMonitor {
  static start() {
    setInterval(async () => {
      const state = await Network.getNetworkStateAsync();

      if (state.isConnected && state.isInternetReachable) {
        await QueueManager.processQueue();
      }
    }, 5000);
  }
}
