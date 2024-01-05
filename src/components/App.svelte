<script lang="ts">
    import { currentUser } from "../scripts/pocketbase";
    import Login from "./Login.svelte";
    import Logout from "./Logout.svelte";
    import Posts from "./Posts.svelte";
    import Send from "./Send.svelte";
    import UserImage from "./UserImage.svelte";
</script>

<header>
    <h1>Endless Struggle</h1>
    {#if $currentUser}
        <Logout />
        <p>Hello, <span class="username">{$currentUser.username}</span></p>
        <UserImage seed={$currentUser.username} />
    {:else}
        <Login />
    {/if}
</header>

<main>
    <h1>Epic app</h1>
    {#if $currentUser}
        <div class="message-container">
            <Posts />
        </div>
        <p>Send a post</p>
        <Send />
    {:else}
        <p>Sign in to continue</p>
    {/if}
</main>
<footer>
    <p>Epic footer</p>
</footer>

<style>
    footer,
    header {
        display: flex;
        align-items: center;
        gap: 10px;
        background-color: var(--secondary0);
        padding: 10px;
    }
    header h1 {
        margin-right: auto;
    }

    main {
        flex-grow: 1;
        width: min(960px, 100%);
        padding: 1rem;
        align-self: center;
    }

    main h1 {
        text-align: center;
    }

    .username {
        font-weight: bold;
    }
</style>
