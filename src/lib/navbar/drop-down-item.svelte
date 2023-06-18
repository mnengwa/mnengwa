<script>
  import { goto } from "$app/navigation";

  /** @type {string|null} */
  export let href = null;

  /** @type {any|null} */
  export let func = null;

  /** @type {string} */
  export let name = "";

  $: item =
    func && typeof func === "function"
      ? { element: "button", handler: () => func(href) }
      : { element: "a", handler: () => goto(href ?? "/") };
</script>

<li class="drop-down-list-item w-100">
  <svelte:element
    this={item?.element ?? null}
    title={name}
    on:click|preventDefault={item?.handler}
    class="p-0 w-100 h-100 gap-5 border-0 bg-transparent d-flex align-items-center justify-content-start text-decoration-none"
  >
    <slot name="icon" />

    <span class="fw-semibold flex-fill d-flex justify-content-center">
      {name}
    </span>
  </svelte:element>
</li>

<style lang="scss">
  .drop-down-list-item {
    height: 32px;
    cursor: pointer;
  }

  .drop-down-list-item a,
  .drop-down-list-item button {
    cursor: pointer;
    color: var(--mnengwa-link-color);

    &:hover {
      color: var(--mnengwa-link-hover-color);
    }
  }
</style>
