<script lang="ts">
  import { ethInput } from "../../stores";

  let _input: string;

  function validateInput(event: Event) {
    const regex: RegExp = /^[0-9]*\.?[0-9]*$/; // Regex for numbers and decimals
    const input: string = (event.target as HTMLInputElement).value;

    if (regex.test(input)) {
      $ethInput = input;
      console.log("🚀 | validateInput | ethInput:", $ethInput);
    } else {
      (event.target as HTMLInputElement).value = $ethInput; // Reset to last valid value
    }
  }
</script>

<input type="text" bind:value={_input} on:input={validateInput} placeholder="$AVAX" />

<style lang="scss">
  @import "../../styles/colours";

  input {
    /* box-sizing: border-box; */
    font-family: "ModeSeven";
    font-style: normal;
    font-weight: 600;
    font-size: 8px;
    line-height: 21px;

    display: flex;
    padding: 8px 1rem;
    border-radius: 5px;
    border: 2px solid $primary_border;
    box-shadow: 0px 0px 5px 0px $primary_border;
    height: 100%;

    justify-content: center;
    align-items: center;

    width: auto;

    color: $primary;
    font-size: 1rem;
    font-weight: 400;
    background: $background;
    text-align: right;

    cursor: pointer;
  }

  input::placeholder {
    text-align: right;
    color: #909090; /* Your desired color */
    opacity: 1; /* Optional: Adjust the opacity of the placeholder text */
  }
</style>
