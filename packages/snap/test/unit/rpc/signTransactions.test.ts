import chai, { expect } from "chai";
import sinonChai from "sinon-chai";
import { utils } from "near-api-js";
import chaiAsPromised from "chai-as-promised";
import sinon from "sinon";
import { mockSnapProvider } from "../wallet.stub";
import { signTransactions } from "../../../src/rpc/signTransactions";
import { bip44Entropy1Node } from "../near/bip44Entropy.mock";

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
      .withArgs(sinon.match.has("method", "snap_getBip44Entropy_1"))
      .resolves(bip44Entropy1Node);

    const actions = [
      {
        transfer: {
          deposit: utils.format.parseNearAmount("0.1"),
        },
        enum: "transfer",
      },
    ];
    const nonce = 1;
    const recentBlockHash = "8VuXKpfKMeN642QfhURH2Sq7WPCFypubsuDiSx36vfkw";
    const result = await signTransactions(walletStub, {
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
    });

    expect(result).to.not.be.null;
    expect(result).to.be.an("array");
  });

  it("should fail on wrong action", async function () {
    walletStub.request
      .withArgs(sinon.match.has("method", "snap_getBip44Entropy_1"))
      .resolves(bip44Entropy1Node);

    const actions = [
      {
        send: {
          deposit: utils.format.parseNearAmount("0.1"),
        },
        enum: "send",
      },
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
      "Failed to sign transaction because: Unknown action: send"
    );
  });
});
