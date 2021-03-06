import io from 'socket.io-client';
import store from "../store";


const host = process.env.REACT_APP_API_HOST;
export default class socketAPI {
    socket;
    connect(connectClb,disconnectClb) {
        this.socket = io(host, {
            auth: {
                token: store.getState().auth.token
            }
        });
        return new Promise((resolve, reject) => {
            this.socket.on('connect', () => {connectClb(); resolve()});
            this.socket.on('connect_error', (error) => reject(error));
            return new Promise((resolve, reject) => {
                this.socket.on('disconnect', () => {disconnectClb(); resolve()});
            });
        });
    }
    disconnect() {
        return new Promise((resolve) => {
            this.socket.disconnect(() => {
                this.socket = null;
                resolve();
            });
        });
    }
    emit(event, data) {
        return new Promise((resolve, reject) => {
            if (!this.socket) return reject('No socket connection.');
            return this.socket.emit(event, data, (response) => {
                if (response.error) {
                    console.error(response.error);
                    return reject(response.error);
                }
                return resolve();
            });
        });
    }
    on(event, fun) {
        return new Promise((resolve, reject) => {
            if (!this.socket) return reject('No socket connection.');
            this.socket.on(event, fun);
            resolve();
        });
    }
}
