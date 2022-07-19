import type { SnapProvider } from "@metamask/snap-types";

declare const wallet: SnapProvider;

export enum Methods {
  near = "near",
}
// eslint-disable-next-line
wallet.registerRpcMessageHandler(async (originString, requestObject) => {
  switch (requestObject.method) {
    case "near":
      return "snap";

    default:
      throw new Error("Method not found.");
  }
});

export {};
