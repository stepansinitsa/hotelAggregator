import iziToast from "izitoast";
import { useSocket } from "../../hooks/useWebSocket";
import { onSocketEvent } from "../../hooks/onSocketEvent";
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
  onSocketEvent('subscribeToChat', listener);
  onSocketEvent('newMessage', listener);

  return (
    <></>
  )
}

export default SocketHiddenDiv;
