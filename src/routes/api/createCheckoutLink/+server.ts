import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { Client, Environment, ApiError } from 'square';
import { goto } from '$app/navigation';
import { SQUARE_ACCESS_TOKEN, IDEMPOTENCY_KEY } from '$env/static/private';
import crypto from 'crypto';
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';


const client = new Client({
    accessToken: SQUARE_ACCESS_TOKEN,
    environment: Environment.Production,
});

export const POST: RequestHandler = async ({ request, cookies }) => {
    const requestBody = await request.text();
    const parsedBody = JSON.parse(requestBody);
    // Access the data from the request body
    const { items } = parsedBody;

    console.log('Checkout Cart', items)

    async function createCheckOutPage(cart) {
        let url

          try {
              let key = await generateIdempotencyKey(IDEMPOTENCY_KEY)
              const response = await client.checkoutApi.createPaymentLink({
                  idempotencyKey: key,
                  order: {
                  locationId: 'LEYW7FQW17A32', //production locationId
              // locationId: 'LXMWQKX9V6X68', //sandbox locationId
                  lineItems: cart,
              // discounts: [
              //   {
              //     uid: 'blackfridaysale2022',
              //     name: 'Black Friday Sale',
              //     scope: 'LINE_ITEM',
              //     percentage: '0'
              //   },
                
              // ],
                  pricingOptions: {
                      autoApplyTaxes: true
                  }
          },
          checkoutOptions: {
              askForShippingAddress: true,
              shippingFee: {
              name: 'Standard Shipping (5-8 business days)',
              charge: {
                  amount: 0,
                  currency: 'USD'
              }
              }
          }
          });
        
            console.log(response.result);
            url = response.result.paymentLink.url
        } catch(error) {
            console.log(error);
        }
        
        return url
        }
  
        async function generateIdempotencyKey(IDEMPOTENCY_KEY) {
          let key
          return new Promise(resolve => {
              let salt = crypto.randomBytes(8).toString("hex")
              crypto.scrypt(IDEMPOTENCY_KEY, salt, 32, (err, derivedKey) => {
                  if (err) throw err;
                  key = derivedKey.toString("base64");
                  console.log('key', key)
                  resolve(key)
              })
              })
        }
  
      let url = await createCheckOutPage(items)
      console.log(url)

      const response = json({ url });

        return new Response(response.body, {
            status: response.status,
            headers: {
                'Content-Type': 'application/json',
            },
        });


}