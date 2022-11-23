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
      try {
        assert(request.params, validAccountSchema);
        return await getAccount(wallet, request.params.network);
      } catch (e) {
        throw new Error(
          "Invalid Request - check you have sent expected parameters"
        );
      }

    case Methods.SignTransaction:
      try {
        assert(request.params, signTransactionsSchema);
        // TODO: improve mapping from JSON to action and vice versa (required for milestone 2)
        return await signTransactions(wallet, request.params);
      } catch (e) {
        throw new Error(
          "Invalid Request - check you have sent expected parameters"
        );
      }

    default:
      throw new Error("Method not found.");
  }
};
