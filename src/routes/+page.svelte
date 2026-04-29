<script>
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    
    let create_room_name = '';
    let join_room_id = '';
	let active_rooms = $state([]);

    async function fetch_active_rooms() {
		const response = await fetch('/api/rooms');
		active_rooms = await response.json();
    }

    onMount(() => {
        fetch_active_rooms();
    });

    function create_new_room() {
        let room_name = create_room_name.trim().toLowerCase().replace(/\s+/g, '-');
        if (!room_name) {
            room_name = Math.random().toString(36).substring(2, 8); 
        }
        goto(`/chat/${room_name}`);
    }

    async function join_existing_room() {
        const room_name = join_room_id.trim().toLowerCase().replace(/\s+/g, '-');
        if (!room_name) {
            alert("Please enter a room ID.");
            return;
        }
        check_and_join(room_name);
    }

    async function check_and_join(room_name) {
		const response = await fetch(`/api/check-room/${room_name}`);
		const data = await response.json();

		if (data.exists) {
			goto(`/chat/${room_name}`);
		} else {
			alert(`room "${room_name}" does not exist`);
		}
    }
</script>
<div class="center-stage">
    <main>
        <h1>SvelteChat</h1>

        <div class="inputs">
            <div class="row">
                <input bind:value={create_room_name} placeholder="New room..." />
                <button on:click={create_new_room} class="primary">Create</button>
            </div>
            <div class="row">
                <input bind:value={join_room_id} placeholder="Room ID..." />
                <button on:click={join_existing_room}>Join</button>
            </div>
        </div>

        <section>
            <header>
                <b>Live Rooms</b>
                <button class="text-btn" on:click={fetch_active_rooms}>Refresh</button>
            </header>

            {#each active_rooms as room}
                <button class="room-link" on:click={() => check_and_join(room.id)}>
                    <span>#{room.id}</span>
                    <small>{room.users} online</small>
                </button>
            {:else}
                <p class="empty">No active rooms.</p>
            {/each}
        </section>
    </main>
</div>

<style>
    /* Center everything on screen */
    .center-stage {
        display: grid;
        place-items: center;
        min-height: 100vh;
        font-family: system-ui, sans-serif;
    }

    main { width: 320px; }

    h1 { text-align: center; margin-bottom: 2rem; }

    /* Layout groups */
    .inputs, section { display: grid; gap: 0.5rem; margin-bottom: 2rem; }
    .row { display: flex; gap: 0.5rem; }

    /* Minimal Elements */
    input { 
        flex: 1; padding: 8px; border: 1px solid #eee; border-radius: 4px; outline: none;
    }
    
    button { 
        padding: 8px 12px; border-radius: 4px; border: 1px solid #eee;
        background: #fff; cursor: pointer; font-size: 0.9rem;
    }

    .primary { background: #000; color: #fff; border: none; }

    /* List styling */
    header { display: flex; justify-content: space-between; font-size: 0.8rem; margin-bottom: 0.5rem; }
    
    .room-link {
        display: flex; justify-content: space-between; align-items: center;
        text-decoration: none; color: inherit; padding: 8px 0;
        border: none; border-bottom: 1px solid #f5f5f5; width: 100%; text-align: left;
    }

    .text-btn { border: none; padding: 0; color: #0066ff; background: none; font-size: 0.8rem; }
    .empty { text-align: center; color: #999; font-size: 0.9rem; }
</style>