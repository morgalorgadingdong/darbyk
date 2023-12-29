import { Client, Environment, ApiError } from 'square';
import { goto } from '$app/navigation';

import { SQUARE_ACCESS_TOKEN, IDEMPOTENCY_KEY } from '$env/static/private';
import crypto from 'crypto';
import type { PageServerLoad } from './$types';
import { cart } from '$lib/stores/cart';

const client = new Client({
    accessToken: SQUARE_ACCESS_TOKEN,
    environment: Environment.Production,
});



// export const load: PageServerLoad = async function() { 
//     // let password = env.cryptoPW
    
//     let checkoutCart = $cart
    
//     console.log('cart', checkoutCart)

//     async function createCheckOutPage(checkoutCart) {
//       let url
//       let total = 0
//     //   checkoutCart.forEach(item => {
//     //       total += (item.price * Number(item.quantity)*100)
//     //   })
//       let formattedCart = checkoutCart.map(item => {
//             return {
//                 name: item.name,
//                 quantity: item.quantity,
//                 basePriceMoney: {
//                     amount: item.price * 100,
//                     currency: 'USD'
//                 }
//             }
//         })

//       // if (total < 10000) {
//       //     shipping = 700
//       // } else if (total < 30000) {
//       //     shipping = 1400
//       // }
//     //   let key = await getIdempotencyKey()
//         try {
//             let key = await generateIdempotencyKey(IDEMPOTENCY_KEY)
//             const response = await client.checkoutApi.createPaymentLink({
//                 idempotencyKey: key,
//                 order: {
//                 locationId: 'LEYW7FQW17A32', //production locationId
//             // locationId: 'LXMWQKX9V6X68', //sandbox locationId
//                 lineItems: formattedCart,
//             // discounts: [
//             //   {
//             //     uid: 'blackfridaysale2022',
//             //     name: 'Black Friday Sale',
//             //     scope: 'LINE_ITEM',
//             //     percentage: '0'
//             //   },
              
//             // ],
//                 pricingOptions: {
//                     autoApplyTaxes: true
//                 }
//         },
//         checkoutOptions: {
//             askForShippingAddress: true,
//             shippingFee: {
//             name: 'Standard Shipping (5-8 business days)',
//             charge: {
//                 amount: 0,
//                 currency: 'USD'
//             }
//             }
//         }
//         });
      
//           console.log(response.result);
//           url = response.result.paymentLink.url
//       } catch(error) {
//           console.log(error);
//       }
      
//       return url
//       }

//       async function generateIdempotencyKey(IDEMPOTENCY_KEY) {
//         let key
//         return new Promise(resolve => {
//             let salt = crypto.randomBytes(8).toString("hex")
//             crypto.scrypt(IDEMPOTENCY_KEY, salt, 32, (err, derivedKey) => {
//                 if (err) throw err;
//                 key = derivedKey.toString("base64");
//                 console.log('key', key)
//                 resolve(key)
//             })
//             })
//       }

//     let url = await createCheckOutPage(checkoutCart)
//     console.log(url)
//     // res.status(200).end() // Responding with 200 status
//     return {
//         statusCode: 200,
//         body: JSON.stringify({ message: url }),
//     };
//   }

  export const prerender = false;
