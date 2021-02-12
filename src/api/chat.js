import io from 'socket.io-client';
const socket = io("ws://localhost:8000");

const api ={

    singIn: (user) => {
        return io("http://localhost:8000", {query: {user}});
    },
    sendMessage: (message) => {
        socket.emit("new message", message);
    }
};

export default api;
