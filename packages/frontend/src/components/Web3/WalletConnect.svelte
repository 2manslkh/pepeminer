<script lang="ts">
  import { sepolia, hardhat, avalanche } from "@wagmi/core/chains";
  import { wagmiClient, web3Modal, account, data, type PepeMinerData } from "../../stores";
  import { getAccount, watchNetwork } from "@wagmi/core";
  import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi";
  import { onMount } from "svelte";
  import { fetchPepeMiningData } from "$lib/data";

  export let projectId: string;

  // 2. Create wagmiConfig
  const metadata = {
    name: "PepeMiner",
    description: "Welcome to pepeminer",
    url: "https://pepeminer.xyz",
    icons: ["https://avatars.githubusercontent.com/u/37784886"],
  };

  onMount(() => {
    const chains = [avalanche, sepolia];
    const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });
    $wagmiClient = wagmiConfig;
    $web3Modal = createWeb3Modal({
      defaultChain: avalanche,
      wagmiConfig,
      projectId,
      chains,
      themeMode: "dark",
      themeVariables: {
        "--w3m-font-family": "ModeSeven",
        "--w3m-color-mix-strength": 10,
        "--w3m-accent": "#E8189900",
        "--w3m-color-mix": "#E81899",
        "--w3m-border-radius-master": "0px",
      },
    });
    $account = getAccount();
    const unwatch = watchNetwork(async (network) => {
      $data = await fetchPepeMiningData();
    });
  });
</script>
