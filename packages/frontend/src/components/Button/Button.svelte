<script lang="ts">
  export let handleClick: () => void = () => {
    console.log("Unassigned Button");
  };
  export let buttonText = "INSERT_TEXT";
</script>

<button on:click={handleClick}>
  <button-text>{buttonText}</button-text>
</button>

<style lang="scss">
  @import "../../styles/colours";
  button {
    /* Frame 2 */

    /* Auto layout */
    display: flex;
    padding: 8px;
    align-items: center;
    min-width: 160px;
    justify-content: center;
    border-radius: 5px;
    border: 2px solid $primary_border;
    box-shadow: 0px 0px 5px 0px $primary_border;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;

    width: auto;

    /* Inside auto layout */
    color: $background;
    font-size: 1rem;
    font-weight: 400;
    background: $background;

    cursor: pointer;

    /* Inside auto layout */
  }

  button:active {
    color: $secondary_1;
    scale: 0.95;
  }

  button:hover {
    color: $secondary_1;
    box-shadow:
      0px 0px 5px 0px $primary_border,
      0px 0px 10px 0px $primary_border,
      0px 0px 30px 0px $primary_border;
  }

  button-text {
    /* NEXT */

    font-family: "ModeSeven";
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 21px;
    /* identical to box height */

    display: flex;
    align-items: center;
    text-align: center;

    color: $primary;

    /* Inside auto layout */

    flex: none;
    order: 0;
    flex-grow: 0;
  }
</style>
