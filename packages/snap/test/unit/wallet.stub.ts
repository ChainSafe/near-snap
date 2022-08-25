import { MetaMaskInpageProvider } from "@metamask/providers";
import { SinonSandbox, SinonStubbedInstance } from "sinon";

export const mockSnapProvider = (
  sandbox: SinonSandbox
): SinonStubbedInstance<MetaMaskInpageProvider> & MetaMaskInpageProvider =>
  sandbox.createStubInstance(
    MetaMaskInpageProvider
  ) as SinonStubbedInstance<MetaMaskInpageProvider> & MetaMaskInpageProvider;
