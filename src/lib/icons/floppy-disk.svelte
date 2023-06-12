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
    class="feather feather-save"
    xmlns="http://www.w3.org/2000/svg"
    ><path
        d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"
    /><polyline points="17 21 17 13 7 13 7 21" /><polyline
        points="7 3 7 8 15 8"
    /></svg
>
