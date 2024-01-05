<script lang="ts">
    import UserImage from "./UserImage.svelte";
    import { onDestroy, onMount } from "svelte";
    import { fade } from "svelte/transition";
    import { pb } from "../scripts/pocketbase";
    import type { RecordSubscription } from "pocketbase";
    import { posts, type Post } from "../scripts/stores";

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

<div class="message-list shadow-md">
    <ul>
        {#each $posts as message (message.id)}
            <li class="message" in:fade={{ duration: 240 }}>
                <div class="message-image">
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
        background-color: var(--bg1);
        border: 2px solid var(--border-color);
        border-radius: var(--border-radius-sm);
        height: var(--message-box-height);
        overflow-y: auto;
    }

    .message {
        display: grid;
        gap: 20px;
        grid-template-columns: auto 1fr;
        flex: 0 0 auto;
        max-height: 120px;
    }

    .message-image {
        width: 72px;
        height: 72px;
    }

    .message-body {
    }

    .red .author {
        color: maroon;
    }
    .blue .author {
        color: blue;
    }
</style>
