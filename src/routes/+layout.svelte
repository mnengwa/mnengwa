<script>
    import "$css/app.scss";
    import Navbar from "$lib/navbar/navbar.svelte";
    import Header from "$lib/header.svelte";
    import Footer from "$lib/footer.svelte";
</script>

<Navbar />

<Header />

<main>
    <div class="container">
        <slot />
    </div>
</main>

<Footer />
