import { NetworkMonitor } from "../core/networkMonitor";

export function initializeApp() {
  NetworkMonitor.start();
}
