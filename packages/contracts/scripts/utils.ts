import { ethers } from "ethers";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * Encodes the parameters for the ProgramFactory.create() function.
 *
 * @param params
 * @returns {string}
 */
export const encodeProgramParameters = (params: any[]): string => {
  return ethers.utils.defaultAbiCoder.encode(
    ["tuple(uint256 protocol, string pointer)", "address[]", "address[]"],
    params
  );
}

/**
 * Encodes the parameters for the RoundFactory.create() function.
 *
 * @param params
 * @returns {string}
 */
export const encodeRoundParameters = (params: any[]): string => {
  return ethers.utils.defaultAbiCoder.encode(
    [
      "address",
      "address",
      "uint256",
      "uint256",
      "uint256",
      "uint256",
      "address",
      "tuple(uint256 protocol, string pointer)",
      "tuple(uint256 protocol, string pointer)",
      "address[]",
      "address[]"
    ],
    params
  );
}

/**
 * Encodes the parameters for the MerklePayoutStrategy.updateDistribution() function.
 *
 * @param params
 * @returns {string}
 */
export const encodeMerkleUpdateDistributionParameters = (params: any[]): string => {
  return ethers.utils.defaultAbiCoder.encode(
    [
      "bytes32",
      "tuple(uint256 protocol, string pointer)"
    ],
    params
  );
}


/**
 * Asserts that environment variables are set as expected
 */
export const assertEnvironment = () => {
  if (!process.env.DEPLOYER_PRIVATE_KEY) {
    console.error("Please set your DEPLOYER_PRIVATE_KEY in a .env file");
  }
  if (!process.env.INFURA_ID) {
    console.error("Please set your INFURA_ID in a .env file");
  }
}
