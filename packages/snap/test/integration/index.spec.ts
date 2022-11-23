import path from "path";
import {
  Dappeteer,
  DappeteerBrowser,
  DappeteerPage,
  initSnapEnv,
} from "@chainsafe/dappeteer";
import { expect, use } from "chai";
import chaiAsPromised from "chai-as-promised";
import { Methods } from "../../src";
import { getAccount } from "../../src/rpc/getAccount";

use(chaiAsPromised);

describe("near-snap integration tests", function () {
  let dappeteer: Dappeteer;
  let browser: DappeteerBrowser;
  let dappPage: DappeteerPage;
  let snapId: string;

  before(async function () {
    ({ dappeteer, snapId, browser } = await initSnapEnv({
      automation: "playwright",
      browser: "chrome",
      snapIdOrLocation: path.resolve(__dirname, "../.."),
      hasPermissions: true,
      hasKeyPermissions: true,
    }));
    dappPage = await dappeteer.page.browser().newPage();
    await dappPage.goto("https://google.com");
  });

  after(async function () {
    await browser.close();
  });

  it("should error on non existing method", async function () {
    await expect(
      dappeteer.snaps.invokeSnap<ReturnType<typeof getAccount>>(
        dappPage,
        snapId,
        "test"
      )
    ).to.eventually.rejectedWith("Method not found");
  });

  it("should error on invalid params", async function () {
    await expect(
      dappeteer.snaps.invokeSnap<ReturnType<typeof getAccount>>(
        dappPage,
        snapId,
        Methods.GetAddress
      )
    ).to.eventually.rejectedWith("Invalid Request");
  });

  it("should return account address", async function () {
    await expect(
      dappeteer.snaps.invokeSnap<ReturnType<typeof getAccount>>(
        dappPage,
        snapId,
        Methods.GetAddress,
        {
          network: "testnet",
        }
      )
    ).to.eventually.deep.equal({
      accountId:
        "1144ad651519bc8c5523d2553dc6662c281465303c8d6afb8e61320fbb98dce1",
      publicKey: "ed25519:2AQfpypuo7UQ2aoFWExH1PyZTXz2Vi5pHiFaKMTDRfu2",
    });
  });

  it("should sign transaction", async function () {
    const resultPromise = dappeteer.snaps.invokeSnap<
      ReturnType<typeof getAccount>
    >(dappPage, snapId, Methods.SignTransaction, {
      network: "testnet",
      transactions: [
        {
          receiverId:
            "1144ad651519bc8c5523d2553dc6662c281465303c8d6afb8e61320fbb98dce1",
          actions: [],
          nonce: 0,
          recentBlockHash: "46ch3RJ8UsAfcc1EreRxvVanQLmTUzdn2MRCBBRfSdrk",
        },
      ],
    });
    await dappeteer.snaps.acceptDialog();
    const result = await resultPromise;
    expect(result).to.be.instanceOf(Array);
  });
});
