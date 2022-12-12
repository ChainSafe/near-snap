import chai, { expect } from "chai";
import sinonChai from "sinon-chai";
import chaiAsPromised from "chai-as-promised";
import sinon from "sinon";
import { FunctionCallAction } from "@near-wallet-selector/core";
import { SignedTransaction } from "near-api-js/lib/transaction";
import { mockSnapProvider } from "../wallet.stub";
import { signTransactions } from "../../../src/rpc/signTransactions";
import { bip32Entropy1Node } from "../near/bip32Entropy.mock";

chai.use(sinonChai);
chai.use(chaiAsPromised);

describe("Test rpc handler function: signTransactions", function () {
  const sandbox = sinon.createSandbox();
  const walletStub = mockSnapProvider(sandbox);

  afterEach(function () {
    sandbox.reset();
  });

  it("should return valid transactions for testnet", async function () {
    walletStub.request
      .withArgs(sinon.match.has("method", "snap_getBip32Entropy"))
      .resolves(bip32Entropy1Node);
    walletStub.request
      .withArgs(sinon.match.has("method", "snap_confirm"))
      .resolves(true);
    const actions = [
      {
        type: "FunctionCall",
        params: {
          methodName: "addMessage",
          args: { text: "message" },
          gas: "30000000000000",
          deposit: "0",
        },
      } as FunctionCallAction,
    ];
    const nonce = 99525158000008;
    const recentBlockHash = "5eFLGqqcxEQnHpFoisBnf6HE8RqunTxCz3qP9Zfz28ue";
    const result = await signTransactions(walletStub, {
      network: "testnet",
      transactions: [
        {
          receiverId: "guest-book.testnet",
          actions,
          nonce,
          recentBlockHash,
        },
      ],
    });
    const decodedResult = Uint8Array.from(Buffer.from(result[0][1], 'hex'))
    expect(decodedResult).to.be.an.instanceOf(Uint8Array);
  });

  it("should fail without confirmation", async function () {
    walletStub.request
      .withArgs(sinon.match.has("method", "snap_getBip32Entropy"))
      .resolves(bip32Entropy1Node);

    const actions = [
      {
        type: "wrong",
        params: {
          methodName: "addMessage",
          args: { text: "message" },
          gas: "30000000000000",
          deposit: "0",
        },
      } as unknown as FunctionCallAction,
    ];
    const nonce = 1;
    const recentBlockHash = new Uint8Array(32).toString();
    await expect(
      signTransactions(walletStub, {
        network: "testnet",
        transactions: [
          {
            receiverId:
              "561ddb98e0b17cd42bf3f65b0d5147f7abff7f0d341c08cb89d31de8a788f948",
            actions,
            nonce,
            recentBlockHash,
          },
        ],
      })
    ).to.rejectedWith("Transaction not confirmed");
  });

  it("should fail on wrong action", async function () {
    walletStub.request
      .withArgs(sinon.match.has("method", "snap_getBip32Entropy"))
      .resolves(bip32Entropy1Node);
    walletStub.request
      .withArgs(sinon.match.has("method", "snap_confirm"))
      .resolves(true);

    const actions = [
      {
        type: "wrong",
        params: {
          methodName: "addMessage",
          args: { text: "message" },
          gas: "30000000000000",
          deposit: "0",
        },
      } as unknown as FunctionCallAction,
    ];
    const nonce = 1;
    const recentBlockHash = new Uint8Array(32).toString();

    await expect(
      signTransactions(walletStub, {
        network: "testnet",
        transactions: [
          {
            receiverId:
              "561ddb98e0b17cd42bf3f65b0d5147f7abff7f0d341c08cb89d31de8a788f948",
            actions,
            nonce,
            recentBlockHash,
          },
        ],
      })
    ).to.rejectedWith(
      "Failed to sign transaction because: Invalid action type"
    );
  });
});
