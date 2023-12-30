<script lang="ts">
  import {
    sepolia,
    hardhat,
    gnosisChiado,
    gnosis,
    scrollTestnet,
    lineaTestnet,
    localhost,
  } from "@wagmi/core/chains";
  import { wagmiClient, web3Modal, account } from "../../stores";
  import { configureChains, createConfig, getAccount } from "@wagmi/core";
  import { publicProvider } from "@wagmi/core/providers/public";
  import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi";
  import { onMount } from "svelte";

  export let projectId: string;

  // 2. Create wagmiConfig
  const metadata = {
    name: "Web3Modal",
    description: "Web3Modal Example",
    url: "https://web3modal.com",
    icons: ["https://avatars.githubusercontent.com/u/37784886"],
  };

  onMount(() => {
    const chains = [sepolia, hardhat];
    const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });
    $web3Modal = createWeb3Modal({
      wagmiConfig,
      projectId,
      chains,
      themeMode: "dark",
      themeVariables: {
        "--w3m-font-family": "Roboto, sans-serif",
        "--w3m-color-mix-strength": 10,
        "--w3m-accent": "#E81899",
        "--w3m-color-mix": "#FFFFFF",
      },
    });
    $account = getAccount();
  });
</script>
