import { doc, getDocs, query, collection, where } from "firebase/firestore";
import type { PageLoad } from "./$types";
import { db } from "$lib/firebase";
import { error } from "@sveltejs/kit";

export const load = (async ({ params }) => {
    console.log('page reload', params)
    
    // const collectionRef = collection(db, "store");
    // const q = query(
    //     collectionRef,
    //     where("store", "==", params.storeItem),
    //     limit(1)
    //   );

    // const snapshot = await getDocs(q);
    // const exists = snapshot.docs[0]?.exists();
    // const data = snapshot.docs[0]?.data();


    // const docRef = doc(db, "store", params.storeItem);
    // const docSnap = await getDoc(docRef);
    // let data
    // if (docSnap.exists()) {
    //     data = docSnap.data();
    // } else {
    //     throw error(404, "that item does not exist!");
    // }
    // console.log('data', data)
    
    let data
    const storeCollection = collection(db, "store");
    
    // Create a query to find the document where the 'id' field matches the provided storeItemId
    const q = query(storeCollection, where("id", "==", params.storeItem));
    
    // Execute the query
    const querySnapshot = await getDocs(q);
    
    // Check if a document was found
    if (!querySnapshot.empty) {
        // Assuming there's only one matching document
        const doc = querySnapshot.docs[0];
        data = doc.data();
        console.log("Document data:", doc.data());
    } else {
        console.error("No matching document found");
        throw error(404, "that item does not exist!");
    }

    return {
        
        name: data.name,
        description: data.description,
        descriptionHTML: data.descriptionHTML,
        price: data.price,
        variations: data.variations,
        imgURL: data.imgURL

    }
}) satisfies PageLoad;

export const prerender = false;