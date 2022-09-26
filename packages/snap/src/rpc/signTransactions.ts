import { transactions, InMemorySigner, utils } from "near-api-js";
import { InMemoryKeyStore } from "near-api-js/lib/key_stores";
import { SnapProvider } from "@metamask/snap-types";
import { getKeyPair } from "../near/account";
import { SignTransactionsParams } from "../interfaces";
import { createAction } from "../utils/createAction";
import { showConfirmationDialog } from "../utils/confirmation";
import { messageCreator } from "../utils/messageCreator";
import { getAccount } from "./getAccount";

export async function signTransactions(
  wallet: SnapProvider,
  params: SignTransactionsParams
): Promise<[Uint8Array, Uint8Array][]> {
  const signedTransactions: [Uint8Array, Uint8Array][] = [];
  const { transactions: transactionsArray, network } = params;

  const keyPair = await getKeyPair(wallet, network);
  // keystore
  const keystore = new InMemoryKeyStore();
  const { accountId } = await getAccount(wallet, params.network);

  await keystore.setKey(network, accountId, keyPair);

  const signer = new InMemorySigner(keystore);

  //confirmation
  const confirmation = await showConfirmationDialog(wallet, {
    description: `It will be signed with address: ${accountId}`,
    prompt: `Do you want to sign this message${
      transactionsArray.length > 1 ? "s" : ""
    }?`,
    textAreaContent: messageCreator(transactionsArray),
  });
  if (!confirmation) throw Error("Transaction not confirmed");

  for (const transactionData of transactionsArray) {
    try {
      const transaction = transactions.createTransaction(
        accountId,
        keyPair.getPublicKey(),
        transactionData.receiverId,
        transactionData.nonce,
        transactionData.actions.map(createAction),
        utils.serialize.base_decode(transactionData.recentBlockHash)
      );
      const signedTransaction = await transactions.signTransaction(
        transaction,
        signer,
        accountId,
        network
      );
      signedTransactions.push([
        signedTransaction[0],
        signedTransaction[1].encode(),
      ]);
    } catch (e) {
      throw new Error(
        `Failed to sign transaction because: ${(e as Error).message}`
      );
    }
  }
  return signedTransactions;
}
