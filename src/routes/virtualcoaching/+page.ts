import { dev } from '$app/environment';
import { get } from 'svelte/store';
import { doc, getDoc } from "firebase/firestore";
import { db, user } from "$lib/firebase";
import { goto } from '$app/navigation';


export const csr = true

export const load = async () => {
    if (!user) {
        return {
            status: 302,
            redirect: '/client-portal/login'
        }
    } else {
        return {
            status: 200
        }
    }
}

// const curentUser  = user
// export const load = async ( currentUser ) => {
//     console.log('user', currentUser)
//     const uid = currentUser.uid; // assuming you have the user's UID in the session
//     const docRef = doc(db, "users", uid);
//     const docSnap = await getDoc(docRef);
//     let data
//     if (docSnap.exists()) {
//         data = docSnap.data();
//         return {
//             props: {
//                 data
//             }
//         };
//     } else {
//         goto('client-portal/first-time')
//     }

//     // const checkIns = await getCheckInsForUser(uid);

    
// }

export const prerender = false;