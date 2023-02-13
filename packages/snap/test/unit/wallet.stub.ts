import { MetaMaskInpageProvider } from "@metamask/providers";
import { SinonSandbox, SinonStubbedInstance } from "sinon";
import { SnapsGlobalObject } from '@metamask/snaps-types';

export const mockSnapProvider = (
  sandbox: SinonSandbox
): SinonStubbedInstance<MetaMaskInpageProvider> & MetaMaskInpageProvider & SnapsGlobalObject =>
  sandbox.createStubInstance(
    MetaMaskInpageProvider
  ) as SinonStubbedInstance<MetaMaskInpageProvider> & MetaMaskInpageProvider & SnapsGlobalObject;
