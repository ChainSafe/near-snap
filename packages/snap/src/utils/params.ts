import { SignTransactionsParams, NearNetwork } from "../interfaces";

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

export function isValidAccountParams(params: unknown): asserts params is {
  network: NearNetwork;
} {
  if (!(params != null && typeof params == "object" && "network" in params)) {
    throw new Error(
      "Invalid network parameter, 'testnet' or 'mainnet' required"
    );
  }
}
