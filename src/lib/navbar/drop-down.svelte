<script>
  import { ArrowLeft } from "$lib/icons";
  import { fly, fade } from "svelte/transition";
  import DropDownItem from "$lib/navbar/drop-down-item.svelte";

  const reset = (/** @type {boolean} */ open) => {
    if (!open) view = "/root";
    return;
  };

  const toggle = (/** @type {string} */ key) => (view = key);

  let view = "/root";

  /** @type {any[]}*/
  export let menu = [];

  export let open = false;

  $: reset(open);
</script>

{#if open}
  <div
    class="mt-3 p-3 drop-down overflow-hidden position-absolute end-0 bg-body shadow rounded-2"
    transition:fly={{ y: -64, duration: 500 }}
  >
    <ul class="primary drop-down-list list-unstyled d-flex flex-column">
      {#each menu as { func, href, icon, name, ...rest } (name)}
        {#if (rest?.menu ?? []).length !== 0}
          {#if view === "/root"}
            <DropDownItem
              func={toggle}
              {href}
              {name}
            >
              <svelte:component
                this={icon}
                size={20}
                slot="icon"
              />
            </DropDownItem>
          {/if}

          {#if view === href}
            <ul
              out:fade={{ duration: 500 }}
              in:fly={{ x: 200, duration: 500 }}
              class="secondary drop-down-list list-unstyled d-flex flex-column"
            >
              <DropDownItem
                href="/root"
                {name}
                func={toggle}
              >
                <ArrowLeft
                  size={20}
                  slot="icon"
                />
              </DropDownItem>

              {#each rest.menu ?? [] as { func, icon, name }}
                <DropDownItem
                  {href}
                  {func}
                  {name}
                >
                  <svelte:component
                    this={icon}
                    size={20}
                    slot="icon"
                  />
                </DropDownItem>
              {/each}
            </ul>
          {/if}
        {:else if view === "/root"}
          <DropDownItem
            {func}
            {href}
            {name}
          >
            <svelte:component
              this={icon}
              size={20}
              slot="icon"
            />
          </DropDownItem>
        {/if}
      {/each}
    </ul>
  </div>
{/if}

<style lang="scss">
  .drop-down {
    width: 200px;
  }

  .drop-down-list {
    --gap: 1rem;
    gap: var(--gap);
  }

  :global(.drop-down-list .drop-down-list-item:not(:last-child):after) {
    height: 1px;
    width: 100%;

    content: "";
    display: flex;

    position: relative;
    top: calc(var(--gap) * 0.5);

    filter: opacity(0.25);
    background-color: var(--mnengwa-secondary);
  }
</style>
