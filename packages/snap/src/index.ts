import { OnRpcRequestHandler } from "@metamask/snap-types";
import { getAccount } from "./rpc/getAccount";
import { signTransactions } from "./rpc/signTransactions";
import { isValidSignTransactions } from "./utils/params";

export enum Methods {
  GetAddress = "near_getAccount",
  SignTransaction = "near_signTransactions",
}

export const onRpcRequest: OnRpcRequestHandler = async ({ request }) => {
  switch (request.method) {
    case Methods.GetAddress:
      return await getAccount(wallet);
    case Methods.SignTransaction:
      isValidSignTransactions(request.params);
      return await signTransactions(wallet, request.params.signTransactions);

    default:
      throw new Error("Method not found.");
  }
};
