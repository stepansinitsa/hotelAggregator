import { Card } from "react-bootstrap";
import { useAppSelector } from "../../store/store-hooks";
import { TicketMessageData } from "../../types/types.d";

interface MessageItemProps {
  message: TicketMessageData;
}

function ChatMessageItem({ message }: MessageItemProps) {
  const currentUser = useAppSelector((state) => state.user);
  const isMine = message.authorId === currentUser.id;

  return (
    <Card
      bg={isMine ? "primary" : "light"}
      text={isMine ? "white" : "dark"}
      className={`align-self-${isMine ? "end" : "start"} m-2`}
      style={{ maxWidth: "27rem" }}
    >
      <Card.Body>
        <small className="text-muted">{new Date(message.sentAt).toLocaleString()}</small>
        <Card.Text>{message.text}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default ChatMessageItem;