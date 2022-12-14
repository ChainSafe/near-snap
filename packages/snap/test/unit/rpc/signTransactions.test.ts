import chai, { expect } from "chai";
import sinonChai from "sinon-chai";
import chaiAsPromised from "chai-as-promised";
import sinon from "sinon";
import { FunctionCallAction } from "@near-wallet-selector/core";
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
    expect(result[0][0]).to.be.eq("fa7a2bbff2fed7e20cd093b692ead02db8e4cb97f7cff53b3c9bcad6dfe26be7")
    expect(result[0][1]).to.be.eq("4000000037313330343536666337656631613730373630376336663532333737633964313061383637376539383066666364623562333735356236303165316561383966007130456fc7ef1a707607c6f52377c9d10a8677e980ffcdb5b3755b601e1ea89f8855b081845a00001200000067756573742d626f6f6b2e746573746e657444f97176d3033330a0e771db3ccfc456d603e0db8231a28cfa0aba6de73bf26101000000020a0000006164644d657373616765120000007b2274657874223a226d657373616765227d00e057eb481b0000000000000000000000000000000000000098872b6c0ac72029df6f055b199229434c904dcbcd15de66fa6834d56e079f57503adf5227314d14a6c74a2bf267fdc80237f9d8145f4900bd8b7b90814d7e08")
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
