import { OnRpcRequestHandler } from "@metamask/snap-types";
import { getAccount } from "./rpc/getAccount";
import { signTransactions } from "./rpc/signTransactions";

export enum Methods {
  GetAddress = "near_getAccount",
  SignTransaction = "near_signTransactions",
}

export const onRpcRequest: OnRpcRequestHandler = async ({ request }) => {
  switch (request.method) {
    case Methods.GetAddress:
      return await getAccount(request);
    case Methods.SignTransaction:
      return await signTransactions(request);

    default:
      throw new Error("Method not found.");
  }
};
