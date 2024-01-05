<script lang="ts">
    import { currentUser, pb } from "../scripts/pocketbase";

    let post = "";
    async function sendMessage() {
        if (post === "") return;

        // Clear fields
        const postContent = post;
        post = "";

        const data = {
            text: postContent,
            author: $currentUser?.id,
        };

        // Send it
        await pb.collection("posts").create(data);
    }
</script>

<form on:submit|preventDefault={sendMessage}>
    <input bind:value={post} type="text" placeholder="Post..." required />
    <input type="submit" value="Send" />
</form>

<style>
    form {
        grid-template-columns: 1fr auto;
    }
</style>
