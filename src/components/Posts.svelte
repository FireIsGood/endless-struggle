<script lang="ts">
    import Loading from "./Loading.svelte";
    import UserImage from "./UserImage.svelte";
    import { onDestroy, onMount } from "svelte";
    import { fly } from "svelte/transition";
    import { pb } from "../scripts/pocketbase";
    import type { RecordSubscription } from "pocketbase";
    import { posts, type Post } from "../scripts/stores";

    let loading = true;
    let unsubscribe: () => void = () => {};
    let scrollBottom: HTMLElement;

    onMount(async () => {
        const resultList = await pb.collection("posts").getList(1, 50, {
            sort: "created",
            expand: "author",
        });
        $posts = resultList.items as Post[];

        // Subscribe to posts
        unsubscribe = await pb
            .collection("posts")
            .subscribe("*", handleDbUpdate);

        // Scroll to see message
        scrollToBottom();
        loading = false;
    });

    // Unsubscribe on exit
    onDestroy(async () => {
        unsubscribe();
    });

    async function handleDbUpdate({ action, record }: RecordSubscription) {
        if (action === "create") {
            const author = await pb.collection("users").getOne(record.author);
            record.expand = { author };
            $posts = [...$posts, record as Post];

            // Scroll to see message
            scrollToBottom();
        }
        if (action === "delete") {
            $posts = $posts.filter((m) => m.id !== record.id);
        }
    }

    function scrollToBottom() {
        setTimeout(() => {
            scrollBottom.scrollIntoView({ behavior: "auto" });
        }, 10);
    }
</script>

<div class="message-list shadow-md" class:loading>
    <Loading {loading}>
        <slot name="spinner" slot="spinner" />
    </Loading>
    <ul>
        {#each $posts as message (message.id)}
            <li class="message" in:fly={{ x: 30, duration: 400 }}>
                <div class="message-image shadow-md">
                    <UserImage seed={message.expand?.author?.name ?? ""} />
                </div>
                <div class="message-body">
                    <div class="author">@{message.expand?.author?.name}</div>
                    <div class="content">{message.text}</div>
                </div>
            </li>
        {/each}
    </ul>
    <div bind:this={scrollBottom} id="bottom"></div>
</div>

<style>
    ul {
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
    li {
        list-style: none;
    }

    .message-list {
        margin-block: 1rem;
        padding: 1rem;
        border-radius: var(--border-radius-sm);
        height: var(--message-box-height);
        overflow-y: auto;
        overflow-x: clip;
        background-color: var(--bg-glass);
        backdrop-filter: blur(5px);
        -webkit-backdrop-filter: blur(5px);
        border: 1px solid rgba(142, 142, 142, 0.3);
    }

    .message-list.loading {
        overflow: hidden;
    }

    .message {
        display: grid;
        gap: 20px;
        grid-template-columns: auto 1fr;
        flex: 0 0 auto;
        max-height: 120px;
    }

    .author {
        color: var(--fg1);
    }

    .message-image {
        width: 72px;
        height: 72px;
        border-radius: var(--border-radius-md);
        overflow: clip;
    }
</style>
