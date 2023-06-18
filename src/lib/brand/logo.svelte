<script>
  export let size = 256;

  $: width = size;
  $: height = size;
</script>

<svg
  {width}
  {height}
  fill="none"
  version="1.1"
  viewBox="0 0 256 256"
  xmlns="http://www.w3.org/2000/svg"
>
  <g>
    <!-- <path
        d="
        M (CX - R), CY
        a R,R 0 1,0 (R * 2),0
        a R,R 0 1,0 -(R * 2),0
      "
      /> 
    
      <circle cx="128" cy="128" r="128" />
    -->

    <path
      id="planet"
      d="
      M 0, 128
      a 128,128 0 1,0 256,0
      a 128,128 0 1,0 -256,0"
      transform="rotate(0, 128, 128)"
    />

    <text
      font-size="32"
      font-family="More Sugar, cursive, monospace"
    >
      <textPath
        transform="scale(-1, 1)"
        textLength="512"
        startOffset="0px"
        xlink:href="#planet"
      >
        MNENGWA & CO.
      </textPath>
    </text>
  </g>

  <circle
    cx="128"
    cy="128"
    r="64"
  />

  <text
    x="128"
    y="136"
    font-size="64"
    text-anchor="middle"
    alignment-baseline="middle"
    font-family="More Sugar, cursive, monospace"
  >
    ://
  </text>
</svg>

<style lang="scss">
  text {
    fill: var(--mnengwa-primary, #ff1443);
  }

  circle {
    fill: var(--mnengwa-dark, #212121);
  }

  @font-face {
    font-weight: 400;
    font-style: normal;
    font-family: "More Sugar";
    src: local("More Sugar"),
      url("%sveltekit.assets%/fonts/MoreSugar-Regular.ttf");
  }

  @media (prefers-color-scheme: dark) {
    text {
      fill: var(--mnengwa-primary, #ff1443);
    }

    circle {
      fill: var(--mnengwa-light, #212121);
    }
  }
</style>
