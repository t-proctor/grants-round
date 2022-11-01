---
layout: post
title:  "How to Deploy Gitcoin Grants Round"
date:   2022-10-31 23:43:04 -0500
categories: jekyll update
---
The Grants Round is composed of four distinct packages: `contracts`, `grant-explorer`, `graph`,  and `round-manager`. Each of these has a different local deploy process

# **Deploy Contracts**

### Networks

The project has been configured to support the following networks.
All the deploy scripts will expect network param to know which network the contract deployment / interaction should take place

| network            |
|--------------------|
| `goerli`           |
| `optimism-mainnet` |
| `fantom-testnet`   |

### Program Setup

The section here shows how to set up the program for the first time on a given network. Ideally these steps would be done once per chain. In this example , we would be deploying on goerli

0. Create an `.env` file
```sh
cp ../.env.example ../.env
```

1. Create an `.env` file and fill out
    - `INFURA_ID`               : Infura ID for deploying contract
    - `DEPLOYER_PRIVATE_KEY`    : address which deploys the contract
    - `ETHERSCAN_API_KEY`       : API key for etherscan verification

2. Deploy the `ProgramFactory` contract
```shell
yarn run deploy-program-factory goerli
```

3. Deploy the `ProgramImplementation` contract
```shell
yarn run deploy-program-implementation goerli
```

4. Update `program.config.ts` with deployed contracts based on your network
```javascript
export const params: DeployParams = {
  goerli: {
    programImplementationContract: 'DEPLOYED_PROGRAM_IMPLEMENTATION_CONTRACT',
    programFactoryContract: 'DEPLOYED_PROGRAM_FACTORY_CONTRACT',
    ...
  },
};
```

5. Update `ProgramFactory` to reference the `ProgramImplementation` contract.
```shell
yarn run link-program-implementation goerli
```


### VotingStrategy Setup

The section here shows how to set up voting strategy for the first time on a given network. Ideally these steps would be done once per chain. In this example ,we would be deploying the QuadraticFundingVotingStrategyImplementation contract on goerli

1. Create an `.env` file and fill out
    - `INFURA_ID`               : Infura ID for deploying contract
    - `DEPLOYER_PRIVATE_KEY`    : address which deploys the contract
    - `ETHERSCAN_API_KEY`       : API key for etherscan verification


2. Deploy the `QuadraticFundingVotingStrategyFactory` contract
```shell
yarn run deploy-qf-factory goerli
```

3. Deploy the `QuadraticFundingVotingStrategyImplementation` contract
```shell
yarn run deploy-qf-implementation goerli
```

4. Update `votingStrategy.config.ts` with deployed contracts based on your network
```javascript
export const QFVotingParams: DeployParams = {
  "goerli": {
    factory: 'DEPLOYED_QF_FACTORY_CONTRACT',
    implementation: 'DEPLOYED_QF_IMPLEMENTATION_CONTRACT',
    ...
  },
  ...
};
```

5. Update `QuadraticFundingVotingStrategyFactory` to reference the `QuadraticFundingVotingStrategyImplementation` contract
```shell
yarn run link-qf-implementation goerli
```

### PayoutStrategy Setup

The section here shows how to deploy the payout strategy contract. Ideally these would be done before creating a round. In this example ,we would be deploying the MerklePayoutStrategy contract on goerli. This would have to be done before creating a round
so that round is aware and store a reference to the voting contract during it's creation.


1. Create an `.env` file and fill out
    - `INFURA_ID`               : Infura ID for deploying contract
    - `DEPLOYER_PRIVATE_KEY`    : address which deploys the contract
    - `ETHERSCAN_API_KEY`       : API key for etherscan verification


2. Deploy the `MerklePayoutStrategyFactory` contract
```shell
yarn run deploy-merkle-contract goerli
```

3. Update `payoutStrategy.config.ts` with deployed contract based on your network
```javascript
export const PayoutParams: DeployParams = {
  "goerli": {
    merklePayoutContract: 'DEPLOYED_MERKLE_CONTRACT',
    ...
  },
  ...
};
```


### Round Setup

The section here shows how to set up the round manager for the first time on a given network. Ideally these steps would be done once per chain. In this example , we would be deploying on goerli

1. Create an `.env` file and fill out
    - `INFURA_ID`                     : Infura ID for deploying contract
    - `DEPLOYER_PRIVATE_KEY`          : address which deploys the contract
    - `ETHERSCAN_API_KEY`             : API key for etherscan verification on mainnet / testnet
    - `OPTIMISTIC_ETHERSCAN_API_KEY`  : API key for etherscan verification on optimism mainnet / testnet


2. Deploy the `RoundFactory` contract
```shell
yarn run deploy-round-factory goerli
```

3. Deploy the `RoundImplementation` contract
```shell
yarn run deploy-round-implementation goerli
```

4. Update `round.config.ts` with deployed contracts based on your network
```javascript
export const params: DeployParams = {
  goerli: {
    roundImplementationContract: 'DEPLOYED_ROUND_IMPLEMENTATION_CONTRACT',
    roundFactoryContract: 'DEPLOYED_ROUND_FACTORY_CONTRACT',
    ...
  },
  ...
};
```

5. Update `RoundFactory` to reference the `RoundImplementation` contract
```shell
yarn run link-round-implementation goerli
```

### Payout Setup
<!-- TODO -->


### Contract Verification on etherscan

```
yarn hardhat clean
yarn hardhat verify --network goerli <CONTRACT_ADDRESS>
```

##### Helper Deploy Script

```shell

# Program
yarn run deploy-program-factory goerli
yarn run deploy-program-implementation goerli
yarn run link-program-implementation goerli

# QF
yarn run deploy-qf-factory goerli
yarn run deploy-qf-implementation goerli
yarn run link-qf-implementation goerli

# Payout
yarn run deploy-merkle-contract goerli

# Round
yarn run deploy-round-factory goerli
yarn run deploy-round-implementation goerli
yarn run link-round-implementation goerli
yarn run create-round goerli

# These scripts would be used tp create a test round
yarn run create-program goerli
yarn run create-qf-contract goerli
yarn run deploy-merkle-contract goerli
yarn run create-round goerli
```

# **Deploy Grant-Explorer**
This section documents the basic instructions on running / developing the round-manager package.

### Pre Requisites

Before running any command, make sure to install dependencies:

```sh
$ yarn install
```

Create environment files, and fill in environment variables with your own values

```sh
cp ../.env.sample ../.env
```

The following may be helpful when filling in the the environment variables.

For `REACT_APP_PINATA_JWT` and `REACT_APP_PINATA_GATEWAY`, create your own Pinata account

The `REACT_APP_INFURA_ID` can be filled by creating a free Infura account

`REACT_APP_SUBGRAPH_GOERLI_API` and `REACT_APP_SUBGRAPH_OPTIMISM_MAINNET_API` can be found at
`grants-round/blob/main/packages/graph/README.md`

### Run in Development

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

```sh
$ yarn start
```

### Run in Production

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

```sh
$ yarn build
```

Serve on port 3000

```sh
$ npm install -g serve
$ serve -s build -l 3000
```

# **Deploy Graph**

Generate your hosted-service API key on the graph

- Remove redundant files
```shell
rm -rf generated && rm -rf build
```

- Generate the `subgraph.yaml` for the network against which you'd like to deploy the subgraph

```shell
yarn prepare:<NETWORK_TO_DEPLOY_SUBGRAPH>
```

**Supported Networks**

| network        |
|----------------|
| goerli         |
| optimism       |
| fantom-testnet |


- Run codegen
```shell
graph codegen
```

- Authenticate hosted service
```shell
graph auth --product hosted-service <YOUR_API_KEY>
```

- Deploy Subgraph
```shell
graph deploy --product hosted-service <GITHUB_USER>/<SUBGRAPH_NAME>
```


Note: If you find yourself wanting to run the entire flow in one command.
Use this example where we deploy the subgraph on goerli

```shell
rm -rf generated && rm -rf build &&
    yarn prepare:goerli &&
    graph codegen &&
    graph auth --product hosted-service <YOUR_API_KEY> &&
    graph deploy --product hosted-service <GITHUB_USER>/<SUBGRAPH_NAME>
```

### Deploying subgraph to a new network

1. Ensure all the contracts are deployed on network
2. Create config file within `config/<network-name>.json` and wire in the contract addresses
3. Add new script in `package.json` to generate subgraph `prepare:<network-name>`
3. Generate the `subgraph.yaml` file using `yarn prepare:<network-name>`
4. Run `graph codegen`
5. Deploy the subgraph


# **Deploy Round Manager**

This section documents the basic instructions on running / developing the round-manager package.

### Pre Requisites

Before running any command, make sure to install dependencies:

```sh
$ yarn install
```

Create environment files, and fill in environment variables with your own values

```sh
cp ../.env.sample ../.env
```

The following may be helpful when filling in the the environment variables.

For `REACT_APP_PINATA_JWT` and `REACT_APP_PINATA_GATEWAY`, create your own Pinata account

The `REACT_APP_INFURA_ID` can be filled by creating a free Infura account

`REACT_APP_SUBGRAPH_GOERLI_API` and `REACT_APP_SUBGRAPH_OPTIMISM_MAINNET_API` can be found at
`grants-round/blob/main/packages/graph/README.md`

### Run in Development

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

```sh
$ yarn start
```

### Run in Production

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

```sh
$ yarn build
```

Serve on port 3000

```sh
$ npm install -g serve
$ serve -s build -l 3000
```
