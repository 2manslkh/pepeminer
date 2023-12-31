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
  <VerticalStack>
    <VerticalStack>
      <Button buttonText="Seed Market 🌱" handleClick={handleSeedMarket}></Button>
      <Button buttonText="Buy Pepe 🐸" handleClick={handleBuyPepe}></Button>
      <Button buttonText="Compound 🔄" handleClick={handleCompound}></Button>
      <Button buttonText="Claim 💰" handleClick={handleClaim}></Button>
    </VerticalStack>
  </VerticalStack>
</SectionContainer>

<style lang="scss">
  @import "../styles/colours";
  @import "../styles/breakpoints.scss";

  title {
    width: auto;

    display: flex;
    align-items: center;

    color: $secondary_1;
    text-shadow: 0px 0px 36px $secondary_1;
    font-size: 9em;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  section-title {
    width: auto;

    display: flex;
    align-items: center;

    color: $secondary_1;
    text-shadow: 0px 0px 36px $secondary_1;
    font-size: 4.5em;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  subtitle {
    width: auto;

    display: flex;
    align-items: center;

    color: $secondary_1;
    text-shadow: 0px 0px 36px $secondary_1;
    font-size: 2em;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  description {
    max-width: 440px;
    width: 440px;

    align-items: center;
    text-align: center;

    color: $primary;
    font-size: 1.5em;
    font-style: normal;
    font-weight: 400;
    line-height: 32px;
    word-break: normal;
  }

  game-rule {
    align-items: left;
    text-align: left;
    max-width: 440px;
    align-self: left;
    align-content: left;

    color: $primary;
    font-size: 1em;
    font-style: normal;
    font-weight: 400;
    line-height: 32px;
    word-break: normal;
    text-shadow: 0px 0px 36px $secondary_1;
    padding: 1rem;
  }

  @media (max-width: $large) {
    title {
      font-size: 4.5rem;
    }

    section-title {
      font-size: 2.5rem;
    }

    subtitle {
      font-size: 1.5rem;
    }

    description {
      font-size: 1rem;
      width: 300px;
    }

    game-rule {
      font-size: 1rem;
    }
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
