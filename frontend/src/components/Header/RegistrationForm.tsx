import iziToast from "izitoast";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { accountApi } from "../../api/api-client";
import { useAppDispatch } from "../../store/store-hooks";
import { login } from "../../store/user/accountSlice";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    password: "",
    phone: "",
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email.trim()) {
      iziToast.warning({
        message: "Введите корректный email",
        position: "bottomCenter",
      });
      return;
    }

    if (!formData.fullName.trim()) {
      iziToast.warning({
        message: "Введите ваше имя",
        position: "bottomCenter",
      });
      return;
    }

    if (formData.password.length < 6) {
      iziToast.warning({
        message: "Пароль должен содержать минимум 6 символов",
        position: "bottomCenter",
      });
      return;
    }

    try {
      const result = await accountApi.register(formData);
      dispatch(
        login({
          token: result.token,
          role: result.role,
          id: result.id,
        })
      );

      iziToast.success({
        message: "Вы успешно зарегистрировались",
        position: "bottomCenter",
      });

      navigate("/");
    } catch (err) {
      iziToast.error({
        message: err.message || "Ошибка регистрации",
        position: "bottomCenter",
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-4">
      <Form.Group className="mb-3" controlId="form-email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Введите email"
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="form-fullName">
        <Form.Label>Имя</Form.Label>
        <Form.Control
          type="text"
          placeholder="Введите ваше имя"
          value={formData.fullName}
          onChange={(e) =>
            setFormData({ ...formData, fullName: e.target.value })
          }
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="form-phone">
        <Form.Label>Телефон</Form.Label>
        <Form.Control
          type="tel"
          placeholder="Введите телефон"
          value={formData.phone}
          onChange={(e) =>
            setFormData({ ...formData, phone: e.target.value })
          }
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="form-password">
        <Form.Label>Пароль</Form.Label>
        <Form.Control
          type="password"
          placeholder="Введите пароль"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Зарегистрироваться
      </Button>
    </Form>
  );
};

export default RegistrationForm;