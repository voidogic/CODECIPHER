import {io} from 'socket.io-client';

export const initSocket = async () =>{
    const options = {
        forceNew: true,
        reconnectionAttempts: Infinity,
        timeout: 10000,
        transports: ['websocket', 'polling'],
        autoConnect: true,
    };
    
    const socket = io(`${process.env.REACT_APP_BACKEND_URL}`, options);
    
    // Add connection event listeners for debugging
    socket.on('connect', () => {
        console.log('Socket connected successfully:', socket.id);
    });
    
    socket.on('connect_error', (error) => {
        console.error('Socket connection error:', error);
    });
    
    socket.on('disconnect', (reason) => {
        console.log('Socket disconnected:', reason);
    });
    
    socket.on('reconnect', (attemptNumber) => {
        console.log('Socket reconnected after', attemptNumber, 'attempts');
    });
    
    socket.on('reconnect_error', (error) => {
        console.error('Socket reconnection error:', error);
    });
    
    return socket;
}