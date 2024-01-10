<script lang="ts">
    import { onMount } from "svelte";
    import { fly } from "svelte/transition";
    import { currentUser } from "@scripts/pocketbase";
    import Login from "@/components/Login.svelte";
    import Logout from "@/components/Logout.svelte";
    import Posts from "@/components/Posts.svelte";
    import Send from "@/components/Send.svelte";
    import UserImage from "@/components/UserImage.svelte";
    import Loading from "@/components/Loading.svelte";

    let loading = true;

    onMount(() => {
        loading = false;
    });
</script>

<header>
    <div class="header-content">
        <h1>Endless Struggle</h1>
        {#if $currentUser && !loading}
            <div
                class="user-card shadow-sm"
                transition:fly={{ y: -10, duration: 400 }}
            >
                <Logout />
                <div class="username">{$currentUser.username}</div>
                <div class="user-image shadow-sm">
                    <UserImage seed={$currentUser.username} />
                </div>
            </div>
        {/if}
    </div>
</header>

<main>
    <Loading {loading} />
    {#if $currentUser}
        <div class="message-container">
            <Posts />
        </div>
        <p>Send a post</p>
        <Send />
    {:else}
        <Login />
    {/if}
</main>

<footer>
    <div class="footer-content">
        <p>Created by FireIsGood</p>
    </div>
</footer>

<style>
    header,
    footer {
        background-color: var(--secondary0);
        z-index: 2;
    }
    header {
        min-height: 75px;
    }
    footer {
        min-height: 45px;
    }

    .footer-content,
    .header-content {
        margin-inline: auto;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        align-items: center;
        gap: 10px;
        max-width: 960px;
        min-height: 75px;
        padding: 5px;
    }

    .user-card {
        display: flex;
        align-items: center;
        gap: 10px;
        background-color: var(--secondary2);
        padding: 5px;
        border-radius: var(--border-radius-md);
    }

    @media (width > 960px) {
        .footer-content,
        .header-content {
            justify-content: space-between;
        }
    }

    main {
        flex-grow: 1;
        width: min(960px, 100%);
        padding: 1rem;
        align-self: center;
    }

    .message-container {
        position: relative;
    }

    .username {
        font-weight: bold;
    }
    .user-image {
        width: 54px;
        height: 54px;
        border-radius: var(--border-radius-sm);
        overflow: clip;
    }
</style>
