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
    let widths = []
    for (let i = 0; i < menuItems.length; i++) {
        widths.push(menuItems[i].scrollWidth) 
    }
    let width = Math.max(...widths)
    for (let i = 0; i < underline.length; i++) {
        underline[i].style.width = width + 'px' 
    }
})

</script>

<div class="">


<section id="hero" class="d-flex justify-content-between align-items-center flex-column flex-md-row">
    <div class="col-12 col-md-6 d-flex justify-content-center justify-content-md-start align-items-center flex-wrap order-2 order-md-1">
        <h1>Your local (+ virtual) skin and brow expert</h1>
        <Button type = {'primary'} url = {'/about'}>Book</Button>
           
    </div>
    <img class="col-12 col-md-5 order-1 order-md-2" src="../img/flowers-framed.png" alt=""/>
</section>

<section id="menu" class="d-flex justify-content-center align-items-center col-12">
    <ul class="col-12 col-md-10 col-xl-6 d-flex justify-content-center flex-wrap">
        <li class="d-flex flex-column align-items-center">
            <h3 class="menu-item" on:click={() => toggleMenuView(1)}>N0. 1 / Brows & Lashes</h3>
            {#if menuView == 1}
            <div class="d-flex justify-content-center flex-wrap" transition:slide={{ duration: 500 }}>
                <p>God creates dinosaurs. God destroys dinosaurs. God creates Man. Man destroys God. Man creates Dinosaurs. Yes, Yes, without the oops! Hey, take a look at the earthlings. Goodbye! God creates dinosaurs. God destroys dinosaurs. God creates Man. Man destroys God. Man creates Dinosaurs.</p>
                <Button type = {'primary'} url = {'/about'}>Book</Button>
            </div>
            {/if}
            <div class="underline"></div>
        </li>
        <li class="d-flex flex-column align-items-center">
            <h3 class="menu-item" on:click={() => toggleMenuView(2)}>N0. 2 / Acne Skin Care</h3>
            {#if menuView == 2}
            <div class="d-flex justify-content-center flex-wrap" transition:slide={{ duration: 500 }}>
                <p>So you two dig up, dig up dinosaurs? My dad once told me, laugh and the world laughs with you, Cry, and I'll give you something to cry about you little bastard! Checkmate... You really think you can fly that thing? You really think you can fly that thing?</p>
                <Button type = {'primary'} url = {'/about'}>Book</Button>
            </div>
            {/if}
            <div class="underline"></div>
        </li>
        <li class="d-flex flex-column align-items-center">
            <h3 class="menu-item" on:click={() => toggleMenuView(3)}>N0. 3 / Virtual Coaching</h3>
            {#if menuView == 3}
            <div class="d-flex justify-content-center flex-wrap" transition:slide={{ duration: 500 }}>
                <p>My dad once told me, laugh and the world laughs with you, Cry, and I'll give you something to cry about you little bastard! Yeah, but your scientists were so preoccupied with whether or not they could, they didn't stop to think if they should. Checkmate...</p>
                <Button type = {'primary'} url = {'/about'}>Book</Button>
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
    <div id="img-container" class="col-12 col-xl-6 col-md-10 col-sm-8 px-3">
        <img src="../img/about.jpg" alt="" class="border-radius-50 col-12"/>
    </div>
    <div id="about-blurb" class="col-12 col-xl-6 col-md-10 col-sm-8 d-flex justify-content-center flex-wrap mx-3 px-3">
        <h3>
            Hello, my name is Darby
        </h3>
        <p class="col-10 pt-3">Since launching Darby K Aesthetics in 2019, I've had the joy of guiding countless individuals in Medford, Oregon and beyond, towards achieving clear, radiant skin. Embracing a holistic approach to skincare, I work both in-person and virtually to ensure every client receives personalized care. I'm deeply passionate about what I do, and my goal is to help each person look and feel their best, no matter where they are. Let's embrace the beauty of natural, glowing skin together.</p>
    </div>
</section>

</div>

<style>
    .underline {
        border-bottom: 2px solid var(--color-dark);
        width: 100%;
        padding-top: 1rem;
    }

    #hero, #menu {
        margin-top: 0;
    }

    #about h3 {
        background-color: var(--color-light);
        width: fit-content;
        border-radius: 25px;
        padding: 25px 25px 22px 25px;
    }

    #about-blurb {
        position: relative;
        top: -40px;
    }

    #menu h3:hover {
        cursor: pointer;
    }

    li {
        list-style: none;
        
    }

    #menu li {
        
        padding: 1rem 0 0 0;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        width: fit-content;
    }

    #menu li h3 {
        text-align: center;
        margin: 1rem;
        margin-bottom: 0;
    }

    /* #menu li::after {
        content: '';
        width: 100%;
        height: 2px;
        display: block;
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
        width: 2px;
        height: 30px;
        background: var(--color-dark);
        position: absolute;
        bottom: 100%;
        left: 50%;
        margin-left: -2px;
    }

    .border-radius-50 {
        border-radius: 50px;
    }

    @media (max-width: 992px) {
        #about h3 {
            font-size: 24px;
            padding: 15px 15px 12px 15px;
            border-radius: 10px;
        }

        #about-blurb {
            top: -25px;
        }
    }

    @media (max-width: 768px) {
        #about h3 {
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
            font-size: 22px;
        }
        
        #about h3 {
            font-size: 18px;
            padding: 15px 10px 12px 10px;
            border-radius: 10px;
            text-align: center;
        }

        #about img {
            border-radius: 25px;
            padding: 0;
        }

        #about-blurb {
            top: -25px;
        }

        #about p {
            padding: 0;
        }
    }

    


</style>