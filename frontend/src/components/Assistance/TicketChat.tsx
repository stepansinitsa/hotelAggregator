import iziToast from "izitoast";
import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { assistanceApi } from "../../api/api-client";
import { useAppSelector } from "../../store/store-hooks";
import { SocketEvent } from "../../types/types.d";
import { useWebSocket } from "../../hooks/useWebSocket"
import LoadingIndicator from "../Loader/LoadingIndicator";
import MessageInput from "./MessageInput";
import ChatMessages from "./TicketMessages";

function TicketChat() {
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [messages, setMessages] = useState<any>([]);
  const user = useAppSelector((state) => state.user);
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();

  const listener = (dto: SocketEvent) => {
    if (user.id !== dto.author.id) {
      setMessages((prev) => [
        ...prev,
        {
          _id: dto._id,
          authorId: dto.author.id,
          content: dto.text,
          timestamp: dto.sentAt,
        },
      ]);
    }
  };

  useWebSocket("subscribeToChat", listener);

  const handleSendMessage = async (text: string) => {
    try {
      if (!text.trim()) {
        iziToast.warning({
          message: "Введите текст сообщения перед отправкой",
          position: "bottomCenter",
        });
        return;
      }

      const ticketId: any = queryParams.get("id");

      const messageData = {
        authorId: user.id,
        ticketId,
        content: text,
      };

      const result = await assistanceApi.sendMessage(messageData);
      setMessages([...messages, result]);
    } catch (err) {
      iziToast.error({
        message: err.message || "Ошибка при отправке сообщения",
        position: "bottomCenter",
      });
    }
  };

  const handleCloseTicket = async () => {
    try {
      const ticketId: any = queryParams.get("id");
      await assistanceApi.closeTicket(ticketId);
      iziToast.success({
        message: "Обращение успешно закрыто",
        position: "bottomCenter",
      });
      navigate(-1);
    } catch (err) {
      iziToast.error({
        message: err.message || "Не удалось закрыть обращение",
        position: "bottomCenter",
      });
    }
  };

  useEffect(() => {
    const ticketId = queryParams.get("id");
    const userId = user.id;

    if (!ticketId || !userId) {
      navigate("/not-found");
      return;
    }

    assistanceApi.loadMessages(ticketId, userId)
      .then((result) => {
        setMessages(result.data);
        setLoading(false);
        assistanceApi.markAsRead({ readerId: userId, ticketId, beforeDate: new Date() });
      })
      .catch((err) => {
        setError(true);
        iziToast.error({
          message: err.message || "Ошибка загрузки сообщений",
          position: "bottomCenter",
        });
      });
  }, []);

  return (
    <>
      <Container className="bg-white rounded shadow-sm p-3 mb-4">
        <Container>
          <h2 className="fs-5 fw-bold">Чат с поддержкой</h2>
          <p className="text-muted">Клиент: {queryParams.get("email")}</p>
          {(user.role === "manager" || user.role === "admin") && (
            <Button variant="danger" onClick={handleCloseTicket}>
              Завершить обращение
            </Button>
          )}
        </Container>
      </Container>

      {loading ? (
        <LoadingIndicator />
      ) : error ? (
        <p className="text-center">Не удалось загрузить сообщения</p>
      ) : (
        <>
          <ChatMessages messages={messages} />
          <MessageInput onSendMessage={handleSendMessage} />
        </>
      )}
    </>
  );
}

export default TicketChat;