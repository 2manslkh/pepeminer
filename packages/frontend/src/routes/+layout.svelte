<script lang="ts">
  import "@fontsource/poppins/700.css"; // Defaults to weight 400.
  import "@fontsource/poppins/400.css"; // Defaults to weight 400.
  import "@fontsource/courier-prime/400.css"; // Defaults to weight 400.
  import "@fontsource/courier-prime/700.css"; // Defaults to weight 400.
  import "@fontsource/figtree/400.css"; // Defaults to weight 400.
  import "@fontsource/figtree/700.css"; // Defaults to weight 400.
  import WalletConnect from "../components/Web3/WalletConnect.svelte";
  import { getAccount, getNetwork, multicall, readContracts } from "@wagmi/core";
  import type { Chain } from "@wagmi/core";
  import TopNavBar from "../components/TopNavBar/TopNavBar.svelte";
  import { onMount } from "svelte";
  import BottomNav from "../components/BottomNav/BottomNav.svelte";
  import MaxWidthContainer from "../components/Container/MaxWidthContainer.svelte";
  import { getPepeMiner } from "../generated";
  import { type PepeMinerData, data } from "../stores";

  const projectId = import.meta.env.VITE_WEB3MODAL_PROJECT_ID;
  // Throw Error if no projectId is set
  if (!projectId) {
    console.log(
      "VITE_WEB3MODAL_PROJECT_ID is not set. Please set it in .env! https://cloud.walletconnect.com/app",
    );
  }

  async function fetchPepeMiningData() {
    let network = await getNetwork();
    let account = await getAccount();
    if (!account.address) return;

    // Get currently connected chain
    let chain: Chain = network.chain as Chain;
    let pepeContract = getPepeMiner({ chainId: chain.id as any });

    let results = await readContracts({
      contracts: [
        { ...pepeContract, functionName: "getMyChickens" },
        { ...pepeContract, functionName: "getBalance" },
        { ...pepeContract, functionName: "getMyMiners" },
        { ...pepeContract, functionName: "getHalvingPercentage" },
        { ...pepeContract, functionName: "getChickensSinceLastHatch", args: [account.address] },
      ],
    });

    // parse results into store
    let _data: PepeMinerData = {
      user_chickens: results[0].result as bigint,
      contract_balance: results[1].result as bigint,
      user_miners: results[2].result as bigint,
      halving_percentage: results[3].result as bigint,
      chickens_since_last_hatch: results[4].result as bigint,
    };

    $data = _data;
  }

  onMount(async () => {
    await fetchPepeMiningData();
  });
</script>

<!-- Comment to Disable WEB3 (Requires VITE_WEB3MODAL_PROJECT_ID to work) -->
{#if projectId}
  <WalletConnect {projectId} />
{/if}

<header>
  <TopNavBar />
</header>

<!-- Header -->

<main>
  <MaxWidthContainer>
    <slot />
  </MaxWidthContainer>
</main>

<footer />

<style lang="scss">
  @import "../styles/colours";

  @font-face {
    font-family: "Figtree";
    src: url("../public/fonts/Figtree/Figtree-VariableFont_wght.ttf");
  }

  header {
    background: $secondary_1_shadow;
    font-family: "Figtree";
    display: flex;
    align-items: center;
    justify-content: center;
  }

  main {
    font-family: "Figtree";
    background: $secondary_1;
    color: $primary;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    word-break: break-all;
    padding: 16px;
  }

  footer {
    height: 100px;
  }
</style>
