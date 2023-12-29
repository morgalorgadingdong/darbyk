import { dev } from '$app/environment';
import { get } from 'svelte/store';
import { collection, getDocs } from "firebase/firestore";
import { db } from "$lib/firebase";

export const load = async () => {
    const storeItems = await getDocs(collection(db, "store"));
    const storeItemsArray = storeItems.docs.map(doc => doc.data());
    console.log(storeItemsArray)
    return {
        storeItems: storeItemsArray
    }
}
// export const load = async ({ fetch }) => {
//     const response = await fetch('https://jsonplaceholder.typicode.com/posts');
//     console.log(response)
//     const data = await response.json();
//     console.log(data)
//     return {
//         items: data
//     };
// };

// export async function load({fetch}) {
//     const response = await fetch('/.netlify/functions/readStoreItems');
//     console.log(response)
//     const storeItems = await response.json();
//     return {
//         items: storeItems
//     };
// }



// fetch('/.netlify/functions/readStoreItems')
//     .then(response => response.json())
//     .then(data => console.log(data));


// we don't need any JS on this page, though we'll load
// it in dev so that we get hot module replacement
// export const csr = false;

// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = false;