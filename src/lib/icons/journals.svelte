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
    class="feather feather-book-open"
    xmlns="http://www.w3.org/2000/svg"
    ><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path
        d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"
    /></svg
>
