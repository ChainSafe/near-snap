import chai, { expect } from "chai";
import sinonChai from "sinon-chai";
import { utils } from "near-api-js";
import { mockSnapProvider } from "../wallet.mock.test";
import { signTransactions } from "../../../src/rpc/signTransactions";

chai.use(sinonChai);

describe("Test rpc handler function: signTransactions", function () {
  const walletStub = mockSnapProvider();

  afterEach(function () {
    walletStub.reset();
  });

  it("should return valid transactions for testnet", async function () {
    walletStub.rpcStubs.snap_getBip44Entropy_1.resolves({
      depth: 2,
      parentFingerprint: 236413575,
      index: 2147483649,
      privateKey:
        "46ab4c562039d613618561732a813eb2950bd5e5284a18233333fbaa0aa686c2",
      publicKey:
        "0437841b2c1e32dbfa2a9e4e5626f218c83a0778032490c5cc6e5b0d0da4045357bb33ac64da0f4b5ebd889d165f834ff771db9259ce436b64bf60662df2650640",
      chainCode:
        "29603d6b1c8e6d6cef9cfe363ad4773e5087b8cfca361132a7db50d7ddca525f",
      coin_type: 1,
      path: "m / bip32:44' / bip32:1'",
    });

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
  });
});
