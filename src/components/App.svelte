<script lang="ts">
    import { onMount } from "svelte";
    import { currentUser } from "../scripts/pocketbase";
    import Login from "./Login.svelte";
    import Logout from "./Logout.svelte";
    import Posts from "./Posts.svelte";
    import Send from "./Send.svelte";
    import UserImage from "./UserImage.svelte";
    import Loading from "./Loading.svelte";

    let loading = true;

    onMount(() => {
        loading = false;
    });
</script>

<header>
    <div class="header-content">
        <h1>Endless Struggle</h1>
        {#if $currentUser}
            <div class="user-card">
                <Logout />
                <p>
                    Hello, <span class="username">{$currentUser.username}</span>
                </p>
                <div class="user-image shadow-sm">
                    <UserImage seed={$currentUser.username} />
                </div>
            </div>
        {/if}
    </div>
</header>

<main>
    <Loading {loading}>
        <slot name="spinner" slot="spinner" />
    </Loading>
    {#if $currentUser}
        <div class="message-container">
            <Posts>
                <slot name="spinner" slot="spinner" />
            </Posts>
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
        max-width: 960px;
        margin-inline: auto;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        align-items: center;
        gap: 10px;
        padding: 10px;
    }

    .user-card {
        display: flex;
        align-items: center;
        gap: 10px;
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
