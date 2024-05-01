<script lang="ts">
    import { user, db } from "$lib/firebase";
    import Button from '../../../lib/components/Button.svelte';
    import { GoogleAuthProvider, EmailAuthProvider, getAuth, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
    import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
    import { onMount } from 'svelte';
    import { goto } from "$app/navigation";
    import { checkInsTemplate } from "$lib/data/checkIns";
    // import firebase from 'firebase/app';

    // if ($user) {
    //     console.log('user logged in, redirecting to login')
    //     goto('/virtualcoaching/client-portal')
    // }

    let firebaseui
    let ui

    let email
    let password
    let error

    // onMount(async() => {
    //     firebaseui = (await import('firebaseui')).default;
    //     if ($user) {
    //         console.log('user already logged in, redirecting to client portal')
    //         goto('/virtualcoaching/client-portal')
    //     }
    // })
        // ui = new firebaseui.auth.AuthUI(auth);
   
    
    let auth = getAuth();

    async function signInWithEmail() {
        // console.log(email)
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log("User signed in with email");
        } catch (error) {
            console.error("Error signing in with email", error);
        }
        goto('/virtualcoaching/client-portal')
    }
  
    async function signInWithGoogle() {
      console.log('signing in')
        const provider = new GoogleAuthProvider();
        // const credential = await signInWithPopup(auth, provider);
        const user = await signInWithPopup(auth, provider);
        console.log(user.user.uid)


        // Checking to see if user exists in DB yet
        const docRef = doc(db, "users", user.user.uid);
        const docSnap = await getDoc(docRef);
        console.log(docSnap.exists())

        // If user doesn't exist, create a new document in collection for user
        if (!docSnap.exists()) {
            console.log('user does not exist, creating new document')
            try {
                // Get a reference to the Firestore database
                const db = getFirestore();

                // Create a new document in the 'users' collection with the user's ID
                await setDoc(doc(db, "users", user.user.uid), {
                    email: user.user.email,
                    nameFirst: '',
                    nameLast: '',
                    uid: user.user.uid,
                    picture: null,
                    subscription: {
                        active: false,
                        subscriptionID: '',
                    },
                    checkIns: checkInsTemplate
                }
                );
            } catch (err) {
                error = err.message;
            }
        }
        

        goto('/virtualcoaching/client-portal')
    //   const idToken = await credential.user.getIdToken();
  
    //   const res = await fetch("/api/signin", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       // 'CSRF-Token': csrfToken  // HANDLED by sveltekit automatically
    //     },
    //     body: JSON.stringify({ idToken }),
    //   });
    }
  
    async function signOutSSR() {
      const res = await fetch("/api/signin", { method: "DELETE" });
      await signOut(auth);
    }

  </script>
  
  
  
  
  
  <h1 class="col-12 text-center">Virtual Client Portal</h1>
  <h2>Login</h2>
  
  {#if $user}
    <h2 class="card-title">Welcome, {$user.name}</h2>
    <p class="text-center text-success">You are logged in</p>
    <button class="btn btn-warning" on:click={signOutSSR}>Sign out</button>
  {:else}
  <div class="d-flex flex-column align-items-center">
        <input class="" bind:value={email} type="email" placeholder="Email" />
        <input bind:value={password} type="password" placeholder="Password" />
        <div   on:click={signInWithEmail}><Button type = {'primary'} url={''}>Sign in</Button></div>
        <!-- <button on:click={signInWithEmail}>Sign in</button> -->
        {#if error}
            <p>{error}</p>
        {/if}
    </div>
    <div class="btn-container"><button class="google button body-text" on:click={signInWithGoogle}>Sign in with Google</button></div>
      <!-- <div   on:click={signInWithGoogle}><Button type = {'primary'} url={''}>Sign in with Google</Button></div></div> -->
    {/if}
    <p>Not yet signed up?</p>
    <a href="/signup">Sign up</a>

<style>
    .google{
        background-color: #4285F4;
        color: white;
        border: none;
        border-radius: 5px;
        padding: 5px;
        margin: 10px;
    }

    input {
        margin: 10px;
        padding: 5px;
        border-radius: 5px;
        border: 1px solid var(--color-dark);
    }
    .btn-container {
        display: flex;
        justify-content: center;
        margin: 10px;
    }
</style>