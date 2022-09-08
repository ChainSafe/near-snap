import chai, { expect } from "chai";
import sinonChai from "sinon-chai";
import sinon from "sinon";
import { mockSnapProvider } from "../wallet.stub";
import { getKeyPair } from "../../../src/near/account";
import { bip32Entropy397Node } from "./bip32Entropy.mock";

chai.use(sinonChai);

describe("Test account function: getKeyPair", function () {
  const sandbox = sinon.createSandbox();
  const walletStub = mockSnapProvider(sandbox);

  afterEach(function () {
    sandbox.reset();
  });

  it("should return valid keypair for near mainnet", async function () {
    walletStub.request
      .withArgs(sinon.match.has("method", "snap_getBip32Entropy"))
      .resolves(bip32Entropy397Node);

    const keypair = await getKeyPair(walletStub, "mainnet");
    expect(keypair.toString()).to.be.eq(
      "ed25519:2eCVNyWDRbYxD54BxAKeJrom7dJYJD1GiBsSq3TZKFUGuyvCcEDv7Fm9aHp6QNCeyUHURsvxSwhrqTiQ2gYKjXHZ"
    );
  });

  it("should return valid keypair for near testnet", async function () {
    walletStub.request
      .withArgs(sinon.match.has("method", "snap_getBip32Entropy"))
      .resolves(bip32Entropy397Node);

    const keypair = await getKeyPair(walletStub, "testnet");
    expect(keypair.toString()).to.be.eq(
      "ed25519:2eCVNyWDRbYxD54BxAKeJrom7dJYJD1GiBsSq3TZKFUGuyvCcEDv7Fm9aHp6QNCeyUHURsvxSwhrqTiQ2gYKjXHZ"
    );
  });
});
