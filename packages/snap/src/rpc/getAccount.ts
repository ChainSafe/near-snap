import { SnapProvider } from "@metamask/snap-types";
import { getKeyPair } from "../near/account";

export async function getAccount(wallet: SnapProvider): Promise<string> {
  const keyPair = await getKeyPair(wallet);
  return keyPair.address;
}
