// This script deals with deploying BulkVote on a given network
import { ethers } from "hardhat";
import hre from "hardhat";
import { confirmContinue } from "../../utils/script-utils";

export async function main() {

  // Wait 10 blocks for re-org protection
  const blocksToWait = 10;
  
  await confirmContinue({
    "contract"  : "BulkVote",
    "network"   : hre.network.name,
    "chainId"   : hre.network.config.chainId
  });

  // Deploy RoundImplementation 
  const contractFactory = await ethers.getContractFactory("BulkVote");
  const contract = await contractFactory.deploy();

  console.log(`Deploying BulkVote to ${contract.address}`);
  await contract.deployTransaction.wait(blocksToWait);
  console.log("✅ Deployed.");

  return contract.address;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
