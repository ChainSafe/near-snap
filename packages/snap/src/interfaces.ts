export type ActionJson = { enum: string } & object;

export interface SignTransactionsParams {
  transactions: Array<{
    receiverId: string;
    actions: ActionJson[];
  }>;
  network: NearNetwork;
}

export type NearNetwork = "testnet" | "mainnet";
