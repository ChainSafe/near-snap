import chai, { expect } from "chai";
import sinonChai from "sinon-chai";
import sinon from "sinon";
import { mockSnapProvider } from "../wallet.stub";
import { getKeyPair } from "../../../src/near/account";
import { testNewMetamaskVersion, testOldMetamaskVersion } from "../constants";
import { bip32Entropy397Node } from "./bip32Entropy.mock";
import { bip44Entropy1Node, bip44Entropy397Node } from "./bip44Entropy.mock";

chai.use(sinonChai);

describe("Test account function: getKeyPair", function () {
  const sandbox = sinon.createSandbox();
  const walletStub = mockSnapProvider(sandbox);

  afterEach(function () {
    sandbox.reset();
  });

  it("should return valid keypair for near mainnet in new version of metamask", async function () {
    walletStub.request
      .withArgs(sinon.match.has("method", "web3_clientVersion"))
      .resolves(testNewMetamaskVersion);
    walletStub.request
      .withArgs(sinon.match.has("method", "snap_getBip32Entropy"))
      .resolves(bip32Entropy397Node);

    const keypair = await getKeyPair(walletStub, "mainnet");
    expect(keypair.toString()).to.be.eq(
      "ed25519:2eCVNyWDRbYxD54BxAKeJrom7dJYJD1GiBsSq3TZKFUGuyvCcEDv7Fm9aHp6QNCeyUHURsvxSwhrqTiQ2gYKjXHZ"
    );
  });

  it("should return valid keypair for near in old version of metamask", async function () {
    walletStub.request
      .withArgs(sinon.match.has("method", "web3_clientVersion"))
      .resolves(testOldMetamaskVersion);
    walletStub.request
      .withArgs(sinon.match.has("method", "snap_getBip44Entropy_397"))
      .resolves(bip44Entropy397Node);

    const keypair = await getKeyPair(walletStub, "mainnet");
    expect(keypair.toString()).to.be.eq(
      "ed25519:2wiQ5A1yzo3jq235NAeHphkcir8DJKsgSYR1mDygP3rSsCd2hGhXF71UjKVEzE3xCg3e8HtKSiEaypySwLnMM61R"
    );
  });

  it("should return valid keypair for near testnet in new version of metamask", async function () {
    walletStub.request
      .withArgs(sinon.match.has("method", "web3_clientVersion"))
      .resolves(testNewMetamaskVersion);
    walletStub.request
      .withArgs(sinon.match.has("method", "snap_getBip32Entropy"))
      .resolves(bip32Entropy397Node);

    const keypair = await getKeyPair(walletStub, "testnet");
    expect(keypair.toString()).to.be.eq(
      "ed25519:2eCVNyWDRbYxD54BxAKeJrom7dJYJD1GiBsSq3TZKFUGuyvCcEDv7Fm9aHp6QNCeyUHURsvxSwhrqTiQ2gYKjXHZ"
    );
  });

  it("should return valid keypair for near in old version of metamask", async function () {
    walletStub.request
      .withArgs(sinon.match.has("method", "web3_clientVersion"))
      .resolves(testOldMetamaskVersion);
    walletStub.request
      .withArgs(sinon.match.has("method", "snap_getBip44Entropy_1"))
      .resolves(bip44Entropy1Node);

    const keypair = await getKeyPair(walletStub, "testnet");
    expect(keypair.toString()).to.be.eq(
      "ed25519:xuNNynXSityHaohokhbuyHvZ3gMiXdzkaAF7CF3GK2GnAjgP238J7AXibgu6MKWbvSzTEXsg2ZFziWMGm9sFZhd"
    );
  });
});
