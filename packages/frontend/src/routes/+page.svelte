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

  async function handleSeedMarket() {
    const config = await prepareWritePepeMiner({
      functionName: "seedMarket",
    });
    const result = await writeContract(config);
  }
  async function handleBuyPepe() {
    const config = await prepareWritePepeMiner({
      functionName: "deposit",
      args: [zeroAddress],
      value: parseEther("1"),
    });
    const result = await writeContract(config);
  }

  async function readAmountDeposited() {
    const result = await readPepeMiner({
      functionName: "getBalance",
    });

    console.log(result);
    $amountDeposited = result;
  }

  onMount(async () => {
    await readAmountDeposited();
  });
</script>

<VerticalStack>
  <Button buttonText="Seed Market 🌱" handleClick={handleSeedMarket}></Button>
  <Button buttonText="Buy Pepe 🐸" handleClick={handleBuyPepe}></Button>
  <!-- Expand $data -->
  {#each Object.entries($data) as [key, value]}
    <div>{key}: {value}</div>
  {/each}
</VerticalStack>

<style lang="scss">
  @import "../styles/colours";

  title {
    width: auto;
    font-family: "Poppins";
    font-style: normal;
    font-weight: 700;
    font-size: 5rem;

    display: flex;
    align-items: center;

    color: $primary;
  }

  description {
    width: auto;

    font-family: "Poppins";
    font-style: normal;
    font-weight: 700;
    font-size: 2rem;
    line-height: 54px;
    display: flex;
    align-items: center;
    text-align: center;

    color: $primary;
  }
</style>
