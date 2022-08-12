# NearSnap

Metamask Snap to enable Metamask users to interact with Near dapps.

## Known issue's

* currently `getKeyPair` is implement using secp256k curve after metamask implement ed25519 entropy we will rewrite method to fix creating keyring with ed25519 
  * [https://github.com/MetaMask/snaps-skunkworks/pull/671](https://github.com/MetaMask/snaps-skunkworks/pull/671)
