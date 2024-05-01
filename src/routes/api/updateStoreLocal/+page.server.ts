// const SQUARE_ACCESS_TOKEN = process.env.SQUARE_ACCESS_TOKEN;
import { Client, Environment, ApiError } from 'square';
import { doc, setDoc, getDocs, deleteDoc, collection } from "firebase/firestore";
import { db } from "$lib/firebase";
import { SQUARE_ACCESS_TOKEN } from '$env/static/private';

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

export const load = async function() {    
    let storeItems: any;
    let priceS: string;
    let price: number;
    let variations: any[] = [];
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
        console.log(storeItems)
        //Note for future self, this code assumes all variations of item are priced the same
        for (let i = 0; i < storeItems.length; i++) {
            variations = []
            priceS = storeItems[i].itemData.variations[0].itemVariationData.priceMoney.amount
            priceS = String(priceS)
            // priceS = priceS.slice(0, priceS.length - 1)
            price = Number(priceS)
            price = price/100
            storeItems[i].itemData.variations.forEach(variation => {
                // console.log(variation)
                variations.push(variation.itemVariationData.name)
            })
            // console.log(variations)
            console.log('Retrieved store item', storeItems[i].itemData.name);
            let currentItem = new StoreItem(
                '',
                '',
                '',
                '',
                0,
                [''],
                [''],
                []
            )
            currentItem.name = storeItems[i].itemData.name
            currentItem.id = storeItems[i].id
            if (storeItems[i].itemData.description) {currentItem.description = storeItems[i].itemData.description}
            if (storeItems[i].itemData.descriptionHtml) {currentItem.descriptionHTML = storeItems[i].itemData.descriptionHtml}
            currentItem.price = price
            if (storeItems[i].itemData.imageIds) {currentItem.imgIds = storeItems[i].itemData.imageIds}
            if (variations) {currentItem.variations = variations}

            
            
            // StoreItem(
            //     storeItems[i].itemData.name, 
            //     storeItems[i].id, 
            //     storeItems[i].itemData.description, 
            //     storeItems[i].itemData.descriptionHtml, 
            //     price, 
            //     storeItems[i].itemData.imageIds,
            //     [''],
            //     variations
            // )

            squareItemIds.push(storeItems[i].id);

            try {
                
                await retrieveStoreItemImgs(currentItem)
                await setStoreItemToDB(currentItem)
                await deleteNonExistentItems(squareItemIds);
            } catch (error) {
                console.log(error)
            }
    
            
        
        }
            
        // console.log(storeItems)
        
        async function retrieveStoreItemImgs(currentItem) {    
            return new Promise(async (resolve, reject) => {
                let ids = currentItem.imgIds;
                let imgURL = [];
                try {
                  if (ids.length === 1) {
                    console.log('Single image ID found', currentItem.name);
                    ids = String(ids);
                    console.log(`attempting to retrieve image with id: ${ids}`);
                    const response = await client.catalogApi.retrieveCatalogObject(ids);
                    imgURL.push(response.result.object.imageData.url);
                    currentItem.imgURL = imgURL;
                    console.log('Appended all img URLs');
                  } else if (ids.length > 1) {
                    console.log('Multiple image IDs found');
                    for (let id of ids) {
                      id = String(id);
                      console.log(`attempting to retrieve image with id: ${id}`);
                      const response = await client.catalogApi.retrieveCatalogObject(id);
                      console.log('Retrieved image');
                      imgURL.push(response.result.object.imageData.url);
                      currentItem.imgURL = imgURL;
                    }
                    console.log('Appended all img URLs');
                  }
                  resolve(currentItem); // Resolve the promise with the currentItem
                } catch (error) {
                  console.log(error);
                  reject(error);
                }
              });
            
        }

        async function setStoreItemToDB(currentItem) {
            // console.log(currentItem)
            const docRef = doc(db, "store", currentItem.name);
            const docData = currentItem

            // let price = item.itemData.variations[0].itemVariationData.priceMoney.amount
            
            // console.log( 'price: ' + price)
            console.log(currentItem)
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
            // await setDoc(docRef, {
            //     name: currentItem.name,
            //     id: currentItem.id,
            //     description: currentItem.description,
            //     descriptionHTML: currentItem.descriptionHTML,
            //     price: currentItem.price,
            //     imgIds: currentItem.imgIds, 
            //     imgURL: currentItem.imgURL,
            //     variations: currentItem.variations
            // });
        }

        async function deleteNonExistentItems(squareItemIds) {
            // Get all documents from the store collection
            const querySnapshot = await getDocs(collection(db, 'store'));
        
            // Loop through each document
            querySnapshot.forEach(async (doc) => {
                // If the document's id is not found in the squareItemIds array, delete the document
                if (!squareItemIds.includes(doc.data().id)) {
                    await deleteDoc(doc.ref);
                }
            });
        }

        } catch(error) {
            console.log(error);
            return {
                statusCode: 500,
                body: JSON.stringify({ error: "Internal server error" }),
            };
        }
        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Online store updated" }),
        };
    }
