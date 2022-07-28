import {
  getBIP44AddressKeyDeriver,
  JsonBIP44CoinTypeNode,
} from "@metamask/key-tree";
import { SnapProvider } from "@metamask/snap-types";

export interface KeyPair {
  address: string;
  privateKey: string;
  publicKey: string;
}

const nearCoinType = 397;

export async function getKeyPair(wallet: SnapProvider): Promise<KeyPair> {
  const bip44Node = (await wallet.request({
    method: `snap_getBip44Entropy_${nearCoinType}`,
    params: [],
  })) as JsonBIP44CoinTypeNode;

  const deriveNearAddress = await getBIP44AddressKeyDeriver(bip44Node);

  const addressKey0 = await deriveNearAddress(0);
  return {
    address: addressKey0.address,
    privateKey: addressKey0.privateKey,
    publicKey: addressKey0.publicKey,
  };
}
