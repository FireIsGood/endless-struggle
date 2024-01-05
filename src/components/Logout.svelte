<script lang="ts">
    import { pb } from "../scripts/pocketbase";

    function logout() {
        pb.authStore.clear();
    }
</script>

<button on:click={logout}>Log out</button>

<style>
    button {
        padding: 2px 10px;
        background-color: var(--bg1);
    }
</style>
