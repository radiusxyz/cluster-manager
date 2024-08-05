#!/bin/bash

# Ensure the script exits if any command fails
set -e


# Navigate to the chain directory
cd ../../chain

# Run nodes in the background
npx hardhat node &

# Give the node some time to start up
sleep 5

# Run the Hardhat deploy script and redirect output to a JS file
npx hardhat run scripts/deploy.js --network localhost > ../server/tests/hhContractAddress.js

# Navigate to the server directory
cd ../server

# Run the server
npm run dev 
