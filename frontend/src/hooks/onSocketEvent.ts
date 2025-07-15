import { useEffect } from 'react';
import { socket } from '../socket/WebSocketClient';

export const onSocketEvent = (event: string, listener: (...args: any[]) => void) => {
  useEffect(() => {
    if (!socket.hasListeners(event)) {
      socket.on(event, listener);
    }

    return () => {
      socket.off(event, listener);
    };
  }, [event, listener]);
};