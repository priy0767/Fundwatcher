import hre from "hardhat";

async function main() {
  console.log("Starting deployment...");
  
  // Access ethers from the HRE object directly
  const { ethers } = hre;
  
  const fundwatcher = await ethers.deployContract("Fundwatcher");
  
  console.log("Waiting for deployment confirmation...");
  await fundwatcher.waitForDeployment();
  
  const address = await fundwatcher.getAddress();
  console.log(`Fundwatcher successfully deployed to: ${address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});