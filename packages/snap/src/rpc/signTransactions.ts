import {
  transactions,
  InMemorySigner,
  KeyPair,
} from "near-api-js";
import { InMemoryKeyStore } from "near-api-js/lib/key_stores";
import { SignedTransaction } from "near-api-js/lib/transaction";
import { getKeyPair } from "../near/account";
import { SnapProvider } from "@metamask/snap-types";

export interface SignTransactionParams {
  transactinons: transactions.Transaction[];
  network: string;
}

export async function signTransactions(
  wallet: SnapProvider
): Promise<[Uint8Array, SignedTransaction][]> {
  const signedTransactions: [Uint8Array, SignedTransaction][] = [];

  const params = wallet.request.params as unknown as SignTransactionParams;
 
  const keyPairMetamask = await getKeyPair(wallet);

  const keyPair = KeyPair.fromString(keyPairMetamask.privateKey);

  // keystore
  const keystore = new InMemoryKeyStore();
  const accountId = keyPair.getPublicKey().toString();
  keystore.setKey(params.network, accountId, keyPair);

  const signer = new InMemorySigner(keystore);

  params.transactinons.forEach(async (transaction) => {
    try {
      const signedTransaction = await transactions.signTransaction(
        transaction,
        signer,
        accountId,
        params.network
      );
      signedTransactions.push(signedTransaction);
    } catch (e) {
      console.log(`Failed to sign transaaction: ${transaction} Error: `, e);
    }
  });
  return signedTransactions;
}
