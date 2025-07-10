import { useEffect } from "react";
import { socket } from "../socket/WebSocketClient";

export const onSocketEvent = (
  event: string,
  handler: (...args: any[]) => void
) => {
  useEffect(() => {
    socket.on(event, handler);
    return () => {
      socket.off(event, handler);
    };
  }, [handler]);
};