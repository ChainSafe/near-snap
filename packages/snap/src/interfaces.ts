import {Action} from "near-wallet-selector" 

export type ActionJson = { enum: string } & object;
export interface TransactionJson {
  receiverId: string;
  actions: Action[];
  nonce: number;
  recentBlockHash: string;
}

export interface SignTransactionsParams {
  transactions: TransactionJson[];
  network: NearNetwork;
}

export type NearNetwork = "testnet" | "mainnet";
