<script lang="ts">
    import { auth, db } from "$lib/firebase";
    import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
    import { getFirestore, doc, setDoc } from "firebase/firestore";
    import { onMount } from 'svelte';
    import Button from '../../lib/components/Button.svelte';
    import { user } from "$lib/firebase";
    import { goto } from "$app/navigation";


    if (user) {
        console.log('user already logged in, redirecting to client portal')
        goto('/client-portal')
    }

    let email = '';
    let password = '';
    let error = '';
    let nameFirst = '';
    let nameLast = '';
    let emailError = '';
    let passwordError = '';
    let nameError = '';


    async function signUp() {
        emailError = '';
        passwordError = '';
        nameError = '';
        if (!nameFirst || !nameLast) {
            nameError = 'Your name is required';
        }
        if (!email) {
            emailError = 'Email is required';
        }
        if (!password) {
            passwordError = 'Password is required';
        }
        if (nameError || emailError || passwordError) {
            return;
        }
        
        const auth = getAuth();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log("User signed up with email");

            // Get a reference to the Firestore database
            const db = getFirestore();

            // Create a new document in the 'users' collection with the user's ID
            await setDoc(doc(db, "users", userCredential.user.uid), {
                email: email,
                nameFirst: nameFirst,
                nameLast: nameLast,
                uid: userCredential.user.uid,
                subscription: {
                    active: false,
                    subscriptionID: '',
                },
                picture: null
            });

        } catch (err) {
            error = err.message;
        }

        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log("User signed in with email");
        } catch (error) {
            console.error("Error signing in with email", error);
        }
    }
</script>


<h2>Sign Up</h2>

<div>
    <input bind:value={nameFirst} type="text" placeholder="First Name" required/>
    <input bind:value={nameLast} type="text" placeholder="Last Name" required/>
    {#if nameError}
      <p class="error-message">{nameError}</p>
    {/if}
    <input bind:value={email} type="email" placeholder="Email" required/>
    {#if emailError}
      <p class="error-message" >{emailError}</p>
    {/if}
    <input bind:value={password} type="password" placeholder="Password" required/>
    {#if passwordError}
      <p class="error-message" >{passwordError}</p>
    {/if}
    <button on:click={signUp}>Sign Up</button>
    {#if error}
      <p>{error}</p>
    {/if}

    <p>Already a member?</p>
    <Button type = {'primary'} url={'/login'}>Login</Button>
</div>

<style>
    .error-message {
        color: red;
    }
</style>