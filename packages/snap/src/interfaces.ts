export interface Wallet {
  request(options: { method: string; params?: unknown[] }): unknown;
}