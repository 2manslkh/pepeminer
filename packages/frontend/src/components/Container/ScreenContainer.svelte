<script lang="ts">
</script>

<container>
  <slot />
  <!-- <div style={stripeClass} /> -->
</container>

<style lang="scss">
  @import "../../styles/colours";
  container {
    flex-direction: column;
    width: auto;
    height: 500px;
    display: flex;
    z-index: 1;
    overflow-y: scroll;
    overflow-x: hidden;
  }

  container::-webkit-scrollbar-thumb {
    background: $primary_border; /* Color of the scrollbar thumb */
    border-radius: 1rem;
  }

  container::-webkit-scrollbar {
    width: 10px; /* Width of the vertical scrollbar */
  }

  container::-webkit-scrollbar-track {
    border-radius: 1rem;
  }
</style>
