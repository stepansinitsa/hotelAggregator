import iziToast from "izitoast";
import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/store-hooks";
import { WebSocketDto } from "../../types/types.d";
import useFetchData from "../../api/api-client";
import { onSocketEvent } from "../../hooks/onSocketEvent";
import LoaderMain from "../Loader/LoadingIndicator";
import ChatForm from "./TicketForm";
import ChatMessages from "./TicketMessages";

function ChatMain() {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [messages, setMessages] = useState<any>([]);
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user);
  const queryParams = new URLSearchParams(location.search);
  const supportRequestId = queryParams.get("id");
  const userEmail = queryParams.get("email");
  const { supportRequestApi } = useFetchData();

  const handleNewMessage = (dto: WebSocketDto) => {
    if (dto.author.id !== user.id) {
      setMessages((prev: WebSocketDto[]) => [...prev, dto]);
    }
  };

  onSocketEvent("subscribeToChat", handleNewMessage);

  const sendMessage = async (text: string) => {
    if (!text.trim()) {
      iziToast.warning({
        message: "Сообщение не может быть пустым",
        position: "bottomCenter",
      });
      return;
    }

    if (!supportRequestId || !user.id) {
      return;
    }

    try {
      const result = await supportRequestApi.sendMessage({
        authorId: user.id.toString(),
        supportRequestId: supportRequestId,
        text: text,
      });

      setMessages((prev: WebSocketDto[]) => [...prev, result.data]);
    } catch (err: any) {
      iziToast.error({
        message: err?.response?.data?.message || "Ошибка при отправке сообщения",
        position: "bottomCenter",
      });
    }
  };

  const closeTicket = async () => {
    try {
      if (!supportRequestId) return;
      
      await supportRequestApi.closeRequest(supportRequestId);
      iziToast.success({
        message: "Обращение закрыто",
        position: "bottomCenter",
      });
      navigate(-1);
    } catch (err: any) {
      iziToast.error({
        message: err?.response?.data?.message || "Ошибка при закрытии обращения",
        position: "bottomCenter",
      });
    }
  };

  useEffect(() => {
    if (!supportRequestId || !userEmail) {
      navigate("/error");
      return;
    }

    // Загрузка сообщений
    supportRequestApi.getMessages(String(supportRequestId), user.id as string)
      .then((result: { data: WebSocketDto[] }) => {
        setMessages(result.data || []);
        setLoading(false);
      })
      .catch((err: any) => {
        setError(true);
        iziToast.error({
          message: typeof err.data.message === "string"
            ? err.data.message
            : err.data.message[0],
          position: "bottomCenter",
        });
      });
  }, []);

  return (
    <>
      <Container className="bg-white rounded shadow-sm p-3 mb-3">
        <Container>
          <h3 className="fs-5 fw-semibold">Чат с пользователем</h3>
          <p className="text-muted">Пользователь: {userEmail}</p>
          {(user.role === "manager" || user.role === "admin") && (
            <Button variant="outline-danger" onClick={closeTicket}>
              Закрыть обращение
            </Button>
          )}
        </Container>
      </Container>

      {loading ? (
        <LoaderMain />
      ) : error ? (
        <p className="text-center text-danger mt-3">Ошибка загрузки чата</p>
      ) : (
        <>
          <ChatMessages messages={messages} />
          <ChatForm handleSendMessage={sendMessage} />
        </>
      )}
    </>
  );
}

export default ChatMain;