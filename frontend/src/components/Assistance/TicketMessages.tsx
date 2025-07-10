import { Container } from "react-bootstrap";
import { ChatMessage } from "../../types/types.d";
import SupportMessage from "./SupportMessage";
import { useEffect, useRef } from "react";

interface TicketMessagesProps {
  messages: ChatMessage[];
}

const TicketMessages: React.FC<TicketMessagesProps> = ({ messages }) => {
  const chatRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatRef.current) {
      chatRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
      chatRef.current.scrollTop = 99999;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Container className="bg-white rounded shadow-sm p-3 mb-4">
      <Container
        style={{ maxHeight: "30rem", overflowY: "auto" }}
        className="d-flex flex-column"
        ref={chatRef}
      >
        {messages.length > 0 ? (
          messages.map((msg) => (
            <SupportMessage key={msg._id} message={msg} />
          ))
        ) : (
          <p className="text-center text-muted">Нет сообщений</p>
        )}
      </Container>
    </Container>
  );
};

export default TicketMessages;