<script>
    import Logo from "$lib/brand/logo.svelte";
    import Name from "$lib/brand/name.svelte";
    import NavItem from "$lib/navbar/nav-item.svelte";
    import {
        Sun,
        Moon,
        Stars,
        Discover,
        Journals,
        Projects,
        Snowflake,
        FloppyDisk,
    } from "$lib/icons";
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
            <NavItem href="/projects" name="Projects">
                <Projects size={32} slot="icon" />
            </NavItem>
            <NavItem href="/journals" name="Journals">
                <Journals size={32} slot="icon" />
            </NavItem>
            <NavItem
                href="/discover"
                name="Discover"
                menu={[
                    {
                        icon: Stars,
                        href: "/themes",
                        name: "Themes",
                        menu: [
                            { name: "Dark", icon: Moon, func: () => {} },
                            { name: "Light", icon: Sun, func: () => {} },
                            { name: "Retro", icon: FloppyDisk, func: () => {} },
                        ],
                    },
                    {
                        icon: Snowflake,
                        href: "/fractals",
                        name: "Fractals",
                    },
                ]}
            >
                <Discover size={32} slot="icon" />
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

    .navbar div.container {
        height: 48px;
    }

    hr {
        display: block;

        width: 100%;
        padding-top: $height;
    }
</style>
