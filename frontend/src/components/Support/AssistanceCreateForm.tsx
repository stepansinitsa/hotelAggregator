import iziToast from "izitoast";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import useFetchData from "../../api/api-client";
import { useAppSelector } from "../../store/store-hooks";
import { useNavigate } from "react-router-dom";

function SupportForm() {
  const [message, setMessage] = useState<string>("");
  const currentUser = useAppSelector((state) => state.user);
  const { supportRequestApi } = useFetchData();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentUser.id) {
      iziToast.warning({
        message: "Вы должны быть авторизованы",
        position: "bottomCenter",
      });
      return;
    }

    if (message.length > 1000) {
      iziToast.warning({
        message: "Сообщение не должно превышать 1000 символов",
        position: "bottomCenter",
      });
      return;
    }

    try {
      await supportRequestApi.createRequest({ userId: currentUser.id, text: message });
      iziToast.success({
        message: "Обращение успешно отправлено",
        position: "bottomCenter",
      });
      navigate("/support");
    } catch (err: any) {
      iziToast.error({
        message: err?.response?.data?.message || "Ошибка при создании обращения",
        position: "bottomCenter",
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-4">
      <Form.Group className="mb-3" controlId="form-support-message">
        <Form.Label>Текст обращения</Form.Label>
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
}

export default SupportForm;