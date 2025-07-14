import { Container } from "react-bootstrap";
import { TicketMessageData } from "../../types/types.d";
import ChatMessageItem from "./TicketMessageItem";
import { useEffect, useRef } from "react";

interface propData {
  messages: TicketMessageData[],
}

function ChatMessages(data: propData) {
  const { messages } = data;

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = 99999;
    }
  }

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Container className="bg-white rounded shadow-sm p-2 mb-3">
      <Container
        style={{ maxHeight: "30rem", overflowY: "scroll" }}
        className="d-flex flex-column"
        ref={messagesEndRef}
      >
        {messages.length > 0 ? (
          messages.map(elem =>
            <ChatMessageItem key={elem._id} message={elem} />
          )
        ) : (
          <p className="text-muted text-center">Сообщения в этом чате отсутствуют!</p>
        )}
      </Container>
    </Container>
  )
}

export default ChatMessages;