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
    xmlns="http://www.w3.org/2000/svg"
    class="feather feather-arrow-right"
    ><line x1="5" y1="12" x2="19" y2="12" /><polyline
        points="12 5 19 12 12 19"
    /></svg
>
