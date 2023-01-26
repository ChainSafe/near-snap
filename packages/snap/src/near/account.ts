import { Buffer } from "buffer";
import { JsonBIP44Node } from "@metamask/key-tree";
import { SnapProvider } from "@metamask/snap-types";
import bs58 from "bs58";
import { KeyPair } from "near-api-js";
import nacl from "tweetnacl";
import { NearNetwork } from "../interfaces";

const nearNetwork = {
  mainnet: 397,
  testnet: 1,
};

export async function getKeyPair(
  wallet: SnapProvider,
  network: NearNetwork
): Promise<KeyPair> {
  const node = (await wallet.request({
    method: `snap_getBip32Entropy`,
    params: {
      path: ["m", "44'", `${nearNetwork[network]}'`, "0'"],
      curve: "ed25519",
    },
  })) as JsonBIP44Node;

  const seed = Uint8Array.from(
    Buffer.from(node.privateKey.substring(2), "hex")
  );
  const secretKey = nacl.sign.keyPair.fromSeed(seed).secretKey;

  return KeyPair.fromString(bs58.encode(secretKey));
}
