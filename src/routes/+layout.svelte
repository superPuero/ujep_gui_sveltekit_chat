<script lang="ts">
    import favicon from '$lib/assets/favicon.svg';
    let { children } = $props();
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
    <title>SvelteChat</title>
</svelte:head>

<div class="shell">
    <nav>
        <a href="/" class="logo">Svelte<b>Chat</b></a>
        <a href="/" class="exit">Leave Room</a>
    </nav>

    <main>
        {@render children()}
    </main>

    <footer>SvelteKit Chat &bull; 2026</footer>
</div>

<style>
    :global(body) { margin: 0; background: #f4f7f6; font-family: sans-serif; }

    .shell {
        display: flex; flex-direction: column; min-height: 100vh;

        nav {
            display: flex; justify-content: space-between; align-items: center;
            padding: 1rem 2rem; background: #fff; border-bottom: 1px solid #eee;

            .logo { text-decoration: none; color: #000; font-size: 1.2rem; b { color: #2563eb; } }
            .exit { text-decoration: none; font-size: 0.8rem; color: #666; font-weight: 600; }
        }

        main { flex: 1; display: grid; place-items: center; padding: 2rem; }

        footer { text-align: center; padding: 1rem; color: #999; font-size: 0.8rem; }
    }
</style>