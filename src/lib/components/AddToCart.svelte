<script>
    import { cart } from '$lib/stores/cart';
    import { goto } from '$app/navigation';
    import Button from './Button.svelte';
    
    // import { useState } from 'svelte';

    export let data

    console.log(data)

    
    let currentCart = $cart

    let size = '';
    let quantity = 1;
    let message = '';
    let price = data.price;
    let name = data.name;
    let variations = data.variations;
    let img = data.imgURL[0]

  function addToCart() {
    if (variations.length > 1) {
      if (size && quantity > 0) {
      const item = { name, img, price, size, quantity };
      console.log(currentCart)
      let itemIndex = currentCart.findIndex(item => item.name === name && item.size === size);
      if (itemIndex !== -1) {
        console.log(itemIndex)
        currentCart[itemIndex].quantity+=quantity;
      } else {
        currentCart.push({ name, img, price, size, quantity: quantity });
      }
      cart.update(items => currentCart)
    //   cart.update(items => [...items, item]);
      message = 'Item added to cart!';
      goto('/store/cart')
    } else {
      message = 'Please select a size and quantity.';
    }
    } else {
      if (quantity > 0) {
        const item = { name, img, price, size, quantity };
        console.log(currentCart)
        let itemIndex = currentCart.findIndex(item => item.name === name);
        if (itemIndex !== -1) {
          console.log(itemIndex)
          currentCart[itemIndex].quantity+=quantity;
        } else {
          currentCart.push({ name, img, price, size, quantity: quantity });
        }
        cart.update(items => currentCart)
        message = 'Item added to cart!';
      goto('/store/cart')
      } else {
        message = 'Please select a quantity.';
      }
    }

    
  }



    // function addItem(item) {
    //     let name = item.name
    //     let price = item.price
    //     let size 
    //     let quantity = 1
    //     // get the current value of the cart
    //     const currentCart = $cart;
        
    //     // find the item in the cart
    //     const itemIndex = currentCart.indexOf(item);
        
    //     // if the item is already in the cart, increment the quantity
    //     if (itemIndex !== -1) {
    //         currentCart[itemIndex].quantity++;
    //     } else {
    //         // otherwise, add a new item to the cart
    //         currentCart.push({ item.name, item.price, quantity: 1 });
    //     }
        
    //     // update the cart store
    //     cart.set(currentCart);

    //     goto('/store/cart')
    // }

    
</script>



<form on:submit|preventDefault={addToCart} class="d-flex justify-content-start align-items-center flex-wrap py-3">
  {#if variations.length > 1}
  <label for="size" class="pl-3 pr-1">Size:</label>
    <select id="size" bind:value={size}>
      <option value="">Select Size</option>
      {#each variations as variation}
          <option value="{variation}">{variation}</option>
      {/each}
    </select>
  {/if}
  

    
    <label for="quantity" class="pl-3 pr-1 mb-0">Quantity:</label>
    <input type="number" class="mr-3" id="quantity" bind:value={quantity} min="1" />

    <Button type="addToCart" submitType="submit">Add to Cart</Button>

    <!-- <button class="btn m-3" type="submit">Add to Cart</button> -->
    {#if message}
      <p class="alert">{message}</p>
    {/if}
  </form>

  


  <style>
    
    .alert {
      color: red;
    }
    input {
      width: 40px;
      height: fit-content;
    }
    select {
      width: 100px;
      height: fit-content;
    }
  </style>