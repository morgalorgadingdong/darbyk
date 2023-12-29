<script>
  import AuthCheck from '$lib/components/AuthCheck.svelte';
  import { userData } from '$lib/firebase';
  import { doc, updateDoc } from "firebase/firestore";
  import { user, db } from "$lib/firebase";
  import { goto } from "$app/navigation";
  import { GoogleAuthProvider, EmailAuthProvider, getAuth, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";

  // if (!$user) {
  //     console.log('user not logged in, redirecting to login page')
  //     goto('/client-portal/login')
  // }

  let auth = getAuth();

  console.log(userData)

  let userNameFirst;

  let nameFirst
  let nameLast
  let nameError = '';
  let uid
  let activeSubscription

  $: if ($userData) {
    userNameFirst = $userData.nameFirst;
    uid = $userData.uid;
    activeSubscription = $userData.subscription.active;
    console.log(activeSubscription)
  }

  

  async function updateProfile () {
    nameError = '';
    if (!nameFirst || !nameLast) {
      nameError = 'Your name is required';
    }
    if (nameError) {
      return;
    }
    try {
      console.log(userData)
      await updateDoc(doc(db, "users", uid), {
        nameFirst: nameFirst,
        nameLast: nameLast,
      });
    } catch (error) {
      console.log(error)
    }
  }


  async function signOutSSR() {
      const res = await fetch("/api/signin", { method: "DELETE" });
      await signOut(auth);
    }
  
  
  </script>


<section>
  <h1>Virtual Coaching</h1>
{#if !$user}
  <p>Coming soon</p>
{/if}
  
  <AuthCheck>
    
    {#if userNameFirst}
      
      <h2> Hello, {userNameFirst}! </h2> 
      <p>Coming soon...</p>
      <button class="btn btn-warning" on:click={signOutSSR}>Sign out</button>
    {:else}
      <h1>Virtual Client Portal</h1>
      <h2> Hello, please tell us a little bit more about yourself</h2> 
      <input bind:value={nameFirst} type="text" placeholder="First Name" required/>
      <input bind:value={nameLast} type="text" placeholder="Last Name" required/>
      <button on:click={updateProfile}>Submit</button>
      {#if nameError}
        <p class="error-message">{nameError}</p>
      {/if}
    {/if}
  
  </AuthCheck>

</section>