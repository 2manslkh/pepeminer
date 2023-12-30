import { deployments, ethers } from "hardhat"

import { Contract } from 'ethers';
import { PepeMiner } from "../typechain";
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { expect } from "chai"

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000"
let owner: SignerWithAddress;
let user1: SignerWithAddress;
let contract: Contract;

async function getContract(contractName: string) {
  return await ethers.getContractAt(contractName, (await deployments.get(contractName)).address);
}

describe("PepeMiner Contract", function () {
  let PepeMiner;
  let pepeMiner: PepeMiner;
  let owner: SignerWithAddress;
  let user1: SignerWithAddress;;
  let user2: SignerWithAddress;;

  beforeEach(async function () {
    // Get Signers
    [owner, user1, user2] = await ethers.getSigners();
    console.log("🚀 | user2:", user2)


    // Deploy Contracts
    await deployments.fixture(['PepeMiner']);


    // Get Contracts
    pepeMiner = (await getContract('PepeMiner')) as PepeMiner;
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await pepeMiner.owner()).to.equal(owner.address);
    });

    it("Should initialize with the correct treasury address", async function () {
      expect(await pepeMiner.treasuryAddress()).to.equal("0x420694bc7D762ba3Bc0784af0d87dbf63f2F266A");
    });

    it("Should start with marketChickens at 0", async function () {
      expect(await pepeMiner.marketChickens()).to.equal(0);
    });

  });

  describe("Airdrop Function", function () {
    it("Should allow only the owner to airdrop chickens", async function () {
      await expect(pepeMiner.connect(user1).airdropChickens([user2.address], 100))
        .to.be.revertedWith("not owner");
    });

    it("Should correctly airdrop chickens", async function () {
      await pepeMiner.airdropChickens([user1.address, user2.address], 100);
      expect(await pepeMiner.hatcheryMiners(user1.address)).to.equal(100);
      expect(await pepeMiner.hatcheryMiners(user2.address)).to.equal(100);
      expect(await pepeMiner.marketChickens()).to.equal(200);
    });
  });

  describe("Compound Function", function () {
    beforeEach(async function () {
      // Setup before compounding...
      await pepeMiner.seedMarket({ value: ethers.utils.parseEther("1") });
      await pepeMiner.connect(user1).deposit(ZERO_ADDRESS, { value: ethers.utils.parseEther("0.1") });
    });

    it("Should correctly compound chickens for user", async function () {
      await pepeMiner.connect(user1).compound(user2.address);
      // Assertions to verify the state after compounding
      // You would need to calculate expected miners and chickens based on your contract logic
    });

    // More tests for different scenarios...
  });

  describe("Withdraw Function", function () {
    beforeEach(async function () {
      // Setup before withdrawing...
    });

    it("Should allow users to withdraw correctly", async function () {
      // Setup initial conditions for withdrawal
      // Perform withdrawal
      // Check balances and contract state post-withdrawal
    });

    // Additional tests for edge cases...
  });

  describe("Events", function () {
    // it("Should emit an event when chickens are airdropped", async function () {
    //   await expect(pepeMiner.airdropChickens([user1.address], 100))
    //     .to.emit(pepeMiner, "ChickensAirdropped")
    //     .withArgs(user1.address, 100);
    // });

    // Additional event tests...
  });




  // Additional setup if required...
});
