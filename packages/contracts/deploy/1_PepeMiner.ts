import 'dotenv/config';

import { ethers } from 'hardhat';
import hre from 'hardhat'
import { task } from 'hardhat/config';

module.exports = async ({ getNamedAccounts, deployments, getChainId, task }: any) => {
  const { deploy, read, execute } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = await getChainId();

  let contract = await deploy('PepeMiner', {
    from: deployer,
    log: true,
    args: [], //TODO: set correct values
  });

  // Verify the contract using hardhat verify task

  // if not localhost:
  // if (chainId != '31337') {
  //   await hre.run("verify:verify", {
  //     address: contract.address,
  //     constructorArguments: [],
  //   });
  // }

};

module.exports.tags = ['PepeMiner'];
