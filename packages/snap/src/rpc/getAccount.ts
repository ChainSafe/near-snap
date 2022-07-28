import { SnapRpcRequest } from "../interfaces";
import { getKeyPair } from "../near/account";

export async function getAccount(request: SnapRpcRequest): Promise<string> {
  const keyPair = await getKeyPair(request);
  return keyPair.address;
}
