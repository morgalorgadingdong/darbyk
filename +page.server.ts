import { Client, Environment, ApiError } from 'square';
import { doc, setDoc, getDocs, deleteDoc, collection } from "firebase/firestore";
import { db } from "$lib/firebase";
import { SQUARE_ACCESS_TOKEN } from '$env/static/private';
import type { RequestHandler } from './$types';

// Get customer ID from data.object.subscription.customer_id
// Define subscriptionID as data.object.subscription.plan_id
// Find customer from the Firebase DB "users" collection using customerID
// Update their subscription status to "active"
// Update user.subscription.subscriptionID to subscriptionID

const client = new Client({
    accessToken: SQUARE_ACCESS_TOKEN,
    environment: Environment.Production,
});


// export const POST: RequestHandler = async ({ request, cookies }) => {
    
//     let subscriptions
//     try {
//       const response = await client.subscriptionsApi.searchSubscriptions({
//         query: {
//           filter: {}
//         }
//       });
//       subscriptions = response.result.subscriptions
//       console.log('From Square', subscriptions);
      
//     } catch(error) {
//       console.log(error);
//     }

// };

export const load = async function() {
    let subscriptions
    try {
      const response = await client.subscriptionsApi.searchSubscriptions({
        query: {
          filter: {}
        }
      });
      subscriptions = response.result.subscriptions
      console.log('From Square', subscriptions);
      let customerID = subscriptions.customerId

      
    } catch(error) {
      console.log(error);
    }
}


// export const DELETE: RequestHandler = async ({ cookies }) => {

// }