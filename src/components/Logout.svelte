<script lang="ts">
    import { pb } from "../scripts/pocketbase";

    function logout() {
        pb.authStore.clear();
    }
</script>

<button on:click={logout}>Log out</button>
