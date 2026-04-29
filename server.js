import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { handler } from './build/handler.js'; 

const app = express();

const server = createServer(app);
const io = new Server(server);

const message_history = {};

io.on('connection', (socket) => {
    console.log('User connected');

    socket.on('join_room', (room_id) => {
        socket.join(room_id);
        console.log(`User joined room: ${room_id}`);
        
    });

    socket.on('chat_message', (data, room_id) => {
		const { room } = data;

		if (!message_history[room]) {
			message_history[room] = [];
		}

		message_history[room].push({
			user: data.user,
			text: data.text,
			color: data.color,
		});

        io.to(data.room).emit('chat_message', data, room_id);		
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

const PORT = process.env.PORT || 3000;

app.get('/api/check-room/:room_id', (req, res) => {
    const room_id = req.params.room_id;
    const exists = io.sockets.adapter.rooms.has(room_id);
    res.json({ exists: exists });
});

app.get('/api/room-history/:room_id', (req, res) => {
	const history = message_history[req.params.room_id] || [];
    res.json(history);
});

app.get('/api/rooms', (req, res) => {
    const active_rooms = [];
    
    for (const [room_id, sockets] of io.sockets.adapter.rooms.entries()) {
        if (!sockets.has(room_id)) {
            active_rooms.push({
                id: room_id,
                users: sockets.size 
            });
        }
    }
    
    res.json(active_rooms);
});

app.use(handler);

server.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`);
});