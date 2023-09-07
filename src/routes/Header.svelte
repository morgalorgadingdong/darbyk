<script>
import {slide} from 'svelte/transition'


let menuShow = false

function toggleHamburgerMenu() {
    menuShow = !menuShow
    console.log(menuShow)
}

</script>


<nav class="col-12 col-md-10">
    <div class="justify-content-between col-12 align-items-center d-md-flex d-none">
        <ul class="col-3">
            <a href="/products"><li>products</li></a>
            <a href="/services"><li>services</li></a>
        </ul>
        <div class="col-4">
            <a href="/" class="col-12 px-0"><img class="col-12" src="../img/logo-1.png" alt="logo"></a>
        </div>
        <ul class="col-3">
            <a href="/about"><li>about</li></a>
            <a href="/cart"><li><img src="../img/shopping-cart.png" /></li></a>
            <a href="/login"><li><img src="../img/user.png" /></li></a>
        </ul>
    </div>
    <div class= "justify-content-between col-12 align-items-center d-flex d-md-none">
        <div class="col-6">
            <a href="/" class="col-12 px-0"><img class="col-12" src="../img/logo-1.png" alt="logo"></a>
        </div>
        <img id="menuToggle" src="../img/hamburger-menu.png" class="px-3" on:click={toggleHamburgerMenu} alt="test"/>
            
        
    </div>
    {#if menuShow}
        <ul id="mobileMenu" class="d-flex flex-column align-items-end" transition:slide = {{ duration: 500 }}>
            <a href="/products"><li>products</li></a>
            <a href="/services"><li>services</li></a>
            <a href="/about"><li>about</li></a>
            <a href="/cart"><li><img src="../img/shopping-cart.png" /></li></a>
            <a href="/login"><li><img src="../img/user.png" /></li></a>
        </ul>
    {/if}
</nav>



<style>

    #mobileMenu {
        position: absolute;
        right: 45px;
        top: 80px;
    }

    nav {
        padding-top: 2rem;
    }

     ul {
        display: flex;
        justify-content: space-between;
        width: fit-content;
        padding: 0;
     }



     li {
        list-style: none;
     }

        li > img {
            height: 20px;
        }

</style>