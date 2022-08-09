import { object, string, array } from "superstruct";

const networkSchema = string();

export const signTransactionsSchema = object({
  network: networkSchema,
  transactions: array(),
});

export const validAccountSchema = object({
  network: networkSchema,
});
