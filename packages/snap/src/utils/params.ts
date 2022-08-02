import { transactions } from "near-api-js";

export interface SignTransactionsParams {
  transactions: transactions.Transaction[];
  network: string;
}

export function isValidSignTransactions(params: unknown): asserts params is {
  signTransactions: SignTransactionsParams;
} {
  if (
    !(
      params != null &&
      typeof params == "object" &&
      "signTransactions" in params &&
      // @ts-expect-error
      "transactions" in params.signTransactions &&
      // @ts-expect-error
      "network" in params.signTransactions
    )
  ) {
    throw new Error("Invalid sign request");
  }
}
