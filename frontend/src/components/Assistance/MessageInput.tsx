import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

interface MessageInputProps {
  onSendMessage: (message: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onSendMessage(content);
      setContent("");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="message-input" className="position-relative mb-3">
        <Form.Control
          as="textarea"
          rows={1}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Напишите сообщение..."
          required
          className="form-control shadow-none"
        />
      </Form.Group>
      <Button variant="primary" type="submit" className="w-100">
        Отправить
      </Button>
    </Form>
  );
};

export default MessageInput;