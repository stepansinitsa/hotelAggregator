import { Card } from "react-bootstrap";
import { useAppSelector } from "../../store/store-hooks";
import { TicketMessageData } from "../../types/types.d";

interface propData {
  message: TicketMessageData;
}

function ChatMessageItem(data: propData) {
  const { message } = data;
  const user = useAppSelector(state => state.user);

  let background = '#e8f1f3';
  if (message.authorId !== user.id) {
    background = '#efefef';
  }

  return (
    <Card style={{ maxWidth: '27rem', background }} className={message.authorId === user.id ? "align-self-end m-2" : "align-self-start m-2"}>
      <Card.Body>
        <Card.Subtitle className="mb-2 text-muted">{new Date(message.sentAt).toLocaleDateString()}</Card.Subtitle>
        <Card.Text>
          {message.text}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default ChatMessageItem;
