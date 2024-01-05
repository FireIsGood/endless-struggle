<script lang="ts">
    import { fade } from "svelte/transition";

    export let loading: boolean;
</script>

{#if loading}
    <div class="loading-screen" class:loading out:fade>
        <div class="loading-icon">
            <slot name="spinner" />
        </div>
        <div class="loading-bg"></div>
    </div>
{/if}

<style>
    .loading-screen {
        display: none;
    }

    .loading-screen.loading {
        display: block;
        position: absolute;
        inset: 0;
        background-color: var(--bg-glass);
        backdrop-filter: blur(5px);
        -webkit-backdrop-filter: blur(5px);
        z-index: 1;
    }

    .loading-icon {
        display: block;
        position: absolute;
        width: 25vmin;
        height: 25vmin;
        left: 50%;
        top: 50%;
        translate: -50% -50%;
        z-index: 1;
        animation: loading-spin 8s linear infinite;
    }

    @keyframes loading-spin {
        from {
            rotate: 0deg;
        }
        to {
            rotate: 360deg;
        }
    }
</style>
