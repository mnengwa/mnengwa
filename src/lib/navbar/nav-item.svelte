<script>
  import { goto } from "$app/navigation";
  import DropDown from "$lib/navbar/drop-down.svelte";

  /** @type {string} */
  export let href = "/";

  /** @type {string} */
  export let name = "";

  /** @type {any[]} */
  export let menu = [];

  let open = false;
  $: redirects = (menu ?? []).length === 0;

  $: item = !redirects
    ? {
        element: "button",
        handler: () => (open = !open),
      }
    : {
        element: "a",
        handler: () => goto(href),
      };
</script>

<li class="nav-item position-relative">
  <svelte:element
    this={item?.element}
    title={name}
    on:click|preventDefault={item?.handler}
    class="w-100 h-100 d-flex align-items-center border-0 bg-transparent"
  >
    <slot name="icon" />
  </svelte:element>

  {#if !redirects}
    <DropDown
      {menu}
      {open}
    />
  {/if}
</li>

<style lang="scss">
  .nav-item a,
  .nav-item button {
    cursor: pointer;
    color: var(--mnengwa-link-color);

    &:hover {
      color: var(--mnengwa-link-hover-color);
    }
  }
</style>
