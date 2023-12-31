<script lang="ts">
  // variables
  import Logo from "../../public/images/Logo.svg";
  import { web3Modal } from "../../stores";
  import { breakpoints } from "../../styles/breakpoints";
  import RowContainer from "../Container/RowContainer.svelte";
  import TextContainer from "../Container/TextContainer.svelte";
  import TelegramLogo from "../SocialIcons/TelegramLogo.svelte";
  import TwitterLogo from "../SocialIcons/TwitterLogo.svelte";

  import { wagmiClient } from "../../stores";
  let screenSize: number;
  let modalOpen = false;

  function toggleModal() {
    modalOpen = !modalOpen;
    console.log(modalOpen);
  }
</script>

<svelte:window bind:innerWidth={screenSize} />

<header-wrapper>
  <RowContainer>
    <header-logo>
      <img src={Logo} alt="logo" width="192px" />
      <!-- <header-title>PROJECT_NAME</header-title> -->
    </header-logo>
  </RowContainer>
  <RowContainer>
    <TelegramLogo />
    <TwitterLogo />
    {#if $web3Modal}
      <div class="w3n-wrapper">
        <w3m-button />
      </div>
    {/if}
  </RowContainer>
</header-wrapper>

<style lang="scss">
  @import "../../styles/colours";
  @import "../../styles/breakpoints";
  @keyframes glowing {
    0% {
      box-shadow: 0 0 5px $primary_border;
    }
    50% {
      box-shadow:
        0 0 20px $primary_border,
        0 0 30px $primary_border;
    }
    100% {
      box-shadow: 0 0 5px $primary_border;
    }
  }
  .w3n-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;

    border: 3px solid $primary_border;

    box-shadow:
      0px 0px 5px 0px $primary_border,
      0px 0px 10px 0px $primary_border;
    /* Inside auto layout */
  }
  header-logo {
    /* Auto layout */

    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }
  header-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    /* position: fixed; */

    width: 100%;
    max-width: 1440px;
    gap: auto;
    padding: 32px;

    @media screen and (max-width: $large) {
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding-left: 0px;
      padding-right: 0px;
      height: 100px;
    }
  }
  header-title {
    /* Auto layout */

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0px;
    gap: 8px;

    width: auto;
    height: 100px;

    /* Inside auto layout */

    font-family: "Poppins";
    font-style: normal;
    font-weight: 600;
    font-size: 2rem;
    line-height: 36px;
  }

  header-tabs {
    /* Frame 2 */

    /* Auto layout */

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 0px;
    gap: 56px;

    width: auto;
    height: 36px;

    /* Inside auto layout */

    color: $primary;
    font-family: "Poppins";
    font-size: 1rem;
    font-weight: 400;
  }

  a {
    color: #6f6f6f;
    text-decoration: none;
  }

  a:active {
    color: black;
    background-color: transparent;
    text-decoration: underline;
  }

  w3m-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 16px;
  }
</style>
