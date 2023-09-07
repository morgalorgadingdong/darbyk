<script>
    import Header from "./Header.svelte";
    import Footer from "./Footer.svelte";
</script>

<div class="app d-flex justify-content-center flex-wrap">
	<Header />
    <main class="col-12 col-md-10">
        <slot />
    </main>
    <Footer />
</div>


<style>
    /* .app {
    width: 100vw;
    overflow-x: hidden;
     position: relative;
    } */
</style>
