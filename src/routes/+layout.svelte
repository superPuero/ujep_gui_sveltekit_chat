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
    /* Clean font and layout */
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

    /* Simple Nav: just space between links */
    nav {
        display: flex;
        justify-content: space-between;
        margin-bottom: 3rem;
    }

    nav a {
        text-decoration: none;
        color: #000;
    }

    /* Let the content fill the middle */
    main {
        flex: 1;
    }

    /* Subtle footer */
    footer {
        margin-top: 3rem;
        opacity: 0.4;
        font-size: 0.8rem;
    }
</style>