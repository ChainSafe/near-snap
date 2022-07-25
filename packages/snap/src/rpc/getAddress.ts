import { getKeyPair } from "../near/account";
import { Wallet } from "../interfaces";


export async function getAddress(wallet: Wallet): Promise<string> {
  const keyPair = await getKeyPair(wallet);
  return keyPair.address;
}
