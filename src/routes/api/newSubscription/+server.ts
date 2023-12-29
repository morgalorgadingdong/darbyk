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


export const POST: RequestHandler = async ({ request, cookies }) => {
    
    let subscriptions
    try {
      const response = await client.subscriptionsApi.searchSubscriptions({
        query: {
          filter: {}
        }
      });
      subscriptions = response.result.subscriptions
      console.log('From Square', subscriptions);

      // Take last item in subscriptions array, which should be the most recent subscription
      let newSub = subscriptions[subscriptions.length - 1]

      // Take customer ID from this subscription
      let customerID = newSub.customerId
      // Find customer info using Square API
      const customerResponse = await client.customersApi.retrieveCustomer(customerID)
      console.log(customerResponse)
      // Find customer in Firebase DB using customer info from square API
      const usersRef = collection(db, "users");
      const snapshot = await getDocs(usersRef);
      const users = snapshot.docs.map(doc => doc.data());
      let user = users.find(user => user.email === customerResponse.result.customer.emailAddress)
      // Update customer document to active subscription status, add subscription ID to document, and add square customer ID to document
      await setDoc(doc(db, "users", user.uid), {
        squareId: customerID,
        subscription: {
          active: true,
          subscriptionID: newSub.id,
        }
      }, { merge: true });
      // Return 200 status code
      return new Response('',{
        status: 200
      });

      // To Do
      // 1. Initialize Account
        // Create all checkIn items for database

      
    } catch(error) {
      console.log(error);
    }

};

// export const load = async function() {
//     let subscriptions
//     try {
//       const response = await client.subscriptionsApi.searchSubscriptions({
//         query: {
//           filter: {}
//         }
//       });
//       subscriptions = response.result.subscriptions
//       console.log('From Square', subscriptions);
//       let customerID = subscriptions.customerId

      
//     } catch(error) {
//       console.log(error);
//     }
// }


// export const DELETE: RequestHandler = async ({ cookies }) => {

// }