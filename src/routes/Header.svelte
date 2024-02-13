<script>
import {fly} from 'svelte/transition'
import { onMount } from 'svelte';
import Shadow from '$lib/components/Shadow.svelte';


// onMount(() => {
//     document.querySelector('.hamburger-menu').addEventListener('click', function() {
//         this.classList.toggle('active');
//     });
// })

let menuShow = false
  /**
   * @type {Element | null}
   */
let menuToggle
onMount(() => {
    menuToggle = document.querySelector('.hamburger-menu')
    // console.log(menuToggle)
})

function toggleHamburgerMenu() {
    menuShow = !menuShow
    menuToggle.classList.toggle('active')
    console.log(menuShow)
    
}

</script>

<Shadow id="shadow-header" type="1"/>
<!-- <img id="shadow-header" class="shadow-1" src="../img/shadow-1.png"> -->
<nav class="col-12 col-sm-10 px-0 pt-3 pt-md-5">
    <div class="justify-content-between col-12 align-items-center d-md-flex d-none">
        <ul class="col-4 col-lg-3">
            <a href="/store"><li>store</li></a>
            <a href="/virtualcoaching"><li>virtual coaching</li></a>
        </ul>
        <div class="col-4 px-0">
            <a href="/" class="col-12 px-0"><img class="col-12" src="../img/logo-1.png" alt="logo"></a>
        </div>
        <ul class="col-4 col-lg-3">
            <a href="https://squareup.com/appointments/book/7yn38wnnxsv2jw/43SZPJZ855AGE/services"><li>book</li></a>
            <a href="/store/cart"><li><img src="../img/shopping-cart.png" /></li></a>
            <a href="/virtualcoaching/login"><li><img src="../img/user.png" /></li></a>
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
        <ul id="mobileMenu" class="d-flex flex-column align-items-end" transition:fly = {{ duration: 600, x: 200 }}>
            <a on:click={toggleHamburgerMenu} href="/store"><li>store</li></a>
            <a on:click={toggleHamburgerMenu} href="/virtualcoaching"><li>virtual coaching</li></a>
            <a on:click={toggleHamburgerMenu} href="https://squareup.com/appointments/book/7yn38wnnxsv2jw/43SZPJZ855AGE/services"><li>book</li></a>
            <a on:click={toggleHamburgerMenu} href="/cart"><li class="d-flex justify-content-end"><img src="../img/shopping-cart.png" /></li></a>
            <a on:click={toggleHamburgerMenu} href="/virtualcoaching/login"><li class="d-flex justify-content-end"><img src="../img/user.png" /></li></a>
        </ul>
    {/if}
</nav>



<style>

.hamburger-menu {
    cursor: pointer;
    overflow: visible;
}

.line {
    transition: all 0.4s ease;
    transform-origin: center;
}

li {
    font-family: var(--font-body);
}

    #mobileMenu a {
        padding: 1rem;
        width: 100%;
        text-align: right;
    }

    #mobileMenu {
        position: absolute;
        right: 0px;
        top: 80px;
        background-color: rgba(var(--color-background-o));
        z-index: 99;
        padding-right: 15px;
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

        .hamburger-menu.active .line1 {
        transform-origin: center;
        /* transform: rotate(40deg) translateY(4px) translateX(-3px); */
        transform: rotate(35deg) translatey(3px);
        }

    .hamburger-menu.active .line2 {
    transform: rotate(-35deg) translateY(-3px);
    transform-origin: center;
    }

</style>