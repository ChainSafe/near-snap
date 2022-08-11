import { transactions, InMemorySigner, providers, utils } from "near-api-js";
import { InMemoryKeyStore } from "near-api-js/lib/key_stores";
import { SignedTransaction } from "near-api-js/lib/transaction";
import { SnapProvider } from "@metamask/snap-types";
import { getKeyPair } from "../near/account";
import { SignTransactionsParams } from "../interfaces";
import { mapActions } from "../utils/mapActions";

export async function signTransactions(
  wallet: SnapProvider,
  params: SignTransactionsParams
): Promise<[Uint8Array, SignedTransaction][]> {
  const signedTransactions: [Uint8Array, SignedTransaction][] = [];

  const { transactions: transactionsArray, network } = params;

  const keyPair = await getKeyPair(wallet, network);

  // keystore
  const keystore = new InMemoryKeyStore();
  const accountId = keyPair.getPublicKey().toString();
  await keystore.setKey(network, accountId, keyPair);

  const signer = new InMemorySigner(keystore);

  const provider = new providers.JsonRpcProvider({
    url: `https://rpc.${params.network}.near.org`,
  });

  // fetch data from chain - the latest block hash and latest nonce of account
  const accessKey = await provider.query(
    `access_key/${Buffer.from(keyPair.getPublicKey().data).toString(
      "hex"
    )}/${keyPair.getPublicKey().toString()}`,
    ""
  );
  let nonce = ++(accessKey as unknown as { nonce: number }).nonce;
  const recentBlockHash = utils.serialize.base_decode(accessKey.block_hash);

  for (const transactionData of transactionsArray) {
    try {
      const transaction = transactions.createTransaction(
        accountId,
        keyPair.getPublicKey(),
        transactionData.receiverId,
        nonce++,
        mapActions(transactionData.actions),
        recentBlockHash
      );
      const signedTransaction = await transactions.signTransaction(
        transaction,
        signer,
        accountId,
        network
      );
      signedTransactions.push(signedTransaction);
    } catch (e) {
      throw new Error(
        `Failed to sign transaction because: ${(e as Error).message}`
      );
    }
  }

  return signedTransactions;
}
