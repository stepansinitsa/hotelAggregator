import iziToast from "izitoast";
import { useWebSocket } from "../../hooks/useWebSocket";
import { onSocketEvent } from "../../hooks/onSocketEvent";
import { useWebSocketSubscription } from "../../hooks/useWebSocketSubscription";
import { SocketEvent } from "../../types/types.d";
import { useAppSelector } from "../../store/store-hooks";

const ChatNotificationHandler = () => {
  const user = useAppSelector((state) => state.user);

  useWebSocket();
  useWebSocketSubscription();

  const listener = (dto: SocketEvent) => {
    if (user.id !== dto.author.id) {
      iziToast.info({
        message: `Новое сообщение от ${dto.author.name}`,
        position: "bottomCenter",
      });
    }
  };

  onSocketEvent("newMessage", listener);

  return null;
};

export default ChatNotificationHandler;