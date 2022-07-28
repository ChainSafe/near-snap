import { JsonRpcRequest } from '@metamask/types';

// export type SnapRpcRequest = { options: { method: string; params?: unknown[] } }
export type SnapRpcRequest = JsonRpcRequest<unknown[] | { [key: string]: unknown }>
// export type SnapRpcRequest = any;

