<script>
    let { children } = $props();
</script>

<div class="app">
    <nav>
        <a href="/">Svelte<b>Chat</b></a>
        <a href="/">Exit</a>
    </nav>

    <main>
        {@render children()}
    </main>

    <footer>2026</footer>
</div>

<style>
    :global(body) {
        margin: 0;
        font-family: sans-serif;
        background: #fff;
    }

    .app {
        max-width: 600px;
        margin: 0 auto;
        padding: 2rem;
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }

    nav {
        display: flex;
        justify-content: space-between;
        margin-bottom: 3rem;
    }

    nav a {
        text-decoration: none;
        color: #000;
    }

    main {
        flex: 1;
    }

    footer {
        margin-top: 3rem;
        opacity: 0.4;
        font-size: 0.8rem;
    }
</style>