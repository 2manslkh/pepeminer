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
    word-break: keep-all;
    border: 3px solid $primary;
    border-radius: 10px;
    box-shadow:
      0px 0px 4.896px 0px $secondary_1,
      0px 0px 9.792px 0px $secondary_1,
      0px 0px 34.272px 0px $secondary_1;
    background-color: rgba(45, 41, 41, 0.9);
    padding: 2rem 0rem;
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
