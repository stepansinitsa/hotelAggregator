import iziToast from "izitoast";
import { useSocket } from "../../hooks/useWebSocket";
import { useSocketEvent } from "../../hooks/onSocketEvent";
import { useSocketSubscribe } from "../../hooks/useWebSocketSubscription";
import { WebSocketDto } from "../../types/types.d";
import { useAppSelector } from "../../store/store-hooks";

function SocketHiddenDiv() {
  const user = useAppSelector(state => state.user);
  useSocket();
  useSocketSubscribe();
  const listener = (socketDto: WebSocketDto) => {
    if (user.id !== socketDto.author.id) {
      iziToast.info({
        message: `Новое сообщение от пользователя ${socketDto.author.name}`,
        position: 'bottomCenter',
      });
    }
  };
  useSocketEvent('subscribeToChat', listener);
  useSocketEvent('newMessage', listener);

  return (
    <></>
  )
}

export default SocketHiddenDiv;
