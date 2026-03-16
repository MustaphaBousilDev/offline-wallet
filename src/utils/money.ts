export function toMinorUnits(amount: number): number {
  return Math.round(amount * 100);
}
export function fromMinorUnits(amount: number): number {
  return amount / 100;
}
