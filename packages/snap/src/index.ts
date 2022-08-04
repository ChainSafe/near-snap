import { OnRpcRequestHandler } from "@metamask/snap-types";
import { getAccount } from "./rpc/getAccount";
import { signTransactions } from "./rpc/signTransactions";
import { isValidAccountParams, isValidSignTransactions } from "./utils/params";

export enum Methods {
  GetAddress = "near_getAccount",
  SignTransaction = "near_signTransactions",
}

export const onRpcRequest: OnRpcRequestHandler = async ({ request }) => {
  switch (request.method) {
    case Methods.GetAddress:
      isValidAccountParams(request.params);
      return await getAccount(wallet, request.params.network);
    case Methods.SignTransaction:
      isValidSignTransactions(request.params);
      return await signTransactions(wallet, request.params.signTransactions);

    default:
      throw new Error("Method not found.");
  }
};
