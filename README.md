# NearSnap

Metamask Snap to enable Metamask users to interact with Near dapps.

## Known issue's

* currently `getKeyPair` is using BIP32 with the secp256k curve. Once Metamask implements the method to get BIP32 entropy with the ed25519 curve, we will implement a fix to derive the proper key. 
  * [https://github.com/MetaMask/snaps-skunkworks/pull/671](https://github.com/MetaMask/snaps-skunkworks/pull/671)
