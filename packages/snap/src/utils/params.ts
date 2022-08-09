import { object, any, array, defaulted, Describe, enums } from "superstruct";
import { transactions } from "near-api-js";
import { NearNetwork, SignTransactionsParams } from "../interfaces";

export const networkSchemaDefaulted: Describe<NearNetwork> = defaulted(
  enums(["testnet", "mainnet"]),
  () => "testnet"
);

export const networkSchema: Describe<NearNetwork> = enums([
  "testnet",
  "mainnet",
]);

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const transaction: Describe<transactions.Transaction> = any();

export const signTransactionsSchema: Describe<SignTransactionsParams> = object({
  network: networkSchema,
  transactions: array(transaction),
});

export const validAccountSchema: Describe<{ network: NearNetwork }> = object({
  network: networkSchema,
});
