import Joi from "joi";
import { SignTransactionsParams, NearNetwork } from "../interfaces";

const networkSchema = Joi.string()
  .valid(["mainnet", "testnet"])
  .required()
  .messages({
    "string.valid":
      "Invalid network parameter, 'testnet' or 'mainnet' required",
    "any.required": "Missing field 'network'",
  });

export const signTransactionsSchema = Joi.object<SignTransactionsParams, true>({
  network: networkSchema,
  transactions: Joi.array().required(),
});

export const validAccountSchema = Joi.object<{ network: NearNetwork }, true>({
  network: networkSchema,
});

export function validateParams<T>(
  schema: Joi.ObjectSchema<T>,
  params: unknown
): asserts params is T {
  const { error } = schema.validate(params);
  if (error) throw error;
}
