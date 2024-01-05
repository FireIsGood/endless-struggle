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
    <div class="form-item">
        <label for="username">Username</label>
        <input
            bind:value={username}
            id="username"
            type="text"
            placeholder="username"
            required
        />
    </div>
    <div class="form-item">
        <label for="password">Password</label>
        <input
            bind:value={password}
            id="password"
            type="password"
            placeholder="password"
            required
        />
    </div>
    <input on:click={login} type="submit" value="Log in" />
    <input on:click={signUp} type="submit" value="Sign up" />
</form>

<style>
    .form-item {
        line-height: 1.2;
    }
</style>
