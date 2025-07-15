import { Container } from "react-bootstrap";
import ChatMessageItem from "./TicketMessageItem";
import { TicketMessageData } from "../../types/types.d";
import { useEffect, useRef } from "react";

interface MessagesListProps {
  messages: TicketMessageData[];
}

function ChatMessages({ messages }: MessagesListProps) {
  const ref = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    setTimeout(() => {
      if (ref.current) {
        ref.current.scrollTop = ref.current.scrollHeight;
      }
    }, 100);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Container className="bg-white rounded shadow-sm p-3 mb-3">
      <Container
        ref={ref}
        style={{ maxHeight: "30rem", overflowY: "auto" }}
        className="d-flex flex-column gap-2"
      >
        {messages.length > 0 ? (
          messages.map((message) => (
            <ChatMessageItem key={message._id} message={message} />
          ))
        ) : (
          <p className="text-muted text-center mt-3">Нет сообщений</p>
        )}
      </Container>
    </Container>
  );
}

export default ChatMessages;