export type ActionJson = { enum: string } & object;

export interface TransactionJson {
  receiverId: string;
  actions: ActionJson[];
}

export interface SignTransactionsParams {
  transactions: TransactionJson[];
  network: NearNetwork;
}

export type NearNetwork = "testnet" | "mainnet";
