<script>
import { cart } from '$lib/stores/cart';
import { goto } from '$app/navigation';
import Button from './Button.svelte';

export let currentCart


$: currentCart = $cart
let isLoading = false;
// let currentCart = $cart         
console.log(currentCart)



// name: item.name,
// quantity: item.quantity,
// basePriceMoney: {
//     amount: item.price * 100,
//     currency: 'USD'
// }


async function createCheckoutLink() {
  let formattedCart = currentCart.map(item => {
    return {
        name: item.name,
        quantity: String(item.quantity),
        variationName: item.size,
        basePriceMoney: {
            amount: item.price * 100,
            currency: 'USD'
        }
    }
})

  isLoading = true;  
  const data = {
      items: formattedCart
    };
    console.log('start')
    console.log(JSON.stringify(data))
    console.log('end')
    try {
      const response = await fetch('/api/createCheckoutLink', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        const checkoutLink = result.url;
        console.log(checkoutLink)
        // Redirect to the checkout link
        goto(checkoutLink);
      } else {
        // Handle non-200 response status
      }
    } catch (error) {
      // Handle any errors
    }
  }

</script>

<a on:click={createCheckoutLink}>
  <Button type = {'primary'}>

    {#if isLoading}
    Loading...
  {:else}
    Checkout
  {/if}

</Button>
</a>
<!-- <button on:click={createCheckoutLink} class="btn"> -->