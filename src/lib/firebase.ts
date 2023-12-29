// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { doc, getFirestore, onSnapshot, collection, getDocs } from "firebase/firestore";
import { getAuth, onAuthStateChanged, type User } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { writable, type Readable, derived } from "svelte/store";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries



// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBnU05QGQThVsgYiyTeG8BQpiWOmZ4M0hA",
  authDomain: "darbyk-98f11.firebaseapp.com",
  projectId: "darbyk-98f11",
  storageBucket: "darbyk-98f11.appspot.com",
  messagingSenderId: "1093226440176",
  appId: "1:1093226440176:web:c6a0220e73b9e32b396935",
  measurementId: "G-8K6QY86GGK"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();
export const storage = getStorage();
// const analytics = getAnalytics(app);

// const currentUser = writable<User | null>(null);

// onAuthStateChanged(auth, (user) => {
//   currentUser.set(user);
// });



/**
 * @returns a store with the current firebase user
 */
function userStore() {
  let unsubscribe: () => void;

  if (!auth || !globalThis.window) {
    console.warn('Auth is not initialized or not in browser');
    const { subscribe } = writable<User | null>(null);
    return {
      subscribe,
    }
  }

  const { subscribe } = writable(auth?.currentUser ?? null, (set) => {
    unsubscribe = onAuthStateChanged(auth, (user) => {
      set(user);
    });

    return () => unsubscribe();
  });

  return {
    subscribe,
  };
}

export const user = userStore();


export async function getCheckInsForUser(uid) {
    const checkInsRef = collection(db, "checkIns");
    const snapshot = await getDocs(checkInsRef);
    const checkIns = snapshot.docs.map(doc => doc.data());
  
    return checkIns.filter(checkIn => checkIn.uid === uid);
  }


/**
 * @param  {string} path document path or reference
 * @param  {any} startWith optional default data
 * @returns a store with realtime updates on document data
 */
export function docStore<T>(
  path: string,
) {
  let unsubscribe: () => void;

  const docRef = doc(db, path);

  const { subscribe } = writable<T | null>(null, (set) => {
    unsubscribe = onSnapshot(docRef, (snapshot) => {
      set((snapshot.data() as T) ?? null);
    });

    return () => unsubscribe();
  });

  return {
    subscribe,
    ref: docRef,
    id: docRef.id,
  };
}

interface UserData {
  nameFirst: string;
  nameLast: string;
  email: string;
  photoURL: string;
  subscribed: boolean;
  subscriptionID: string;
  uid: string;
}

export const userData: Readable<UserData | null> = derived(user, ($user, set) => { 
  if ($user) {
    return docStore<UserData>(`users/${$user.uid}`).subscribe(set);
  } else {
    set(null); 
  }
});    