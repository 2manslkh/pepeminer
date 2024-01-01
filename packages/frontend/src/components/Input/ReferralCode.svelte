<script lang="ts">
  import { getAccount } from "@wagmi/core";
  import { account, addToast } from "../../stores";
  import { onMount } from "svelte";

  let refLink = `www.pepeminer.xyz/`;
  account.subscribe((value) => {
    if (value) refLink = `www.pepeminer.xyz/?ref=${value.address}`;
  });

  function handleClick() {
    // get account name
    navigator.clipboard.writeText(refLink);
    // show toast
    addToast({
      id: Math.floor(Math.random() * 10000),
      message: "Ref link copied to clipboard!",
      type: "success",
      dismissible: true,
      timeout: 1000,
    });
  }
</script>

<div class="container">
  <button class="box" on:click={handleClick}><p>{refLink}</p></button>
  <u>click to copy ⬆️</u>
</div>

<style lang="scss">
  @import "../../styles/colours";

  .container {
    display: flex;
    flex-direction: column;

    width: 100%;
    gap: 0.25rem;
  }
  .box {
    /* box-sizing: border-box; */
    font-family: "GameStage";
    font-style: normal;
    font-weight: 600;
    font-size: 8px;

    display: flex;
    border-radius: 5px;
    border: 2px solid $primary_border;
    box-shadow: 0px 0px 5px 0px $primary_border;

    justify-content: center;
    align-items: center;

    width: auto;
    white-space: nowrap;
    color: $primary;
    font-size: 1rem;
    font-weight: 400;
    background: $background;

    display: flex;
    overflow-x: scroll;

    cursor: pointer;
  }

  .box::-webkit-scrollbar {
    display: none;
  }

  p {
    font-family: "GameStage";
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    /* identical to box height */

    width: 100%;
    box-sizing: border-box;
    color: $primary;
    margin: 0.5rem;
  }

  u {
    font-family: "GameStage";
    font-style: normal;
    font-weight: 600;
    font-size: 10px;
    /* identical to box height */

    width: 100%;
    box-sizing: border-box;
    color: $primary;
    margin-left: 4px;
  }
</style>
