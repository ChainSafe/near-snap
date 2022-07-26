import type { OnRpcRequestHandler } from "@metamask/snap-types";
import { Wallet } from "./interfaces";
import { getAccount } from "./rpc/getAccount";
import { signTransactions } from "./rpc/signTransactions";

declare let wallet: Wallet;

export enum Methods {
  GetAddress = "near_getAccount",
  SignTransaction = "near_signTransactions",
}

// eslint-disable-next-line
export const onRpcRequest: OnRpcRequestHandler = (async ({ origin, request }) => {

  const { params } = request;

  switch (request.method) {
    case Methods.GetAddress:
      return await getAccount(wallet);
    case Methods.SignTransaction:
      return await signTransactions(wallet, params);

    default:
      throw new Error("Method not found.");
  }
  // eslint-disable-next-line
});
