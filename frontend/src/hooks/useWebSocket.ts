import { useEffect } from 'react';
import { socket } from '../socket/WebSocketClient';
import { getToken } from '../helpers/auth-storage.helpers';

export const useSocket = () => {
  useEffect(() => {
    const token = getToken();
    socket.io.opts.extraHeaders = {
      Authorization: token,
    };
    socket.connect();

    const listener = (event: StorageEvent) => {
      if (event.key === 'token') {
        socket.io.opts.extraHeaders = {
          Authorization: event.newValue!,
        };
      }
    };

    window.addEventListener('storage', listener);
      
    return () => { 
      socket.disconnect(); 
      window.removeEventListener('storage', listener);
    };
  }, []);
};