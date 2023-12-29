<script>
import Header from './Header.svelte';
import {Splide, SplideSlide, SplideTrack } from '@splidejs/svelte-splide';
import '@splidejs/svelte-splide/css';
import { onMount } from 'svelte';
import { testimonials } from '../lib/data/testimonials';
import TestimonialCard from '../lib/components/TestimonialCard.svelte';
import products from '../lib/data/products.json';
import ProductCard from '../lib/components/ProductCard.svelte';
import Button from '../lib/components/Button.svelte';
import { slide } from 'svelte/transition'
import Shadow from '../lib/components/Shadow.svelte';

let menuView = 0;

function toggleMenuView(n) {
    if (menuView == n) {
        menuView = 0;
    } else {
        menuView = n
    }
    
    console.log(menuView)
}

onMount(() => {
    let menuItems = document.getElementsByClassName('menu-item')
    let underline = document.getElementsByClassName('underline')
    console.log(underline)
    let blurbs = document.getElementsByClassName('blurb')
    console.log(blurbs)
    let headerContainers = document.getElementsByClassName('menu-h3-container')
    let widths = []
    // Get all widths of menu titles
    for (let i = 0; i < menuItems.length; i++) {
        widths.push(menuItems[i].scrollWidth) 
    }
    // Find the max width
    let width = Math.max(...widths)
    // Set the underline, header containers, and blurbs to this width
    for (let i = 0; i < underline.length; i++) {
        underline[i].style.width = width + 'px'
        headerContainers[i].style.width = width + 'px'
        // blurbs[i].style.width = width + 'px' 
    }

})

</script>



<section id="hero" class="d-flex justify-content-between align-items-center flex-column flex-md-row">
    <div class="col-12 col-md-6 d-flex justify-content-center justify-content-md-start align-items-center flex-wrap order-md-0 order-2">
        <h1 class="mb-3">Your local (+ virtual) skin and brow expert</h1>
        <Button type = {'primary'} url = {'/about'}>Book</Button>
    </div>
    <img class="col-12 col-md-5 order-1" src="../img/flowers-framed.png" alt=""/>
    <Shadow id="shadow-hero" type="1"/>
</section>

<section id="menu" class="d-flex justify-content-center align-items-center col-12">
    <Shadow id="shadow-home-menu-1" type="1"/>
    <Shadow id="shadow-home-menu-2" type="2"/>
    <ul class="col-12 col-md-10 col-xl-6 d-flex justify-content-center flex-wrap">
        <li class="d-flex justify-content-center col-12 flex-wrap pt-0">
            <div class="d-flex justify-content-center menu-h3-container col-12 px-0">
                <h2 class="menu-item" on:click={() => toggleMenuView(1)}>N0. 1 <b>/</b> Brows & Lashes</h2>
            </div>
            {#if menuView == 1}
            <div class="d-flex justify-content-center flex-wrap " transition:slide={{ duration: 500 }}>
                <p class="pb-3 blurb">God creates dinosaurs. God destroys dinosaurs. God creates Man. Man destroys God. Man creates Dinosaurs. Yes, Yes, without the oops! Hey, take a look at the earthlings. Goodbye! God creates dinosaurs. God destroys dinosaurs. God creates Man. Man destroys God. Man creates Dinosaurs.</p>
                <Button type = {'primary'} url = {'/about'}>Book</Button>
            </div>
            {/if}
            <div class="underline"></div>
        </li>
        <li class="d-flex justify-content-center col-12 flex-wrap">
            <div class="d-flex justify-content-center menu-h3-container col-12 px-0">
                <h2 class="menu-item" on:click={() => toggleMenuView(2)}>N0. 2 <b>/</b> Acne Skin Care</h2>
            </div>
            {#if menuView == 2}
            <div class="d-flex justify-content-center flex-wrap" transition:slide={{ duration: 500 }}>
                <p class="pb-3 blurb">So you two dig up, dig up dinosaurs? My dad once told me, laugh and the world laughs with you, Cry, and I'll give you something to cry about you little bastard! Checkmate... You really think you can fly that thing? You really think you can fly that thing?</p>
                <Button type = {'primary'} url = {'/about'}>Book</Button>
            </div>
            {/if}
            <div class="underline"></div>
        </li>
        <li class="d-flex justify-content-center col-12 flex-wrap">
            <div class="d-flex justify-content-center menu-h3-container col-12 px-0">
                <h2 class="menu-item" on:click={() => toggleMenuView(3)}>N0. 3 <b>/</b> Virtual Coaching</h2>
            </div>
            {#if menuView == 3}
            <div class="d-flex justify-content-center flex-wrap" transition:slide={{ duration: 500 }}>
                <p class="pb-3 blurb">My dad once told me, laugh and the world laughs with you, Cry, and I'll give you something to cry about you little bastard! Yeah, but your scientists were so preoccupied with whether or not they could, they didn't stop to think if they should. Checkmate...</p>
                <Button type = {'primary'} url = {'/signup'}>Sign Up</Button>
            </div>
            {/if}
            
            <div class="underline"></div>
        </li>
        <div class="col-12 d-flex justify-content-center btn-container">
            <Button type = {'secondary'} url = {'/'}>Learn More</Button> 
        </div>
    </ul>
</section>

<!-- <section id="products">

    {#each products as product}
        <ProductCard { product }/>
    {/each}

</section> -->

<!-- <section id="testimonials">
    <Splide aria-label="Client Testimonials" class="z-reset" hasTrack={ false } options={ {
        type: 'loop',
        perPage: 2.5,
        breakpoints: {
            768: {
                perPage: 1.5,
            },
            576: {
                perPage: 1,
            }
        },
        focus: 'center',
        drag: 'free',
        snap: true
      } }>
      <SplideTrack>
            
        {#each testimonials as testimonial}
            <SplideSlide class="my-3 mt-0">
                <TestimonialCard { testimonial }/>
            </SplideSlide>
        {/each}
            
        </SplideTrack>
        <div class="splide__arrows">
            <button class="splide__arrow splide__arrow--prev"><i class="fa-solid fa-caret-left"></i></button>
            <button class="splide__arrow splide__arrow--next"><i class="fa-solid fa-caret-right"></i></button>
        </div>
        </Splide>
        
</section> -->

<section id="about" class="d-flex justify-content-center align-items-center col-12 flex-wrap">
    <div id="img-container" class="col-12 col-xl-6 col-lg-8 col-md-10 col-sm-10 px-3 d-flex justify-content-center">
        <img src="../img/about.jpg" alt="" class="col-12 border-radius-5"/>
    </div>
    <div id="about-blurb" class="col-12 col-xl-6 col-md-12 col-sm-8 d-flex justify-content-center flex-wrap mx-3 px-3">
        <h4>
            Hello, my name is Darby
        </h4>
        <p class="col-10 pt-3">Since launching Darby K Aesthetics in 2019, I've had the joy of guiding countless individuals in Medford, Oregon and beyond, towards achieving clear, radiant skin. Embracing a holistic approach to skincare, I work both in-person and virtually to ensure every client receives personalized care. I'm deeply passionate about what I do, and my goal is to help each person look and feel their best, no matter where they are. Let's embrace the beauty of natural, glowing skin together.</p>
    </div>
</section>


<style>

    #hero img {
        max-width: 500px;
    }

    .underline {
        border-bottom: 1px solid var(--color-dark);
        width: 100%;
        padding-top: 2rem;
    }

    #hero, #menu {
        margin-top: 0;
    }

    #about img { 
        max-width: 600px;
        box-shadow: -12px 12px 0px var(--color-tertiary);
    }

    #about h4 {
        background-color: var(--color-light);
        width: fit-content;
        border-radius: 25px;
        padding: 25px 25px 22px 25px;
    }

    #about-blurb {
        position: relative;
        top: -40px;
    }

    #menu h2:hover {
        cursor: pointer;
    }

    li {
        list-style: none;
        
    }

    #menu li {
        padding: 4rem 0 0 0;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        width: fit-content;
    }

    #menu li h2 {
        text-align: left;
        margin-top: 0;
        margin-bottom: 0;
        text-transform: uppercase;
        letter-spacing: 0.2rem;
    }

    /* #menu li h3::after {
        content: '';
        width: 100%;
        height: 1.5px;
        display: block;
        margin-top: 1rem;
        margin-bottom: 2rem;
        background: var(--color-dark);
        transition: all 0.3s ease-in-out;
    } */

    #menu li p {
        margin-top: 1rem;
    }

    #menu ul .btn-container {
        margin-top: 30px;
    }

    #menu ul .btn-container::before {
        content: '';
        width: 1px;
        height: 30px;
        background: var(--color-dark);
        position: absolute;
        bottom: 100%;
        left: 50%;
        margin-left: -2px;
    }

    @media (max-width: 992px) {
        #about h2 {
            font-size: 24px;
            padding: 15px 15px 12px 15px;
            border-radius: 10px;
        }

        #about-blurb {
            top: -25px;
        }
    }

    @media (max-width: 768px) {
        #about h2 {
            font-size: 24px;
            padding: 15px 15px 12px 15px;
            border-radius: 10px;
        }
        #about-blurb {
            top: -25px;
        }
    }

   

    
    @media (max-width: 576px) {
        #hero h1 {
            font-size: 28px;
        }

        h3 {
            font-size: 18px;
        }
        
        #about h4 {
            /* font-size: 18px !important; */
            padding: 15px 10px 12px 10px;
            border-radius: 10px;
            text-align: center;
        }

        /* #about img {
            border-radius: 25px;
            padding: 0;
        } */

        #about-blurb {
            top: -25px;
        }

        #about p {
            padding: 0;
        }
    }

    


</style>