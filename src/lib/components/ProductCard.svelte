<script>
    export let product;
    console.log(product)
    // let price = item.itemData.variations[0].itemVariationData.priceMoney.amount;
    // price = (Number(price.slice(0, -1))) / 100;
    let safeName = encodeURIComponent(product.name)

</script>


<a href={'./store/' + safeName} data-sveltekit-preload-data="hover">
    <div class="col-12 card mx-0 px-0">
        <div class="card-body">
            <div class="card-img-top" >
                <img src="{ product.imgURL[0] }"/>
                <!-- <img src="{'$lib/img/listings/' +  listing.Title + '/' + listing.MLS + '-0.jpg'}" alt="{listing.Title}"/> -->
                <!-- <img src='../../lib/img/listings/${listing.Title}/${listing.MLS}-0.jpg' alt="temp"/> -->
                <!-- <img src='$lib/' alt="{listing.Caption0}"/> -->
            </div>
            <div class="col-12 d-flex justify-content-between px-0">
                <p class="name col-9">{product.name}</p>
                <p class="price col-3">$ {product.price} </p>
            </div>
            <!-- <div class="card-img-top"></div> -->
        </div>
    </div>
</a>


<style>
    * {
        border: none !important;
        background-color: rgba(0,0,0,0);
    }

    img {
        transition: all 0.3s ease-in-out;
    }

    .price {
        text-align: right;
    }

    a {
        text-decoration: none;
        color: black;
        margin: 1rem;
        
    }

    .card {
        margin: 1rem;
    }
    .card-body {
        padding: 0;
    }

    .card-img-top {
        width: 100%;
        height: 15rem;
        padding: 0;
        background-size: cover;
        background-position: center;
        overflow: hidden;
        border-radius: 15px;
        /* background-image: url({imgSrc}) */
    }
    .card-img-top > img, .card-img-left > img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        margin: 0;
        border-radius: 15px;
    }

    a:hover img {
        transform: scale(1.1);
        transition: all 0.3s ease-in-out;
        box-shadow: 2px 2px 0 2px #000;
    }

.card-body:hover {
    /* box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2); */
    cursor: pointer;
    border-radius: 15px;
}


</style>