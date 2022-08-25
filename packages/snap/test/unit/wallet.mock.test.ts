import sinon from "sinon";
import { SnapProvider } from "@metamask/snap-types";

export class WalletMock {
  public readonly requestStub = sinon.stub();

  public readonly rpcStubs = {
    snap_confirm: sinon.stub(),
    snap_getBip44Entropy_1: sinon.stub(),
    snap_getBip44Entropy_397: sinon.stub(),
  };

  /**
   * Calls this.requestStub or this.rpcStubs[req.method], if the method has
   * a dedicated stub.
   */
  public request(args: { method: string; params: unknown[] }): unknown {
    const { method, params = [] } = args;
    if (Object.hasOwnProperty.call(this.rpcStubs, method)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (this.rpcStubs as any)[method](...params);
    }
    return this.requestStub(args);
  }

  public reset(): void {
    this.requestStub.reset();
    Object.values(this.rpcStubs).forEach(
      (stub: ReturnType<typeof sinon.stub>) => stub.reset()
    );
  }
}

export function mockSnapProvider(): SnapProvider & WalletMock {
  const mock = new WalletMock();
  return mock as any as SnapProvider & WalletMock;
}
