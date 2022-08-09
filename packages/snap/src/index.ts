import { OnRpcRequestHandler } from "@metamask/snap-types";
import { assert } from "superstruct";
import { getAccount } from "./rpc/getAccount";
import { signTransactions } from "./rpc/signTransactions";
import { signTransactionsSchema, validAccountSchema } from "./utils/params";

export enum Methods {
  GetAddress = "near_getAccount",
  SignTransaction = "near_signTransactions",
}

export const onRpcRequest: OnRpcRequestHandler = async ({ request }) => {
  switch (request.method) {
    case Methods.GetAddress:
      assert(request.params, validAccountSchema);
      return await getAccount(wallet, request.params.network);
    case Methods.SignTransaction:
      assert(request.params, signTransactionsSchema);
      return await signTransactions(wallet, request.params);

    default:
      throw new Error("Method not found.");
  }
};
