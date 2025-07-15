import { useEffect } from 'react';
import { socket } from '../socket/WebSocketClient';
import { useAppSelector } from '../store/store-hooks';
import { GetTicketListParams } from '../types/types.d';
import useFetchData from '../api/api-client';

export const useSocketSubscribe = () => {
  const isConnected = useAppSelector((state) => state.socketIO.isConnected);
  const user = useAppSelector((state) => state.user);
  const { supportRequestApi } = useFetchData();

  useEffect(() => {
    if (!isConnected) return;

    const query: GetTicketListParams = {
      userId: user.id,
      isActive: true,
    };

    if (user.role === 'manager' || user.role === 'admin') {
      query.userId = null;
    }

    supportRequestApi.findRequests(query)
      .then(({ data }: { data: { _id: string }[] }) => {
        data.forEach((ticket) => {
          socket.emit('subscribeToChat', { chatId: ticket._id });
        });
      })
      .catch((err: Error) => {
        console.error("Ошибка при подписке на чат:", err);
      });
  }, [isConnected]);
};