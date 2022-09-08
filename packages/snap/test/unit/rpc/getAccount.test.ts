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

    expect(account).to.be.eql(
      {
        accountId: '8e4a06da6413537b4c0227ead35ac644667867a459a058f65d90a8ca4983c20c',
        publicKey: 'ed25519:AaSN3EVag78E3xPSXb1Cr1L5WtMifRryngUNxNAU5afV'
      }
    );
  });

  it("should return valid address for testnet", async function () {
    walletStub.request
      .withArgs(sinon.match.has("method", "snap_getBip44Entropy_1"))
      .resolves(bip44Entropy1Node);

    const account = await getAccount(walletStub, "testnet");

    expect(account).to.be.eql(
      {
        accountId: "301c77d9c9ed770eaaa3355a09daea909194191b7b8a8c2352685cf26b0f9884",
        publicKey: "ed25519:4EokKWyQbsRzk1v1e2jmLC6SAe3f4Fm6PynKxFx5zh71"
      }
    );
  });
});
