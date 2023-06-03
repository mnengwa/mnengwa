<script>
    export let href = "/";

    let open = false;
</script>

<li class="nav-item">
    <a class="nav-link" {href} on:click|preventDefault={() => (open = !open)}>
        <slot name="icon" />
    </a>

    {#if $$slots["drop-down"] && open}
        <slot name="drop-down" />
    {/if}
</li>

<style lang="scss">
    .nav-item {
        position: relative;
    }
</style>
