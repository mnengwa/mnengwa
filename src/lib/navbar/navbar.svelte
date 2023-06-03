<script>
    import Logo from "$lib/brand/logo.svelte";
    import Name from "$lib/brand/name.svelte";
    import NavItem from "$lib/navbar/nav-item.svelte";
    import Dropdown from "$lib/navbar/drop-down.svelte";
    import DropdownItem from "$lib/navbar/drop-down-item.svelte";
</script>

<nav class="navbar py-2">
    <div class="container d-flex align-items-center justify-content-between">
        <a
            href="/"
            class="d-flex align-items-center gap-3 text-decoration-none"
        >
            <Logo size={48} />
            <Name />
        </a>

        <ul class="m-0 h-100 list-unstyled d-flex gap-4 gap-md-5">
            <NavItem href="projects">
                <i slot="icon" class="fs-3 bi bi-collection-fill" />
            </NavItem>

            <NavItem href="journals">
                <i slot="icon" class="fs-3 bi bi-bookmarks-fill" />
            </NavItem>

            <NavItem href="discover">
                <i slot="icon" class="fs-3 bi bi-asterisk" />

                <Dropdown slot="drop-down">
                    <DropdownItem href="/playlist">
                        <span
                            slot="name"
                            class="fs-5 fw-semibold text-decoration-none"
                            >Playlist
                        </span>
                        <i
                            slot="icon"
                            class="fs-5 fw-semibold bi bi-music-note-list"
                        />
                    </DropdownItem>

                    <DropdownItem href="/fractals">
                        <span
                            slot="name"
                            class="fs-5 fw-semibold text-decoration-none"
                            >Fractals
                        </span>
                        <i slot="icon" class="fs-5 fw-semibold bi bi-snow3" />
                    </DropdownItem>
                </Dropdown>
            </NavItem>
        </ul>
    </div>
</nav>

<hr class="m-0 b-0" />

<style lang="scss">
    $height: 64px;

    .navbar {
        position: fixed;
        z-index: 2;

        box-sizing: border-box;
        height: $height;
        width: 100%;
    }

    hr {
        display: block;

        width: 100%;
        padding-top: $height;
    }
</style>
