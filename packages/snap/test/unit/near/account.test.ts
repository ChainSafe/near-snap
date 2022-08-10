import chai, { expect } from "chai";
import sinonChai from "sinon-chai";
import { mockSnapProvider } from "../wallet.mock.test";
import { getKeyPair } from "../../../src/near/account";

chai.use(sinonChai);

describe("Test account function: getKeyPair", function () {
  const walletStub = mockSnapProvider();

  afterEach(function () {
    walletStub.reset();
  });

  it("should return valid keypair for near testnet", async function () {
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

    const keypair = await getKeyPair(walletStub, "testnet");
    expect(keypair.toString()).to.be.eq(
      "ed25519:23kAtJfnTGjb5p1gtjXxH7RYFzbB3gmBNBGiTB3av9UvygLW3x9zYrwuj6WiH2AGHc5hk2nkD9213MeKV3PEkias"
    );
  });
});
