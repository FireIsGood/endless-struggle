import PocketBase from "pocketbase";
import { writable } from "svelte/store";

export const pb = new PocketBase("https://endless-struggle.pockethost.io/");

export const currentUser = writable(pb.authStore.model);

pb.authStore.onChange((auth) => {
    // console.log("Auth store changed", auth);
    currentUser.set(pb.authStore.model);
});
