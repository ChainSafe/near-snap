import chai, { expect } from "chai";
import sinonChai from "sinon-chai";
import { utils } from "near-api-js";
import chaiAsPromised from "chai-as-promised";
import { mockSnapProvider } from "../wallet.mock.test";
import { signTransactions } from "../../../src/rpc/signTransactions";
import { bip44Entropy1Node } from "../near/bip44Entropy.mock";

chai.use(sinonChai);
chai.use(chaiAsPromised);

describe("Test rpc handler function: signTransactions", function () {
  const walletStub = mockSnapProvider();

  afterEach(function () {
    walletStub.reset();
  });

  it("should return valid transactions for testnet", async function () {
    walletStub.rpcStubs.snap_getBip44Entropy_1.resolves(bip44Entropy1Node);

    const actions = [
      {
        transfer: {
          deposit: utils.format.parseNearAmount("0.1"),
        },
        enum: "transfer",
      },
    ];

    const result = await signTransactions(walletStub, {
      network: "testnet",
      transactions: [
        {
          receiverId:
            "561ddb98e0b17cd42bf3f65b0d5147f7abff7f0d341c08cb89d31de8a788f948",
          actions,
        },
      ],
    });

    expect(result).to.not.be.null;
    expect(result).to.be.an("array");
  });

  it("should fail on wrong action", async function () {
    walletStub.rpcStubs.snap_getBip44Entropy_1.resolves(bip44Entropy1Node);

    const actions = [
      {
        send: {
          deposit: utils.format.parseNearAmount("0.1"),
        },
        enum: "send",
      },
    ];

    await expect(
      signTransactions(walletStub, {
        network: "testnet",
        transactions: [
          {
            receiverId:
              "561ddb98e0b17cd42bf3f65b0d5147f7abff7f0d341c08cb89d31de8a788f948",
            actions,
          },
        ],
      })
    ).to.rejectedWith();
  });
});
