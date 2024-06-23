// const SQUARE_ACCESS_TOKEN = process.env.SQUARE_ACCESS_TOKEN;
import { Client, Environment, ApiError } from 'square';
import { doc, setDoc, getDocs, deleteDoc, collection } from "firebase/firestore";
import { db } from "$lib/firebase";
import { SQUARE_ACCESS_TOKEN } from '$env/static/private';
import { error } from '@sveltejs/kit';

const client = new Client({
    accessToken: SQUARE_ACCESS_TOKEN,
    environment: Environment.Production,
});



function StoreItem(name, id, description, descriptionHTML, price, imgIds, imgURL, variations) {
    // if (name) {this.name = name;}
    // if (id) {this.id = id;}
    // if (description) {this.description = description;}
    // if (descriptionHTML) {this.descriptionHTML = descriptionHTML;}
    // if (price) {this.price = price;}
    // if (imgIds) {this.imgIds = imgIds;}
    // if (imgURL) {this.imgURL = imgURL;}
    // if (variations) {this.variations = variations;}
    this.name = name;
    this.id = id;
    this.description = description;
    this.descriptionHTML = descriptionHTML;
    this.price = price;
    this.imgIds = imgIds, 
    this.imgURL = imgURL;
    this.variations = variations;
  }

  let cart = []


// Retrieve all store items
// Loop through each store item, retreiving imgURLs, creating a new StoreItem object for each, and then pushing that item to the store items array
// Push each store item to the DB


// export const POST: RequestHandler = async ({ request, cookies }) => {

// }

// export async function POST({ request }) {
//     console.log(await request.json());

//     let storeItems;
//     let squareItemIds = [];

//     try {
//         const response = await client.catalogApi.searchCatalogItems({
//             customAttributeFilters: [
//                 {
//                     customAttributeDefinitionId: 'LY6JV4CT6PXH73EFUVI4MN73',
//                     boolFilter: true
//                 }
//             ]
//         });

//         storeItems = response.result.items;
//         console.log(storeItems);

//         // Process items asynchronously
//         setImmediate(() => {
//             processStoreItems(storeItems, squareItemIds)
//                 .then(() => console.log('Processing completed'))
//                 .catch(error => console.log('Error during processing:', error));
//         });

//         // Respond immediately
//         return new Response(JSON.stringify({ status: 200, message: "Processing started" }), { status: 200 });

//     } catch (error) {
//         console.log(error);
//         return new Response(JSON.stringify({ error: "Internal server error", details: error.message }), { status: 500 });
//     }
// }

export async function GET({ request }) {
    console.log(await request.body);

    let storeItems;
    let squareItemIds = [];

    try {
        const response = await client.catalogApi.searchCatalogItems({
            customAttributeFilters: [
                {
                    customAttributeDefinitionId: 'LY6JV4CT6PXH73EFUVI4MN73',
                    boolFilter: true
                }
            ]
        });

        storeItems = response.result.items;
        storeItems.forEach(item => {
            squareItemIds.push(item.id)
        })
        console.log(storeItems);

        // Process items asynchronously
        setImmediate(() => {
            processStoreItems(storeItems, squareItemIds)
                .then(() => console.log('Processing completed'))
                .catch(error => console.log('Error during processing:', error));
        });

        // Respond immediately
        return new Response(JSON.stringify({ status: 200, message: "Processing started" }), { status: 200 });

    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ error: "Internal server error", details: error.message }), { status: 500 });
    }
}

async function processStoreItems(storeItems, squareItemIds) {
    let price, variations;

    for (let item of storeItems) {
        variations = [];
        let priceS = String(item.itemData.variations[0].itemVariationData.priceMoney.amount);
        price = Number(priceS) / 100;

        item.itemData.variations.forEach(variation => {
            variations.push(variation.itemVariationData.name);
        });

        console.log('Retrieved store item', item.itemData.name);

        let currentItem = new StoreItem(
            item.itemData.name,
            item.id,
            item.itemData.description || '',
            item.itemData.descriptionHtml || '',
            price,
            item.itemData.imageIds || [],
            variations
        );

        squareItemIds.push(item.id);

        try {
            await retrieveStoreItemImgs(currentItem);
            await setStoreItemToDB(currentItem);
        } catch (error) {
            console.log(error);
        }
    }

    try {
        await deleteNonExistentItems(squareItemIds);
    } catch (error) {
        console.log(error);
    }

    console.log('Online store updated');
}

async function retrieveStoreItemImgs(currentItem) {
    let ids = currentItem.imgIds;
    let imgURL = [];

    if (ids.length === 1) {
        const response = await client.catalogApi.retrieveCatalogObject(ids[0]);
        imgURL.push(response.result.object.imageData.url);
    } else if (ids.length > 1) {
        for (let id of ids) {
            const response = await client.catalogApi.retrieveCatalogObject(id);
            imgURL.push(response.result.object.imageData.url);
        }
    }

    currentItem.imgURL = imgURL;
    return currentItem;
}

async function setStoreItemToDB(currentItem) {
    const docRef = doc(db, "store", currentItem.id);
    console.log('variations', currentItem.name, currentItem.variations)
    if (currentItem.variations) {
        await setDoc(docRef, {
            name: currentItem.name,
            id: currentItem.id,
            description: currentItem.description,
            descriptionHTML: currentItem.descriptionHTML,
            price: currentItem.price,
            imgIds: currentItem.imgIds,
            imgURL: currentItem.imgURL,
            variations: currentItem.variations
        });    
    } else {
        await setDoc(docRef, {
            name: currentItem.name,
            id: currentItem.id,
            description: currentItem.description,
            descriptionHTML: currentItem.descriptionHTML,
            price: currentItem.price,
            imgIds: currentItem.imgIds,
            imgURL: currentItem.imgURL
        });
    }
}

async function deleteNonExistentItems(squareItemIds) {
    // Get all documents from the store collection
    const querySnapshot = await getDocs(collection(db, 'store'));
    
    console.log('Deleting store items');
    console.log('Square Item IDs:', squareItemIds);
    
    // Loop through each document
    querySnapshot.forEach(async (doc) => {
        const docId = doc.data().id;
        console.log('Checking document ID:', docId);
        
        // If the document's id is not found in the squareItemIds array, delete the document
        if (!squareItemIds.includes(docId)) {
            console.log(`Deleting ${docId}`);
            await deleteDoc(doc.ref);
        }
    });
}

