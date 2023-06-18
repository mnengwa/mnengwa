<script>
  export let size = 24;
  export let strokeWidth = 2;

  $: width = size;
  $: height = size;
</script>

<svg
  {width}
  {height}
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
  stroke-linecap="round"
  stroke-linejoin="round"
  stroke-width={strokeWidth}
  class="feather feather-award"
  xmlns="http://www.w3.org/2000/svg"
  ><circle
    fill="none"
    cx="12"
    cy="8"
    r="7"
  /><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" /></svg
>
