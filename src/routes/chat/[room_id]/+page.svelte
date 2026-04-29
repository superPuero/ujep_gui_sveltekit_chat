<script>
	import { page } from '$app/state';
    import { onMount } from 'svelte';
    import { io } from 'socket.io-client';

	let room_id = page.params.room_id;

	let socket;
  	let messages = $state([]);
    let current_message = $state('');
    let username = $state(''); 
    let username_color = $state('#000000');

    onMount(async () => {
        socket = io();
		
		const response = await fetch(`/api/room-history/${room_id}`);
		messages = await response.json();

        socket.emit('join_room', room_id);

        socket.on('chat_message', (msg, mroom_id) => {
			if(room_id == mroom_id)
			{
				messages.push(msg)
			}
        });
		
        return () => {
            if (socket) socket.disconnect();
        };
    });
    
	async function get_history(room_id) {
    }

    function send_message() {
        if (current_message.trim() && username.trim()) {
            const message = { 
                room: room_id,      
                user: username, 
                text: current_message,
                color: username_color 
            };
            
            socket.emit('chat_message', message, room_id);
            current_message = '';
        } else if (!username.trim()) {
            alert("Please enter a username before sending!");
        }
    }
</script>
<main class="chat-card">
    <header>
        <h2>#{room_id} <span class="dot"></span></h2>
        <div class="user">
            <input type="text" bind:value={username} class="name" />
            <input type="color" bind:value={username_color} class="color" />
        </div>
    </header>

    <div class="feed">
        {#each messages as msg}
            <p>
                <b style="color: {msg.color}">{msg.user}</b> {msg.text}
            </p>
        {:else}
            <p class="gray">No messages yet.</p>
        {/each}
    </div>

	<footer>
		<input 
			bind:value={current_message} 
			placeholder="Type a message..." 
			onkeydown={e => e.key === 'Enter' && send_message()} 
		/>
		<button onclick={send_message}>Send</button>
	</footer>
</main>

<style>
    .chat-card {
        width: 600px;
        height: 500px;
        background: #fff;
        display: flex;
        flex-direction: column;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        overflow: hidden;

        header {
            display: flex; justify-content: space-between; align-items: center;
            padding: 1rem; border-bottom: 1px solid #eee;
            h2 { margin: 0; font-size: 1.1rem; }
            .dot { height: 8px; width: 8px; background: #22c55e; border-radius: 50%; display: inline-block; }
            .user { display: flex; gap: 8px; }
        	 .name { border: 1px solid #e4e4e7; background: #f4f4f5; padding: 8px 12px; border-radius: 6px; width: 180px; font-weight: 700; transition: all 0.2s; outline: none; }
            .color { border: none; background: none; width: 32px; height: 32px; cursor: pointer; padding: 0; }
        }

        .feed {
            flex: 1; padding: 1rem; overflow-y: auto; background: #fafafa;
            p { margin: 0 0 8px 0; font-size: 0.95rem; }
            b { margin-right: 6px; }
            .gray { color: #999; text-align: center; margin-top: 20%; }
        }

        footer {
            padding: 1rem; display: flex; gap: 8px; border-top: 1px solid #eee;
            input { flex: 1; padding: 10px; border: 1px solid #ddd; border-radius: 6px; outline: none; }
            button { background: #000; color: #fff; border: none; padding: 0 16px; border-radius: 6px; font-weight: 600; cursor: pointer; }
        }
    }
</style>