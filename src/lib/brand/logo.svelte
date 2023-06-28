<script>
  export let size = 256;

  $: width = size;
  $: height = size;
</script>

<svg
  {width}
  {height}
  fill="none"
  viewBox="0 0 256 256"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    class="linear-paths"
    d="M149 96L213 96"
    stroke="#212121"
    stroke-width="32"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
  <path
    class="linear-paths"
    d="M128 160L213 160"
    stroke="#212121"
    stroke-width="32"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
  <path
    class="linear-paths"
    d="M106.667 32L85.3333 224"
    stroke="#212121"
    stroke-width="32"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
  <path
    class="linear-paths"
    d="M170.667 32L149.333 224"
    stroke="#212121"
    stroke-width="32"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
  <path
    class="curved-paths"
    d="M43 112C51.8366 112 59 104.837 59 96C59 87.1634 51.8366 80 43 80C34.1634 80 27 87.1634 27 96C27 104.837 34.1634 112 43 112Z"
    fill="#FF1443"
    stroke="#FF1443"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
  <path
    class="curved-paths"
    d="M43 176C51.8366 176 59 168.837 59 160C59 151.163 51.8366 144 43 144C34.1634 144 27 151.163 27 160C27 168.837 34.1634 176 43 176Z"
    fill="#FF1443"
    stroke="#FF1443"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
</svg>

<style lang="scss">
  .linear-paths {
    stroke: var(--primary-colour);
  }

  .curved-paths {
    fill: var(--secondary-colour);
    stroke: var(--secondary-colour);
  }

  @media (prefers-color-scheme: light) {
    :root {
      --primary-colour: var(--ms-dark, #212121);
      --secondary-colour: var(--ms-primary, #ff1443);
    }
  }

  @media (prefers-color-scheme: dark) {
    :root {
      --primary-colour: var(--ms-light, #f5f5f5);
      --secondary-colour: var(--ms-primary, #ff1443);
    }
  }
</style>
