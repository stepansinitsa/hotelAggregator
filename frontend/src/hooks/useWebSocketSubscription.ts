import { useEffect } from "react";
import { socket } from "../socket/WebSocketClient";
import { useAppSelector } from "../store/store-hooks";
import { accountSlice } from "../store/user/accountSlice";
import { useDispatch } from "react-redux";
import { FetchChatListParams } from "../types/types.d";

export const useWebSocketSubscription = () => {
  const dispatch = useDispatch();
  const user = useAppSelector((state) => state.user);
  const isConnected = useAppSelector((state) => state.socketIO.isConnected);

  useEffect(() => {
    if (!isConnected) return;

    const query: FetchChatListParams = {
      clientId: user.role === "client" ? user.id : null,
      isActive: true,
    };

    dispatch(accountSlice(query));
  }, [isConnected]);
};