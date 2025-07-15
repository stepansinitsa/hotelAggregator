import { useEffect } from 'react';
import { socket } from '../socket/WebSocketClient';
import { getToken } from '../helpers/auth-storage.helpers';

export const useSocket = () => {
  useEffect(() => {
    const token = getToken();

    socket.auth = { token };
    socket.connect();

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'token') {
        socket.auth = { token: e.newValue };
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      socket.disconnect();
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
};