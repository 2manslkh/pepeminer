<script lang="ts">
  export let backgroundColor = "transparent";
</script>

<container style={`background: ${backgroundColor}`}>
  <slot />
</container>

<style lang="scss">
  @import "../../styles/colours";
  container {
    display: flex;
    flex-direction: column;
    padding: 16px;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    border-radius: 5px;
    border: 2px solid $primary_border;
    box-shadow: 0px 0px 5px 0px $primary_border;
    height: 100%;
  }
</style>
