import { dev } from '$app/environment';
import { user } from "$lib/firebase";

// CSR = true : This page will be loaded and run on the client side only
// CSR = false : This page will be loaded and run on the server side only. Useful for pages that need to be indexed by search engines and have no dynamic data
export const csr = true;

// export async function load() {


//     if (user) {
//         console.log('test')
//         return {
//             status: 302,
//             redirect: '/client-portal'
//         }
//     }
// }


// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = false;
