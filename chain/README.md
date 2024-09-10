# Liveness Radius contracts

## Project Description

This project is a Liveness Radius contracts repository.

### Install

Install the project dependencies by running the following command in your terminal:

```shell
pnpm install
```

If pnpm is not installed, then install pnpm package manager.

```shell
npm install -g pnpm
```

## Test

### Function test

execute the tests using the following command:

```shell
REPORT_GAS=true npx hardhat test
```

### Onchain test

Run the tests to ensure that everything is functioning correctly. Start a local test node by running:

```shell
npx hardhat node
```

you can deploy the contracts to the desired network. Use the following command, replacing `{Network Name}` with the name of the network you want to deploy to:

```shell
npx hardhat ignition deploy ignition/modules/ProxyModule.ts --network {Network Name}

// example
npx hardhat ignition deploy ignition/modules/ProxyModule.ts --network localhost
```

run code:

```shell
npx hardhat run scripts/initialize_cluster.ts --network {Network Name}

// example
npx hardhat run scripts/initialize_cluster.ts --network localhost
```

## Get deploy data

you can get the transaction data to the desired network. Use the following command, replacing `{RPC_URL}` with the rpc url of the network you want to deploy to:

```shell
npx hardhat node --fork {RPC_URL}

npx hardhat run scripts/get_deploy_data.ts --network localhost
```
