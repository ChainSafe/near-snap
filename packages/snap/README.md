# NearSnap - MetaMask Snap for NEAR Protocol

## Table of Contents

1. [Introduction](#introduction)
2. [Requirements](#requirements)
3. [Usage](#usage)

<a name="introduction"></a>
## Introduction

NearSnap is a MetaMask Snap that enables MetaMask users to interact with NEAR Protocol-powered dApps.  
This package provides the functionality to integrate the NEAR Protocol into MetaMask using the Snaps system.
This Snap is intention to work with [NEAR Wallet Selector](https://github.com/near/wallet-selector) 


<a name="requirements"></a>
## Requirements
Set and ready to go with [NearSnap Monorepo]((../README.md#prerequisites))
To use the NearSnap package, you need to have a [MetaMask Flask](https://metamask.io/flask/) browser extension installed and set up and knowledge how to [develop Snaps](https://metamask.io/snaps/).

<a name="usage"></a>
## Usage and Developing

To use NearSnap integrate it with the MetaMask extension you will need to use [JSON-RPC API](https://docs.metamask.io/guide/snaps.html#json-rpc-api)

Run Snap [Local Development](../README.md#building-and-running-the-snap) environment
```shell
yarn start
```

Open Browser with any website (like http://example.com/), with open dev tools  
Run this command in console inside dev tools to initialize snap.

```javascript
window.ethereum.request({
  method: "wallet_requestSnaps",
  params: {
      "local:http://localhost:8081": {},
  },
});
```
and you are ready to run any of snap commands
```javascript
window.ethereum.request({
    method: "wallet_invokeSnap",
    params: {
      snapId: "local:http://localhost:8081",
      request: {
        method: "near_getAccount",
        params: { network: "testnet" },
      },
    },
}).then(console.log);
```
