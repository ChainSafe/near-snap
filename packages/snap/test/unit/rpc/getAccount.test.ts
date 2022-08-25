import chai, { expect } from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";
import { getAccount } from "../../../src/rpc/getAccount";
import {
  bip44Entropy1Node,
  bip44Entropy397Node,
} from "../near/bip44Entropy.mock";
import { mockSnapProvider } from "../wallet.stub";

chai.use(sinonChai);

describe("Test rpc handler function: getAccount", function () {
  const sanbox = sinon.createSandbox();
  const walletStub = mockSnapProvider(sanbox);

  afterEach(function () {
    sanbox.reset();
  });

  it("should return valid address for mainnet", async function () {
    walletStub.request
      .withArgs(sinon.match.has("method", "snap_getBip44Entropy_397"))
      .resolves(bip44Entropy397Node);

    const account = await getAccount(walletStub, "mainnet");

    expect(account).to.be.eq(
      "3336393866646334313564363164656335373631653766633037616631313233"
    );
  });

  it("should return valid address for testnet", async function () {
    walletStub.request
      .withArgs(sinon.match.has("method", "snap_getBip44Entropy_1"))
      .resolves(bip44Entropy1Node);

    const account = await getAccount(walletStub, "testnet");

    expect(account).to.be.eq(
      "3132386337633930653166376133666131613462343439663363383730373338"
    );
  });
});
