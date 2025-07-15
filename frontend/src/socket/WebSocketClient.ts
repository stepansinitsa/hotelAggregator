import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { useAppDispatch } from '../store/store-hooks';
import { setConnectedStatus } from '../store/websocket/websocketSlice';

export const socket = io(import.meta.env.VITE_API_BASE_URL, {
  auth: {
    token: localStorage.getItem('token'),
  },
  reconnection: true,
  reconnectionAttempts: Infinity,
});

export default function SocketClient() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const onConnect = () => dispatch(setConnectedStatus({ isConnected: true }));
    const onDisconnect = () => dispatch(setConnectedStatus({ isConnected: false }));

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, []);

  return null;
}