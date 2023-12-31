<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";

  const dispatch = createEventDispatcher();

  export let type = "error";
  export let dismissible = true;
</script>

<article class={type} role="alert" transition:fade>
  <div class="container">
    <div class="text">
      <slot />
    </div>

    {#if dismissible}
      <button class="close" on:click={() => dispatch("dismiss")}>X</button>
    {/if}
  </div>
</article>

<style lang="scss">
  @import "../../styles/colours";
  article {
    font-family: "ModeSeven";
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 21px;

    padding: 0.75rem 1.5rem;
    border-radius: 0.2rem;
    display: flex;
    align-items: center;
    margin: 0 auto 0.5rem auto;
    width: 20rem;
    word-break: keep-all;
    cursor: pointer;
  }
  .error {
    background: black;
    border: 1px solid IndianRed;
  }
  .success {
    background: black;
    border: 1px solid MediumSeaGreen;
  }
  .info {
    background: black;
    border: 1px solid SkyBlue;
  }
  .text {
    margin-left: 1rem;
  }
  button {
    font-family: "ModeSeven";
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 21px;
    color: white;
    background: transparent;
    border: 0 none;
    padding: 0;
    margin: 0 0 0 auto;
    line-height: 1;
    font-size: 1rem;
    cursor: pointer;
  }
  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    gap: 1rem;
  }
</style>
