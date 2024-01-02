<script lang="ts">
  import {
    getNetwork,
    prepareWriteContract,
    readContract,
    readContracts,
    waitForTransaction,
    writeContract,
  } from "@wagmi/core";
  import Button from "../components/Button/Button.svelte";
  import VerticalStack from "../components/Stack/VerticalStack.svelte";
  import { pepeMinerABI, prepareWritePepeMiner, readPepeMiner } from "../generated";
  import { formatEther, getChainContractAddress, parseEther, zeroAddress } from "viem";
  import { type PepeMinerData, addToast, amountDeposited, data, ethInput, ref } from "../stores";
  import { onMount } from "svelte";
  import SectionContainer from "../components/Container/SectionContainer.svelte";
  import TextContainer from "../components/Container/TextContainer.svelte";
  import DisplayLine from "../components/Display/DisplayLine.svelte";
  import ScreenContainer from "../components/Container/ScreenContainer.svelte";
  import InputBox from "../components/Input/InputBox.svelte";
  import ReferralCode from "../components/Input/ReferralCode.svelte";

  let _data: PepeMinerData;

  data.subscribe((value) => (_data = value));

  async function handleSeedMarket() {
    const chainID = await getNetwork();
    const config = await prepareWritePepeMiner({
      chainId: chainID.chain?.id as any,
      functionName: "seedMarket",
    });
    const { hash } = await writeContract(config);
    addToast({
      id: Math.floor(Math.random() * 10000),
      message: `Transaction Pending...`,
      type: "info",
      timeout: 8000,
    });
    const data = await waitForTransaction({
      hash,
    });
    addToast({
      id: Math.floor(Math.random() * 10000),
      message: `Seeded market`,
      type: "success",
      timeout: 8000,
    });
  }
  async function handleBuyPepe() {
    const chainID = await getNetwork();
    const config = await prepareWritePepeMiner({
      chainId: chainID.chain?.id as any,
      functionName: "deposit",
      args: [$ref], //TODO: replace with referral address
      value: parseEther($ethInput),
    });
    const { hash } = await writeContract(config);
    addToast({
      id: Math.floor(Math.random() * 10000),
      message: `Transaction Pending...`,
      type: "info",
      timeout: 8000,
    });
    const data = await waitForTransaction({
      hash,
    });
    addToast({
      id: Math.floor(Math.random() * 10000),
      message: `Successfully deposited ${$ethInput} AVAX`,
      type: "success",
      timeout: 8000,
    });
  }

  async function handleCompound() {
    const chainID = await getNetwork();
    const config = await prepareWritePepeMiner({
      chainId: chainID.chain?.id as any,
      functionName: "compound",
      args: [$ref], //TODO: replace with referral address
    });
    const { hash } = await writeContract(config);
    addToast({
      id: Math.floor(Math.random() * 10000),
      message: `Transaction Pending...`,
      type: "info",
      timeout: 8000,
    });
    const data = await waitForTransaction({
      hash,
    });
    addToast({
      id: Math.floor(Math.random() * 10000),
      message: `Pepes have been compounded`,
      type: "success",
      timeout: 8000,
    });
  }
  async function handleClaim() {
    const chainID = await getNetwork();
    const config = await prepareWritePepeMiner({
      chainId: chainID.chain?.id as any,
      functionName: "withdraw",
    });
    const { hash } = await writeContract(config);
    addToast({
      id: Math.floor(Math.random() * 10000),
      message: `Transaction Pending...`,
      type: "info",
      timeout: 8000,
    });
    const data = await waitForTransaction({
      hash,
    });
    addToast({
      id: Math.floor(Math.random() * 10000),
      message: `Pepes have been claimed`,
      type: "success",
      timeout: 8000,
    });
  }

  async function handleTestToast() {
    addToast({
      id: Math.floor(Math.random() * 10000),
      message: "Test Toast",
      type: "success",
      timeout: 8000,
    });
  }

  let screenSize: number;
</script>

<svelte:window bind:innerWidth={screenSize} />
<SectionContainer id="main" stripes={true}>
  <ScreenContainer>
    <VerticalStack>
      <div class="info-container">
        <p class="title">EARN UP TO 4 - 12% PER DAY!</p>
        <p>
          <strong>1. Buy Pepes Miners</strong> Start by using your AVAX to purchase pepe miners
        </p>
        <p>
          <strong>2. Compound</strong> To maximize your earnings, you can compound your earnings daily
        </p>
        <p>
          <strong>3. Claim Rewards</strong> You can claim your rewards at any time and withdraw them
          to your wallet
        </p>
        <p>
          The key to maximizing your rewards lies in the quantity of Pepe Miners you hold and how
          frequently you compound them. The more Pepe Miners you accumulate and the more often you
          reinvest your rewards, the greater the potential for earning more rewards
        </p>
        <TextContainer>
          <section-header>BUY PEPE MINERS</section-header>
          <DisplayLine
            lineInfo={{
              name: "TVL",
              value: `$ ${(Number(formatEther(_data.contract_balance)) * 40).toFixed(3)}`,
            }}
          ></DisplayLine>
          <DisplayLine
            lineInfo={{
              name: "Contract",
              value: `${Number(formatEther(_data.contract_balance)).toFixed(3)} $AVAX`,
            }}
          ></DisplayLine>
          <DisplayLine lineInfo={{ name: "Pepe Miners", value: `${_data.user_miners}` }}
          ></DisplayLine>
          <div class="buy-pepe">
            <InputBox></InputBox>
            <Button buttonText="Buy Pepe 🐸" handleClick={handleBuyPepe}></Button>
          </div>
        </TextContainer>
        <TextContainer>
          <section-header>REFER TO EARN 10%</section-header>
          <ReferralCode></ReferralCode>
        </TextContainer>
        <TextContainer>
          <section-header>CLAIM REWARDS</section-header>
          <DisplayLine
            lineInfo={{
              name: "Your Rewards",
              value: `${Number(formatEther(_data.user_profit ? _data.user_profit : 0n)).toFixed(
                6,
              )} $AVAX`,
            }}
          ></DisplayLine>
          <DisplayLine
            lineInfo={{
              name: "Claim Power",
              value: `${(
                Number(formatEther(_data.claim_power ? _data.claim_power : 0n)) * 100
              ).toFixed(2)}%`,
            }}
          ></DisplayLine>
          <p>
            <strong>CLAIMING</strong> will reset the claim power to 50% Claim power regenerates 10% per
            day till 100%
          </p>
          <Button buttonText="Compound 🔄" handleClick={handleCompound}></Button>
          <Button buttonText="Claim 💰" handleClick={handleClaim}></Button>
        </TextContainer>
        <TextContainer>
          <section-header>PEPE MINER STATS</section-header>
          <DisplayLine lineInfo={{ name: "Daily Returns", value: "4-12%" }}></DisplayLine>
          <DisplayLine lineInfo={{ name: "APR", value: "~9999%", bling: "bling" }}></DisplayLine>
          <DisplayLine lineInfo={{ name: "Dev Fee", value: "5%" }}></DisplayLine>
        </TextContainer>
      </div>
      <VerticalStack>
        <Button buttonText="Seed Market 🌱" handleClick={handleSeedMarket}></Button>
      </VerticalStack>
    </VerticalStack>
  </ScreenContainer>
</SectionContainer>

<style lang="scss">
  @import "../styles/colours";
  @import "../styles/breakpoints.scss";

  p {
    margin: 0;
    box-sizing: border-box;
  }

  section-header {
    text-shadow:
      1px 1px 0 $primary,
      -1px 1px 0 $primary,
      1px -1px 0 $primary,
      -1px -1px 0 $primary;
    font-family: "GameStage";
    font-style: normal;
    font-weight: 600;
    font-size: 32px;
    line-height: 21px;
    /* identical to box height */

    display: flex;
    align-items: center;
    color: $secondary_1;
  }

  .title {
    text-shadow: 0px 0px 36.288px #e84142;
    font-family: "GameStage";
    font-size: 36px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;

    /* outline: 3px solid $primary; */

    background: linear-gradient(180deg, #e84142 0%, rgba(255, 233, 233, 0) 100%);
    background-clip: text;

    margin: 0;
  }

  .buy-pepe {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  .info-container {
    padding: 0rem 1rem;
    box-sizing: border-box;
    display: flex;
    position: relative;
    flex-direction: column;
    justify-content: center;
    max-width: 400px;
    width: 100%;
    gap: 1rem;

    word-break: keep-all;
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
