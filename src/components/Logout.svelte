<script lang="ts">
    import { pb } from "@scripts/pocketbase";

    function logout() {
        pb.authStore.clear();
    }
</script>

<button on:click={logout} class="button-muted">Log out</button>

<style>
    button {
        padding: 2px 10px;
    }
</style>
