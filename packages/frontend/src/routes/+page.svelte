<script lang="ts">
  import {
    getNetwork,
    prepareWriteContract,
    readContract,
    readContracts,
    writeContract,
  } from "@wagmi/core";
  import Button from "../components/Button/Button.svelte";
  import SearchBox from "../components/Input/SearchBox.svelte";
  import VerticalStack from "../components/Stack/VerticalStack.svelte";
  import Table from "../components/Table/Table.svelte";
  import { pepeMinerABI, prepareWritePepeMiner, readPepeMiner } from "../generated";
  import { formatEther, getChainContractAddress, parseEther, zeroAddress } from "viem";
  import { amountDeposited, data } from "../stores";
  import { onMount } from "svelte";
  import SectionContainer from "../components/Container/SectionContainer.svelte";
  import TextContainer from "../components/Container/TextContainer.svelte";
  import DisplayLine from "../components/Display/DisplayLine.svelte";
  import ScreenContainer from "../components/Container/ScreenContainer.svelte";

  async function handleSeedMarket() {
    const config = await prepareWritePepeMiner({
      functionName: "seedMarket",
    });
    const result = await writeContract(config);
  }
  async function handleBuyPepe() {
    const config = await prepareWritePepeMiner({
      functionName: "deposit",
      args: [zeroAddress], //TODO: replace with referral address
      value: parseEther("1"),
    });
    const result = await writeContract(config);
  }

  async function handleCompound() {
    const config = await prepareWritePepeMiner({
      functionName: "compound",
      args: [zeroAddress], //TODO: replace with referral address
    });
    const result = await writeContract(config);
  }
  async function handleClaim() {
    const config = await prepareWritePepeMiner({
      functionName: "withdraw",
    });
    const result = await writeContract(config);
  }

  let screenSize: number;
</script>

<svelte:window bind:innerWidth={screenSize} />
<SectionContainer id="main" stripes={true}>
  <ScreenContainer>
    <VerticalStack>
      <div class="info-container">
        <p>
          <strong>1. Buy Chickens</strong> Start by using your AVAX to purchase chickens
        </p>
        <p>
          <strong>2. Compound</strong> To maximize your earnings, you can compound your earnings daily
        </p>
        <p>
          <strong>3. Claim Rewards</strong> You can claim your rewards at any time and withdraw them
          to your wallet
        </p>
        <p>
          The key to maximizing your rewards is based on the number of chicken miners you have and
          the frequency with which you reinvest the eggs they lay. The more chicken miners you
          gather and the more consistently you utilize their eggs, either by reinvesting or
          expanding your flock, the higher your potential for earning additional rewards.
        </p>
        <TextContainer>
          PEPE MINER
          <DisplayLine lineInfo={{ name: "TVL", value: "$100,000,000" }}></DisplayLine>
          <DisplayLine lineInfo={{ name: "Contract", value: "100,000 $AVAX" }}></DisplayLine>
          <DisplayLine lineInfo={{ name: "Pepe Miners", value: "42069" }}></DisplayLine>
          <DisplayLine lineInfo={{ name: "Your Rewards", value: "1234 $AVAX" }}></DisplayLine>
          <DisplayLine lineInfo={{ name: "Claim Power", value: "100%" }}></DisplayLine>
          PEPE STATS
          <DisplayLine lineInfo={{ name: "Daily Returns", value: "4-12%" }}></DisplayLine>
          <DisplayLine lineInfo={{ name: "APR", value: "~9999%", bling: "bling" }}></DisplayLine>
          <DisplayLine lineInfo={{ name: "Dev Fee", value: "5%" }}></DisplayLine>
        </TextContainer>
        <p>
          Withdrawing will reset the <strong>claim power to 50%</strong>. Claim power regenerates
          10% per day till 100%.
        </p>
      </div>
      <VerticalStack>
        <Button buttonText="Seed Market 🌱" handleClick={handleSeedMarket}></Button>
        <Button buttonText="Buy Pepe 🐸" handleClick={handleBuyPepe}></Button>
        <Button buttonText="Compound 🔄" handleClick={handleCompound}></Button>
        <Button buttonText="Claim 💰" handleClick={handleClaim}></Button>
      </VerticalStack>
    </VerticalStack>
  </ScreenContainer>
</SectionContainer>

<style lang="scss">
  @import "../styles/colours";
  @import "../styles/breakpoints.scss";

  p {
    box-sizing: border-box;
  }

  .info-container {
    padding: 0rem 1rem;
    box-sizing: border-box;
    display: flex;
    position: relative;
    flex-direction: column;
    justify-content: center;
    max-width: 400px;
  }

  strong {
    color: $secondary_1;
  }

  @keyframes spinCoin {
    0% {
      transform: rotateY(0deg);
    }
    100% {
      transform: rotateY(1turn); /* or you could use 360deg */
    }
  }

  pepe-token-wrapper {
    animation: spinCoin 3s infinite;
    width: 320px;
    height: 320px;
    padding-bottom: 2rem;
  }

  pepe-underlay {
    background: url("../public/images/pepe-ascii.png") no-repeat center center fixed;
    position: absolute;
    width: 100%;
    height: 100%;
    right: 0px;
    opacity: 0.5;
    z-index: -1;
  }
  info-container {
    display: flex;
    gap: 1rem;
    flex-direction: column;
    align-items: top;
    justify-content: center;
    padding: 2rem;
    align-content: center;
    align-items: center;
    justify-content: center;
  }
</style>
