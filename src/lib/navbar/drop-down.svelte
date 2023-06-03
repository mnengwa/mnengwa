<script>
    import { fly } from "svelte/transition";
</script>

<ul
    transition:fly={{ y: -72, duration: 500 }}
    class="mt-3 p-3 gap-3 bg-body d-flex flex-column shadow drop-down rounded-2 list-unstyled"
>
    <slot />
</ul>

<style lang="scss">
    .drop-down {
        overflow: hidden;

        position: absolute;
        right: 0;
    }

    :global(.drop-down .drop-down-item:not(:last-child):after) {
        height: 2px;
        width: 80%;

        content: "";
        display: flex;

        position: absolute;
        top: 50%;

        filter: opacity(0.25);
        background-color: var(--bs-secondary);
    }
</style>
