import type { RecordModel } from "pocketbase";
import { writable } from "svelte/store";

export interface Post extends RecordModel {
    author: string;
    text: string;
    expand?: {
        author?: User;
    };
}
export interface User extends RecordModel {
    name: string;
    avatar: string;
    role: string;
}

export const posts = writable<Post[]>([]);
