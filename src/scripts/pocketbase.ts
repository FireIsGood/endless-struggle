import PocketBase, { type AuthModel } from "pocketbase";
import { writable } from "svelte/store";

export const pb = new PocketBase("https://endless-struggle.pockethost.io/");

export const currentUser = writable<AuthModel>(pb.authStore.model);

pb.authStore.onChange(() => {
    currentUser.set(pb.authStore.model);
});
