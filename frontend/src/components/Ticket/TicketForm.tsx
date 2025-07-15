import { useState } from "react";
import { Button, Form } from "react-bootstrap";

interface ChatInputProps {
  handleSendMessage: (text: string) => void;
}

function ChatForm({ handleSendMessage }: ChatInputProps) {
  const [text, setText] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    handleSendMessage(text);
    setText("");
  };

  return (
    <Form onSubmit={handleSubmit} className="d-flex gap-2 mb-3">
      <Form.Control
        type="text"
        placeholder="Введите сообщение..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      />
      <Button variant="primary" onClick={() => handleSendMessage(text)}>
        Отправить
      </Button>
    </Form>
  );
}

export default ChatForm;