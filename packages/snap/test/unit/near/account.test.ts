import chai, { expect } from "chai";
import sinonChai from "sinon-chai";
import sinon from "sinon";
import { mockSnapProvider } from "../wallet.stub";
import { getKeyPair } from "../../../src/near/account";
import { bip44Entropy397Node } from "./bip44Entropy.mock";

chai.use(sinonChai);

describe("Test account function: getKeyPair", function () {
  const sandbox = sinon.createSandbox();
  const walletStub = mockSnapProvider(sandbox);

  afterEach(function () {
    sandbox.reset();
  });

  it("should return valid keypair for near mainnet", async function () {
    walletStub.request
      .withArgs(sinon.match.has("method", "snap_getBip44Entropy_397"))
      .resolves(bip44Entropy397Node);

    const keypair = await getKeyPair(walletStub, "mainnet");
    expect(keypair.toString()).to.be.eq(
      "ed25519:2wjSncnSj54evCGqBn1EPsd3aF3wGKszrEKNVTb6rmN6cJnsWgTSW8sZCn4Cydv85jbLBmaHjZpwFf2vfSrgbk3L"
    );
  });
});
