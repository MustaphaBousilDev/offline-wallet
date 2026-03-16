export function computeNextRetry(retryCount: number) : number {
    const baseDelay = 2000;
    const maxDelay = 60000
    const delay = Math.min(baseDelay*Math.pow(2,retryCount), maxDelay)
    return Date.now() + delay;
}