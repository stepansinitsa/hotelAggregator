import { useEffect } from "react";
import { socket } from "../socket/WebSocketClient";
import { useAppDispatch } from "../store/store-hooks";
import { setConnectedStatus } from "../store/websocket/websocketSlice";

export const useWebSocket = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = getAuthToken();
    socket.auth = { token };
    socket.connect();

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "authToken") {
        socket.auth.token = event.newValue || "";
        socket.connect();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      socket.disconnect();
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);
};