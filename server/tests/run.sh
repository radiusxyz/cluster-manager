#!/bin/bash

# Ensure the script exits if any command fails
set -e

# Navigate to the chain directory
cd ../../chain

# Run nodes
npx hardhat node

# Run the Hardhat deploy script and redirect output to a JS file
npx hardhat run scripts/deploy.js --network localhost > ../server/tests/hhContractAddress.js

# Navigate to the tests directory
cd ../server/tests

# Run the tests
npm run test
