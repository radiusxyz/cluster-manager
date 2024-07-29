const { ethers } = require("hardhat");

async function main() {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(`Address: ${account.address}`);
    console.log(`Private Key: ${account.privateKey}`);
    // To get the public key, we can derive it from the private key
    const wallet = new ethers.Wallet(account.privateKey);
    console.log(`Public Key: ${wallet.publicKey}`);
    console.log("----------------------");
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
