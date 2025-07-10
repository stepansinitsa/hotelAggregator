import iziToast from "izitoast";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { assistanceApi } from "../../api/api-client";
import { useAppSelector } from "../../store/store-hooks";

const AssistanceCreateForm = () => {
  const user = useAppSelector((state) => state.user);
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (message.length > 1000) {
      iziToast.warning({
        message: "Текст обращения не должен превышать 1000 символов",
        position: "bottomCenter",
      });
      return;
    }

    try {
      await assistanceApi.openTicket({ clientId: user.id, initialMessage: message });
      iziToast.success({
        message: "Ваше обращение отправлено",
        position: "bottomCenter",
      });

      window.location.reload();
    } catch (err) {
      iziToast.error({
        message: "Ошибка при создании обращения",
        position: "bottomCenter",
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-4">
      <Form.Group className="mb-3" controlId="form-assistance-text">
        <Form.Label>Введите текст обращения</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          maxLength={1000}
          placeholder="Опишите вашу проблему"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
      </Form.Group>

      <Button variant="success" type="submit">
        Создать обращение
      </Button>{" "}
      <Button variant="secondary" type="reset">
        Очистить
      </Button>
    </Form>
  );
};

export default AssistanceCreateForm;