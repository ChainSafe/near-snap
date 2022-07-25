import type { OnRpcRequestHandler, SnapProvider } from "@metamask/snap-types";
import { Wallet } from "./interfaces";

export enum Methods {
  near = "near",
}

declare let wallet: Wallet;

// eslint-disable-next-line
export const onRpcRequest: OnRpcRequestHandler = (async ({ origin, request }) => {
  switch (request.method) {
    case "near":
      return wallet.request({
        method: 'snap_notify',
        params: [
          {
            type: 'inapp',
            message: "message",
          },
        ],
      });

    default:
      throw new Error("Method not found.");
  }
});

