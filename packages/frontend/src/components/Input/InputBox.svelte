<script lang="ts">
  import { ethInput } from "../../stores";

  let _input: string;

  function validateInput(event: Event) {
    const regex: RegExp = /^[0-9]*\.?[0-9]*$/; // Regex for numbers and decimals
    const input: string = (event.target as HTMLInputElement).value;

    if (regex.test(input)) {
      $ethInput = input;
    } else {
      (event.target as HTMLInputElement).value = $ethInput; // Reset to last valid value
    }
  }
</script>

<wrapper>
  <input type="text" bind:value={_input} on:input={validateInput} placeholder="enter amount..." />
  <div class="input-label">$AVAX</div>
</wrapper>

<style lang="scss">
  @import "../../styles/colours";

  wrapper {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 40px;
    box-sizing: border-box;
    gap: 0.5rem;
    justify-content: space-between;
  }

  .input-label {
    font-family: "ModeSeven";
    font-style: normal;
    font-weight: 600;
    font-size: 8px;

    justify-content: center;
    align-items: center;
    justify-items: center;
    justify-self: center;
    margin-top: 6px;
    height: 100%;
    width: auto;

    color: $primary;
    font-size: 1rem;
    font-weight: 400;
  }
  input {
    /* box-sizing: border-box; */
    font-family: "ModeSeven";
    font-style: normal;
    font-weight: 600;
    font-size: 8px;
    line-height: 21px;

    display: flex;
    padding: 4px 1rem;
    border-radius: 5px;
    border: 2px solid $primary_border;
    box-shadow: 0px 0px 5px 0px $primary_border;

    justify-content: center;
    align-items: center;

    height: auto;
    width: 100%;

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
