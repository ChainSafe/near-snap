import { transactions, utils } from "near-api-js";
import BN from "bn.js";
import { ActionJson } from "../interfaces";

export const mapActions = (actions: ActionJson[]): transactions.Action[] =>
  actions.map(
    ({ enum: name, ...rest }): transactions.Action =>
      (() => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
        const values: Object = (rest as any)[name];
        switch (name) {
          case "createAccount":
            return transactions.createAccount();
          case "deployContract":
            return transactions.deployContract(
              (values as { code: Uint8Array }).code
            );
          case "functionCall": {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const { methodName, args, gas, deposit, jsContract } = values as {
              methodName: string;
              args: Uint8Array | object;
              gas: string;
              deposit: string;
              jsContract: boolean;
            };
            return transactions.functionCall(
              methodName,
              args,
              new BN(gas),
              new BN(deposit),
              undefined, // TODO: see how to handle stringify
              jsContract
            );
          }
          case "transfer":
            return transactions.transfer(
              new BN((values as { deposit: string }).deposit)
            );
          case "stake":
            return transactions.stake(
              new BN((values as { stake: string }).stake),
              (values as { publicKey: utils.PublicKey }).publicKey // TODO: see how to handle PublicKey
            );
          case "addKey":
            return transactions.addKey(
              (values as { publicKey: utils.PublicKey }).publicKey, // TODO: see how to handle PublicKey
              (values as { accessKey: transactions.AccessKey }).accessKey // TODO: see how to handle AccessKey
            );
          case "deleteKey":
            return transactions.deleteKey(
              (values as { publicKey: utils.PublicKey }).publicKey // TODO: see how to handle PublicKey
            );
          case "deleteAccount":
            return transactions.deleteAccount(
              (values as { beneficiaryId: string }).beneficiaryId
            );
          default:
            throw new Error(`Unknown action: ${name}`);
        }
      })()
  );
