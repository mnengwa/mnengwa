<script>
    export let href = "/";
</script>

<li class="drop-down-item w-100">
    <a
        {href}
        class="gap-4 d-flex align-items-center justify-content-evenly text-decoration-none"
    >
        <slot name="icon" />
        <slot name="name" />
    </a>
</li>
