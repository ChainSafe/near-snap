import chai, { expect } from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";
import { getAccount } from "../../../src/rpc/getAccount";
import {
  bip32Entropy397Node,
  bip32Entropy1Node,
} from "../near/bip32Entropy.mock";
import { mockSnapProvider } from "../wallet.stub";
import { testNewMetamaskVersion } from "../constants";

chai.use(sinonChai);

describe("Test rpc handler function: getAccount", function () {
  const sanbox = sinon.createSandbox();
  const walletStub = mockSnapProvider(sanbox);

  afterEach(function () {
    sanbox.reset();
  });

  it("should return valid address for mainnet", async function () {
    walletStub.request
      .withArgs(sinon.match.has("method", "web3_clientVersion"))
      .resolves(testNewMetamaskVersion);
    walletStub.request
      .withArgs(sinon.match.has("method", "snap_getBip32Entropy"))
      .resolves(bip32Entropy397Node);

    const account = await getAccount(walletStub, "mainnet");

    expect(account).to.be.eql({
      accountId:
        "561ddb98e0b17cd42bf3f65b0d5147f7abff7f0d341c08cb89d31de8a788f948",
      publicKey: "ed25519:6oAUAhAFVFA7YmajkMWw6hZmqH3Lqer2mgvBDh6nLtAj",
    });
  });

  it("should return valid address for testnet", async function () {
    walletStub.request
      .withArgs(sinon.match.has("method", "web3_clientVersion"))
      .resolves(testNewMetamaskVersion);
    walletStub.request
      .withArgs(sinon.match.has("method", "snap_getBip32Entropy"))
      .resolves(bip32Entropy1Node);

    const account = await getAccount(walletStub, "testnet");

    expect(account).to.be.eql({
      accountId:
        "7130456fc7ef1a707607c6f52377c9d10a8677e980ffcdb5b3755b601e1ea89f",
      publicKey: "ed25519:8cqm9b7PMcNjiBgeYD8M8tLrwp2ZepThL5qvDS4KcQHC",
    });
  });
});
