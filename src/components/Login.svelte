<script lang="ts">
    import { pb } from "@scripts/pocketbase";

    let username: string;
    let password: string;

    async function login() {
        if (username === undefined || password === undefined) return;

        try {
            await pb.collection("users").authWithPassword(username, password);
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
            await pb.collection("users").create(data);
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

<div class="log-in-wrapper">
    <div class="log-in-container">
        <h2 class="pad">Log in to continue</h2>
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
            <input
                on:click={signUp}
                type="submit"
                value="Sign up"
                class="button-secondary"
            />
        </form>
    </div>
</div>

<style>
    .log-in-wrapper {
        display: grid;
        justify-items: center;
    }

    .log-in-container {
        width: min(100%, 500px);
    }

    .form-item {
        line-height: 1.2;
    }
</style>
