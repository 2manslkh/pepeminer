<script lang="ts">
  interface LineInfo {
    name: string;
    value: string;
    bling?: string;
  }
  export let lineInfo: LineInfo;
</script>

<container>
  <info-name>{lineInfo.name}:</info-name>
  <info-value-bg>
    <info-value> <div class={lineInfo.bling ? "bling" : ""}>{lineInfo.value}</div></info-value>
  </info-value-bg>
</container>

<style lang="scss">
  @import "../../styles/colours";
  @keyframes fadeInAnimation {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
  }
  info-name {
    width: auto;
    height: 21px;

    font-family: "ModeSeven";

    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 21px;

    display: flex;
    align-items: center;
    color: $secondary_1;

    flex: none;
    order: 0;
    flex-grow: 1;
  }
  info-value-bg {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px;
    overflow-x: scroll;
    gap: 10px;

    height: 21px;
  }

  info-value-bg::-webkit-scrollbar {
    display: none;
  }

  info-value {
    font-family: "ModeSeven";
    font-style: normal;
    font-weight: 700;
    font-size: 1.5rem;
    line-height: 17px;

    display: flex;
    align-items: center;
    color: $primary;

    width: 100%;
    animation: fadeInAnimation 0.5s ease-in-out;
  }
  @keyframes rainbow-text {
    0% {
      color: #ff5555;
    } /* muted red */
    14% {
      color: #ffab55;
    } /* muted orange */
    28% {
      color: #ffee55;
    } /* muted yellow */
    42% {
      color: #55ff55;
    } /* muted green */
    57% {
      color: #5555ff;
    } /* muted blue */
    71% {
      color: #7e55ff;
    } /* muted indigo */
    85% {
      color: #ff55ff;
    } /* muted violet */
    100% {
      color: #ff5555;
    } /* back to muted red */
  }

  .bling {
    animation: rainbow-text 0.2s linear infinite;
  }
</style>
