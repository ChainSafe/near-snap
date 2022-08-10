import {
  getBIP44AddressKeyDeriver,
  JsonBIP44CoinTypeNode,
} from "@metamask/key-tree";
import { SnapProvider } from "@metamask/snap-types";
import bs58 from "bs58";
import { KeyPair } from "near-api-js";
import { NearNetwork } from "../interfaces";

const nearNetwork = {
  mainnet: 397,
  testnet: 1,
};

export async function getKeyPair(
  wallet: SnapProvider,
  network: NearNetwork
): Promise<KeyPair> {
  const bip44Node = (await wallet.request({
    method: `snap_getBip44Entropy_${nearNetwork[network]}`,
    params: [],
  })) as JsonBIP44CoinTypeNode;

  const deriveNearAddress = await getBIP44AddressKeyDeriver(bip44Node);

  const addressKey0 = await deriveNearAddress(0);

  return KeyPair.fromString(bs58.encode(Buffer.from(addressKey0.privateKey)));
}
