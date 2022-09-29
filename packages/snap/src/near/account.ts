import {
  getBIP44AddressKeyDeriver,
  JsonBIP44CoinTypeNode,
  JsonBIP44Node,
} from "@metamask/key-tree";
import { SnapProvider } from "@metamask/snap-types";
import bs58 from "bs58";
import { KeyPair } from "near-api-js";
import nacl from "tweetnacl";
import { NearNetwork } from "../interfaces";
import { getMetamaskVersion, isNewerVersion } from "../utils/version";

const nearNetwork = {
  mainnet: 397,
  testnet: 1,
};

export async function getKeyPair(
  wallet: SnapProvider,
  network: NearNetwork
): Promise<KeyPair> {
  let seed: Uint8Array;
  const currentVersion = await getMetamaskVersion(wallet);
  if (isNewerVersion("MetaMask/v10.18.99-flask.0", currentVersion)) {
    const node = (await wallet.request({
      method: `snap_getBip32Entropy`,
      params: {
        path: ["m", "44'", `${nearNetwork[network]}'`, "0'"],
        curve: "ed25519",
      },
    })) as JsonBIP44Node;

    seed = Uint8Array.from(Buffer.from(node.privateKey, "hex"));
  } else {
    const bip44Node = (await wallet.request({
      method: `snap_getBip44Entropy_${nearNetwork[network]}`,
      params: [],
    })) as JsonBIP44CoinTypeNode;
    const deriveNearAddress = await getBIP44AddressKeyDeriver(bip44Node);
    const addressKey0 = await deriveNearAddress(0);

    seed = Uint8Array.from(Buffer.from(addressKey0.privateKey.slice(0, 32)));
  }

  const secretKey = nacl.sign.keyPair.fromSeed(seed).secretKey;
  return KeyPair.fromString(bs58.encode(secretKey));
}
