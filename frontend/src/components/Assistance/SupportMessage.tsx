import { Card } from "react-bootstrap";
import { useAppSelector } from "../../store/store-hooks";
import { ChatMessage } from "../../types/types.d";

interface SupportMessageProps {
  message: ChatMessage;
}

const SupportMessage: React.FC<SupportMessageProps> = ({ message }) => {
  const user = useAppSelector((state) => state.user);
  const isAuthor = message.author.id === user.id;

  return (
    <Card
      style={{ maxWidth: "27rem", background: isAuthor ? "#d9f7ff" : "#efefef" }}
      className={`m-2 ${isAuthor ? "align-self-end" : "align-self-start"}`}
    >
      <Card.Body>
        <small className="text-muted">
          {new Date(message.sentAt).toLocaleString()}
        </small>
        <Card.Text>{message.content}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default SupportMessage;