import chai, { expect } from "chai";
import sinonChai from "sinon-chai";
import { mockSnapProvider } from "../wallet.mock.test";
import { getAccount } from "../../../src/rpc/getAccount";
import { bip44Entropy397Node } from "../near/bip44Entropy.mock";

chai.use(sinonChai);

describe("Test rpc handler function: getAccount", function () {
  const walletStub = mockSnapProvider();

  afterEach(function () {
    walletStub.reset();
  });

  it("should return valid address for mainnet", async function () {
    walletStub.rpcStubs.snap_getBip44Entropy_397.resolves(bip44Entropy397Node);

    const account = await getAccount(walletStub, "mainnet");

    expect(account).to.be.eq(
      "3336393866646334313564363164656335373631653766633037616631313233"
    );
  });
});
