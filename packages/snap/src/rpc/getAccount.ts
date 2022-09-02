import { SnapProvider } from "@metamask/snap-types";
import { NearNetwork } from "../interfaces";
import { getKeyPair } from "../near/account";

export async function getAccount(
  wallet: SnapProvider,
  network: NearNetwork
): Promise<{
  accountId: string;
  publicKey: string;
}> {
  const keyPair = await getKeyPair(wallet, network);
  const accountId = Buffer.from(keyPair.getPublicKey().data).toString("hex");
  const publicKey = keyPair.getPublicKey().toString();
  return {
    accountId,
    publicKey
  } 
}
