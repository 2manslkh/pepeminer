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
  import { type PepeMinerData, data, showToast } from "../stores";

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
<pepe-underlay />

<main>
  {#if $showToast}
    <div class="toast">Text copied to clipboard!</div>
  {/if}
  <slot />
</main>

<!-- <footer /> -->

<style lang="scss">
  @import "../styles/colours";

  @font-face {
    font-family: "ModeSeven";
    src: url("../public/fonts/modeseven-font/Modeseven-L3n5.ttf");
  }

  header {
    background: transparent;
    font-family: "ModeSeven";
    position: fixed;
    display: flex;
    align-self: center;
    align-items: center;
    justify-content: center;
    z-index: 100;
    width: 100%;
  }

  main {
    font-family: "ModeSeven";
    color: $primary;
    border: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    word-break: break-all;
    width: 100%;
  }

  pepe-underlay {
    background: url("../public/images/pepe-ascii.png") no-repeat center center fixed;
    position: absolute;
    width: 100%;
    height: 100%;
    right: 0px;
    opacity: 0.7;
    z-index: -2;
  }

  footer {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  // Additional styles for the toast message
  .toast {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background-color: $secondary_1;
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 1.2rem;
    box-shadow: 0px 0px 5px 0px $primary_border;
    z-index: 1000;
  }
</style>
