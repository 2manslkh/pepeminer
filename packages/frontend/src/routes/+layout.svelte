<script lang="ts">
  import WalletConnect from "../components/Web3/WalletConnect.svelte";

  import TopNavBar from "../components/TopNavBar/TopNavBar.svelte";
  import { type PepeMinerData, data, showToast, wagmiClient, web3Modal, ref } from "../stores";
  import Toasts from "../components/Toast/Toasts.svelte";
  import { fetchPepeMiningData } from "$lib/data";
  import { onMount } from "svelte";
  import { zeroAddress } from "viem";

  const projectId = import.meta.env.VITE_WEB3MODAL_PROJECT_ID;
  onMount(() => {
    const params = new URLSearchParams(window.location.search);
    let _ref = params.get("ref");
    if (_ref) {
      $ref = _ref as `0x${string}`;
    }
  });

  setInterval(async () => {
    if ($wagmiClient) {
      $data = await fetchPepeMiningData();
    }
  }, 10000);
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
  <slot />
  <Toasts />
</main>

<!-- <footer /> -->

<style lang="scss">
  @import "../styles/colours";

  @font-face {
    font-family: "ModeSeven";
    src: url("../public/fonts/modeseven-font/Modeseven-L3n5.ttf");
  }

  @font-face {
    font-family: "GameStage";
    src: url("../public/fonts/game-stage/ttf/game-stage-game-stage-regular-400.ttf");
  }

  header {
    background: transparent;
    font-family: "GameStage";
    position: fixed;
    display: flex;
    align-self: center;
    align-items: center;
    justify-content: center;
    z-index: 100;
    width: 100%;
  }

  main {
    font-family: "GameStage";
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
    background: url("../public/images/pepeminer_bg.png") no-repeat center center fixed;
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
