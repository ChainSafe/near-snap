import { JsonRpcRequest } from "@metamask/types";

export type SnapRpcRequest = JsonRpcRequest<
  unknown[] | { [key: string]: unknown }
>;
