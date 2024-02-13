<script>
    import AuthCheck from '$lib/components/AuthCheck.svelte';
    import { userData } from '$lib/firebase';
    import { doc, updateDoc } from "firebase/firestore";
    import { user, db } from "$lib/firebase";
    import Button from '$lib/components/Button.svelte';
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
  
  
  <section id="virtualcoaching" class="col-12">
    <h1 class="col-12 text-center">Virtual Client Portal</h1>
  {#if !$user}
    <p>Coming soon</p>
  {/if}
    
    <AuthCheck>
      
      {#if userNameFirst}
      <div id="vc-header" class="d-flex justify-content-center align-items-center flex-wrap mt-5 mb-3">
        <h2 class="text-center col-12"> Hello, {userNameFirst}! </h2>
        <p class="text-center special">Next Check In: XX/XX/XXXX</p>
      </div>
  
      <div class="col-12 d-flex justify-content-between flex-wrap">
        <div class="col-lg-9 col-12 mt-3">
          <h2>Latest Feedback</h2>
          <div class="d-flex justify-content-start align-items-start flex-wrap col-12 content-area py-3">
              <div class="col-12 col-lg-6 d-flex justify-content-start align-items-center flex-wrap">
                <h5>Feedback</h5>
                <pre>1. Ultra Gentle Cleanser 
  2. Ice for 2 minutes 
  3. Calming Facial Toner 
  5. Hydrabalance (let dry completely) 
  6. Mandelic serum 5% (1 pump, EVERY MORNING, let dry completely) 
  7. Hydrabalance (a hydrabalance Sandwhich!) 
  8. Clearderma 
  9. SPF (reapply every 2 hours)</pre>
                </div>
                <div class="col-12 col-lg-6 d-flex justify-content-start align-items-center flex-wrap">
  
                <h5>Comments</h5>
                <p>Thanks Morgan!! Keep it up! Once we get thru the purge it’s smooth sailing!</p>
                </div>
          </div>
          </div>
        <div class="col-lg-3 col-12 mt-3">
          <h2>Account</h2>
          <div class="d-flex justify-content-start align-items-center flex-wrap col-12 content-area py-3">
            <ul class="col-12 d-flex align-items-between flex-wrap">
              <li class="col-12">Resources</li>
              <li class="col-12">Subscription</li>
              <li class="col-12">Change Password</li>
              <li class="col-12">Contact</li>
              <li class="col-12" on:click={signOutSSR}>Sign Out</li>
            </ul>
          </div>
          </div>
          <div class="col-12 d-flex justify-content-start align-items-center flex-wrap">
            <h5>Upcoming Check Ins</h5>
            <div class="d-flex justify-content-start align-items-start flex-wrap col-12 content-area py-3">

            </div>
        </div>
        <div class="col-12 d-flex justify-content-start align-items-center flex-wrap">
            <h5>Past Check Ins</h5>
            <div class="d-flex justify-content-start align-items-start flex-wrap col-12 content-area py-3">

            </div>
        </div>
      </div>
      <!-- <div class="col">
        <button class="btn btn-warning" on:click={signOutSSR}>Sign out</button>
      </div> -->
      {:else}
  
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
  
  <style>
    #vc-header .special {
      text-transform: uppercase;
    }

    ul {
        height: 100%;
    }

    li {
        font-family: var(--font-body);
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