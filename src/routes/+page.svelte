<script>
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    
    let create_room_name = '';
    let join_room_id = '';
    let active_rooms = [];

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
<main class="card">
    <h1>SvelteChat</h1>

    <div class="stack">
        <div class="field">
            <input bind:value={create_room_name} placeholder="New room..." />
            <button class="dark" on:click={create_new_room}>Create</button>
        </div>
        <div class="field">
            <input bind:value={join_room_id} placeholder="Room ID..." />
            <button on:click={join_existing_room}>Join</button>
        </div>
    </div>

    <section class="list">
        <header>
            <h3>Live</h3>
            <button class="small" on:click={fetch_active_rooms}>Refresh</button>
        </header>

        {#each active_rooms as room}
            <button class="item" on:click={() => check_and_join(room.id)}>
                <span>#{room.id}</span>
                <small>{room.users} online</small>
            </button>
        {:else}
            <p class="empty">No active rooms.</p>
        {/each}
    </section>
</main>

<style>
    .card {
        background: #fff;
        padding: 2rem;
        border-radius: 12px;
        width: 360px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.08);
        
        h1 { text-align: center; margin-top: 0; }
    }

    .stack { display: grid; gap: 12px; margin-bottom: 24px; }

    .field { 
        display: flex; gap: 8px; 
        
        input { 
            flex: 1; padding: 10px; border: 1px solid #ddd; border-radius: 6px; 
        }
        
        button { 
            padding: 10px 16px; border-radius: 6px; border: 1px solid #ddd;
            background: #fff; cursor: pointer; font-weight: 600;
            &.dark { background: #000; color: #fff; border: none; }
        }
    }

    .list {
        border-top: 1px solid #eee; padding-top: 16px;
        
        header { display: flex; justify-content: space-between; align-items: center; }
        
        .small { border: none; background: none; color: #666; font-size: 0.8rem; cursor: pointer; }

        .item {
            display: flex; justify-content: space-between; width: 100%;
            padding: 12px; margin-top: 8px; border: 1px solid #f0f0f0;
            border-radius: 6px; background: #fff; cursor: pointer;
            &:hover { background: #f9f9f9; }
        }
        
        .empty { text-align: center; color: #999; font-size: 0.9rem; }
    }
</style>