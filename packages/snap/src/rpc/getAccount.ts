import { SnapProvider } from "@metamask/snap-types";
import { NearNetwork } from "../interfaces";
import { getKeyPair } from "../near/account";

export async function getAccount(
  wallet: SnapProvider,
  network: NearNetwork
): Promise<string> {
  const keyPair = await getKeyPair(wallet, network);
  return Buffer.from(keyPair.getPublicKey().data).toString("hex");
}
