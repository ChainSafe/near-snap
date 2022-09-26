import {
  Action,
  DeleteAccountAction,
  DeleteKeyAction,
  DeployContractAction,
  FunctionCallAction,
  StakeAction,
  TransferAction,
} from "@near-wallet-selector/core";

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

export type ActionWithParams =
  | DeployContractAction
  | FunctionCallAction
  | TransferAction
  | StakeAction
  | DeleteKeyAction
  | DeleteAccountAction;
