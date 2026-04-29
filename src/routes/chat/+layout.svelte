<script lang="ts">
	import { page } from '$app/state';
	let { children } = $props();
</script>

<main style="max-width: 600px; margin: 0 auto; padding: 1rem; font-family: sans-serif;">
	<div style="display: flex; justify-content: space-between; align-items: center;">
        <h1>Room: <span style="color: #0070f3;">#{page.params.room_id}</span></h1>
        <a href="/" style="text-decoration: none; color: #555;">&larr; Leave Room</a>
    </div>
	{@render children()}
</main>