<script>
    export let product;

    let price = product.itemData.variations[0].itemVariationData.priceMoney.amount;
    price = (Number(price.slice(0, -1))) / 100;

</script>




<div data-sveltekit-preload-data="hover">
    <div class="col-12 card mx-0 px-0">
        <div class="card-body">
            <div class="card-img-top" >
                <img src="{ product.itemData.imgURL[0] }"/>
                <!-- <img src="{'$lib/img/listings/' +  listing.Title + '/' + listing.MLS + '-0.jpg'}" alt="{listing.Title}"/> -->
                <!-- <img src='../../lib/img/listings/${listing.Title}/${listing.MLS}-0.jpg' alt="temp"/> -->
                <!-- <img src='$lib/' alt="{listing.Caption0}"/> -->
            </div>
            <div class="col-12 d-flex justify-content-between">
                <p>{product.itemData.name}</p>
                <p>$ {price} </p>
            </div>
            <!-- <div class="card-img-top"></div> -->
        </div>
    </div>
</div>


<style>

</style>