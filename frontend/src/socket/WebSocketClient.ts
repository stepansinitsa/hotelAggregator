import { io } from "socket.io-client";
import { useDispatch } from "react-redux";
import { setConnectedStatus } from "../store/websocket/websocketSlice";

const socket = io(import.meta.env.VITE_API_BASE_URL, {
  autoConnect: false,
});

export { socket };

export default const WebSocketClient = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleConnect = () => {
      dispatch(setConnectedStatus({ isConnected: true }));
    };

    const handleDisconnect = () => {
      dispatch(setConnectedStatus({ isConnected: false }));
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
    };
  }, []);

  return null;
};