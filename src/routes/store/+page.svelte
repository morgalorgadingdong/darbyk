<script>

    // import items from '../store-items.json';
    import ProductCard from '../../lib/components/ProductCard.svelte';
    export let data

    console.log(data)
    
</script>

<section class="col-12 d-flex justify-content-center flex-wrap my-5">
    <div class="col-12 col-md-10 d-flex justify-content-between flex-wrap content-container mt-4">
        {#each data.storeItems as product}
            <div class="col-6 col-md-3 p-3">
                <ProductCard { product } />
            </div>
        {/each}
    </div>
</section>


<style>
</style>