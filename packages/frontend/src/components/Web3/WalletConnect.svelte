<script lang="ts">
  import { sepolia, hardhat, avalanche } from "@wagmi/core/chains";
  import { wagmiClient, web3Modal, account } from "../../stores";
  import { configureChains, createConfig, getAccount } from "@wagmi/core";
  import { publicProvider } from "@wagmi/core/providers/public";
  import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi";
  import { onMount } from "svelte";

  export let projectId: string;

  // 2. Create wagmiConfig
  const metadata = {
    name: "PepeMiner",
    description: "Welcome to pepeminer",
    url: "https://pepeminer.xyz",
    icons: ["https://avatars.githubusercontent.com/u/37784886"],
  };

  onMount(() => {
    const chains = [sepolia, hardhat, avalanche];
    const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });
    $web3Modal = createWeb3Modal({
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
  });
</script>
