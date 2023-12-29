<script>
    import Cart from '$lib/components/Cart.svelte';
    import Button from '$lib/components/Button.svelte';
</script>

<!-- <div class="hero hero-sub col-12 d-flex flex-column justify-content-end">
    <div class="img-container">
        <div class="img-overlay"></div>
        <img class="img" src="../img/hero-2.jpg"/>
    </div>
    <div id="hero-tagline-container" class="d-flex justify-content-center flex-wrap p-3 pb-3 pb-md-5">
        <h1 class="hero-tagline col-12">Cart</h1>
    </div>
</div> -->
<section class="col-12 d-flex justify-content-center flex-wrap mb-5">
    <Cart />
    <div class="col-12 d-flex justify-content-center ">
        <Button type = {'secondary'} url = {'/store'}>Keep shopping</Button>
        <!-- <a href="/store"><button class="btn btn-secondary">Keep shopping</button></a> -->
    </div>
</section>