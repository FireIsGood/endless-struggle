<script lang="ts">
    import { currentUser } from "../scripts/pocketbase";
    import Login from "./Login.svelte";
    import Logout from "./Logout.svelte";
    import Posts from "./Posts.svelte";
    import Send from "./Send.svelte";
    import UserImage from "./UserImage.svelte";
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
    {#if $currentUser}
        <div class="message-container">
            <Posts />
        </div>
        <p>Send a post</p>
        <Send />
    {:else}
        <div class="sign-in-wrapper">
            <div class="sign-in-container">
                <h2 class="pad">Sign in to continue</h2>
                <Login />
            </div>
        </div>
    {/if}
</main>
<footer>
    <div class="footer-content">
        <p>Created by FireIsGood</p>
    </div>
</footer>

<style>
    header {
        background-color: var(--secondary0);
        min-height: 75px;
    }
    footer {
        background-color: var(--secondary0);
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

    .sign-in-wrapper {
        display: grid;
        justify-items: center;
    }
    .sign-in-container {
        width: min(100%, 500px);
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
