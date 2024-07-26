const hre = require("hardhat");

async function main() {
  // Contract related
  const contractAddress = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";
  const Contract = await hre.ethers.getContractFactory("Ssal");
  const contract = Contract.attach(contractAddress);

  // Verify the proof
  const isValid = await contract.verify(proofElements, root, leaf, index);
  console.log("Is the transaction order valid?", isValid);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
