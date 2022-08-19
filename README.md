# grants-round

This repository contains packages needed for a user to
- Create & Manage Rounds
- Explore available Rounds
- Vote for Projects within a Round

Project Maintained via  : `lerna`
Build Tool              : `yarn`

## Directory Structure

```
.
├── .github                     # github specific configuration
├── packages
│   ├── contracts               # contracts built using hardhat
│   ├── graph                   # graph which indexes data from contracts
│   ├── round-manager           # react-frontend for round-manager
│   ├── round-explorer          # react-frontend for round-explorer
├── docs                        # useful documentation
├── lerna.json                  # lerna config
├── package.json                # root package configuration
└── README.md
```

## Packages

### contracts

The contracts needed for running a round can be found within the [contracts package](packages/contracts)

##### Deploy Steps

To know how the contracts should be setup, refer [DEPLOY_STEPS.md](packages/contracts/docs/DEPLOY_STEPS.md)


##### Chain Deployment List

To know the addresses are deployed on which network. refer [CHAINS.md](packages/contracts/docs/CHAINS.md)

##### Development

To contribute to this project, fork the project and follow the instructions at [DEV.md](packages/contracts/docs/DEV.md)

This is built and maintained using [hardhat](https://hardhat.org)

### graph

This package holds the subgraph which indexs data with regard the
- ProgramFactory
- ProgramImplementation
- RoundFactory
- RoundImplementation

More information can be found within the [graph package](packages/graph)

### round-manager

This package serves the app which holds all the features w.r.t to

- creating a program
- maintaing a program
- creating a round
- maintaining a program

More information can be found within the [round-manager package](packages/round-manager)

##### Development

To contribute to this project, fork the project and follow the instructions at [DEV.md](packages/round-manager/docs/DEV.md)


### round-explorer

This package serves the app which holds all the features w.r.t to

- exploring a round
- voting for a project


More information can be found within the [round-explorer package](packages/round-explorer)

##### Development

To contribute to this project, fork the project and follow the instructions at [DEV.md](packages/round-explorer/docs/DEV.md)

##### Hosting

All the frontend dApps are currently hosted presently via [fleek.co](https://fleek.co/).

Documented below are the environments along with the URL.

Note: Live Deployment should always happen by raising a PR from `main` to `release`

**round-manager**

| Env     | Git Branch | URL                               |
|---------|------------|-----------------------------------|
| STAGING | main       | https://rmgitcoin.on.fleek.co/    |
| LIVE    | release    | https://round-manager.gitcoin.co/ |