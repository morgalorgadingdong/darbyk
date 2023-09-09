<script>
import {slide} from 'svelte/transition'
import { onMount } from 'svelte';


// onMount(() => {
//     document.querySelector('.hamburger-menu').addEventListener('click', function() {
//         this.classList.toggle('active');
//     });
// })

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
        <div class="col-9 col-sm-6 px-0">
            <a href="/" class="col-12 px-0"><img class="col-12" src="../img/logo-1.png" alt="logo"></a>
        </div>
        <!-- <img id="menuToggle" src="../img/hamburger-menu.png" class="px-3" on:click={toggleHamburgerMenu} alt="test"/> -->
        <svg width="24" height="24" viewBox="0 0 24 6" fill="none" xmlns="http://www.w3.org/2000/svg" class="hamburger-menu" on:click={toggleHamburgerMenu}>
            <line x1="0" y1="0" x2="24" y2="0" stroke="var(--color-dark)" stroke-width="2" class="line line1"></line>
            <line x1="0" y1="6" x2="24" y2="6" stroke="var(--color-dark)" stroke-width="2" class="line line2"></line>
        </svg>
            
        
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

.hamburger-menu {
    cursor: pointer;
    overflow: visible;
}

.line {
    transition: all 0.3s ease;
    transform-origin: center;
}



    #mobileMenu a {
        padding: 1rem;
        width: 100%;
        text-align: right;
    }

    #mobileMenu {
        position: absolute;
        right: 45px;
        top: 80px;
        background-color: rgba(var(--color-background-o), 0.8);
        z-index: 99;
        /* box-shadow: -8px -8px 16px var(--color-background); */
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

        a {
            text-transform: uppercase;
            transition: all 0.3s ease-in-out;
        }

        a:hover {
            text-decoration: none;
            cursor: pointer;
            color: var(--color-primary);
            transition: all 0.3s ease-in-out;
        }

        a:hover img {
            color: var(--color-primary);
        }

</style>