<script lang="ts">
    import { pb } from "../scripts/pocketbase";

    let username: string;
    let password: string;

    async function login() {
        if (username === undefined || password === undefined) return;

        try {
            const record = await pb
                .collection("users")
                .authWithPassword(username, password);
            clearInputs();
        } catch (error) {
            console.log(error);
        }
    }

    async function signUp() {
        if (username === undefined || password === undefined) return;

        try {
            const data = {
                username,
                password,
                passwordConfirm: password,
                name: username,
                role: "user",
            };
            const record = await pb.collection("users").create(data);
            await login();
            clearInputs();
        } catch (error) {
            console.log(error);
        }
    }

    function clearInputs() {
        username = "";
        password = "";
    }
</script>

<form on:submit|preventDefault>
    <input bind:value={username} type="text" placeholder="username" required />
    <input
        bind:value={password}
        type="password"
        placeholder="password"
        required
    />
    <button on:click={login}>Sign in</button>
    <input on:click={signUp} type="submit" value="Sign up" />
</form>
