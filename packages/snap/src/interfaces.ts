import { transactions } from "near-api-js";

export interface SignTransactionsParams {
  transactions: transactions.Transaction[];
  network: NearNetwork;
}

export type NearNetwork = "testnet" | "mainnet";
