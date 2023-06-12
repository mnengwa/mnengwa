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
    class="feather feather-moon"
    xmlns="http://www.w3.org/2000/svg"
    ><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg
>
