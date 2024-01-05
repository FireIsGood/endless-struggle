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
        const record = await pb.collection("posts").create(data);
    }
</script>

<form on:submit|preventDefault={sendMessage}>
    <input bind:value={post} type="text" placeholder="post..." required />
    <input type="submit" />
</form>

<style>
    form {
        grid-template-columns: 1fr auto;
    }
</style>
