# NearSnap - MetaMask Snap for NEAR Protocol

## Table of Contents

1. [Introduction](#introduction)
2. [Requirements](#requirements)
3. [Usage and Developing](#usage-and-developing)
    - [Run Local Development Environment](#run-local-development-environment)
    - [Initialize Snap](#initialize-snap)
    - [Invoke Snap Methods](#invoke-snap-methods)

<a name="introduction"></a>
## Introduction

NearSnap is a MetaMask Snap that enables MetaMask users to interact with NEAR Protocol-powered dApps. This package provides the functionality to integrate the NEAR Protocol into MetaMask using the Snaps system. This Snap is intended to work with the [NEAR Wallet Selector](https://github.com/near/wallet-selector).

<a name="requirements"></a>
## Requirements

Ensure you are set up and ready to go with the [NearSnap Monorepo](../README.md#prerequisites). To use the NearSnap package, you need to have the [MetaMask Flask](https://metamask.io/flask/) browser extension installed and set up, and be familiar with [developing Snaps](https://metamask.io/snaps/).

<a name="usage-and-developing"></a>
## Usage and Developing

To use and develop NearSnap, you will need to interact with the MetaMask extension using the [JSON-RPC API](https://docs.metamask.io/guide/snaps.html#json-rpc-api).

<a name="run-local-development-environment"></a>
### Run Local Development Environment

Run the Snap local development environment:

```shell
yarn start
```

<a name="initialize-snap"></a>
### Initialize Snap

Open a browser with any website (e.g., http://example.com/), with the Developer Tools open. Run this command in the console to initialize the Snap:

```javascript
window.ethereum.request({
  method: "wallet_requestSnaps",
  params: {
    "local:http://localhost:8081": {},
  },
});
```

<a name="invoke-snap-methods"></a>
### Invoke Snap Methods

Now you are ready to run any of the Snap commands:

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
