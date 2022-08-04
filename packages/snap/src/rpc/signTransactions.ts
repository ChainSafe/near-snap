import { transactions, InMemorySigner } from "near-api-js";
import { InMemoryKeyStore } from "near-api-js/lib/key_stores";
import { SignedTransaction } from "near-api-js/lib/transaction";
import { SnapProvider } from "@metamask/snap-types";
import { getKeyPair } from "../near/account";
import { SignTransactionsParams } from "../interfaces";

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

  for (const transaction of transactionsArray) {
    try {
      const signedTransaction = await transactions.signTransaction(
        transaction,
        signer,
        accountId,
        network
      );
      signedTransactions.push(signedTransaction);
    } catch (e) {
      throw new Error(`Failed to sign transaction`);
    }
  }

  return signedTransactions;
}
