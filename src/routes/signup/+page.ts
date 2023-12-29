import { user } from "$lib/firebase";

export const load = async () => {
    if (user) {
        return {
            status: 302,
            redirect: '/client-portal'
        }
    }
}

export const prerender = false;