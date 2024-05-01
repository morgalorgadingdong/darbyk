<script>
  import AuthCheck from '$lib/components/AuthCheck.svelte';
  import { userData } from '$lib/firebase';
  import { doc, updateDoc } from "firebase/firestore";
  import { user, db } from "$lib/firebase";
  import Button from '$lib/components/Button.svelte';
  import { goto } from "$app/navigation";
  import { GoogleAuthProvider, EmailAuthProvider, getAuth, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";

  if (!$user) {
      console.log('user not logged in, redirecting to login page')
      goto('/client-portal/login')
  }

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


<section id="virtualcoaching" class="col-12">
  <h1 class="col-12 text-center">Virtual Client Portal</h1>
{#if !$user}
  <p>Coming soon...</p>
{/if}
  
  <AuthCheck>
    
    {#if userNameFirst}
      <h2 class="card-title">Welcome, {userNameFirst}</h2>
      <p class="text-center text-success">Coming soon...</p>
    {/if}

  
  </AuthCheck>

</section>

<style>
  #vc-header .special {
    text-transform: uppercase;
  }

  .content-area {
    border-radius: 0 25px 25px 25px;
    background-color: rgba(190,204,205, 0.5);
  }
  
  
  .error-message {
    color: red;
  }



  input {
    margin: 10px;
  }
</style>