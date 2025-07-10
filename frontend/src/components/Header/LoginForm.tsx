import iziToast from "izitoast";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { accountApi } from "../../api/api-client";
import { useAppDispatch } from "../../store/store-hooks";
import { login } from "../../store/user/accountSlice";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      iziToast.warning({
        message: "Введите email",
        position: "bottomCenter",
      });
      return;
    }

    if (password.length < 6) {
      iziToast.warning({
        message: "Пароль должен быть не менее 6 символов",
        position: "bottomCenter",
      });
      return;
    }

    try {
      const response = await accountApi.login({ email, password });

      dispatch(
        login({
          token: response.token,
          role: response.role,
          id: response.id,
        })
      );

      iziToast.success({
        message: "Вы вошли в систему",
        position: "bottomCenter",
      });

      navigate("/");
    } catch (err) {
      iziToast.error({
        message: "Неверные учетные данные",
        position: "bottomCenter",
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-4">
      <Form.Group className="mb-3" controlId="form-email">
        <Form.Label>Электронная почта</Form.Label>
        <Form.Control
          type="email"
          placeholder="Введите ваш email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="form-password">
        <Form.Label>Пароль</Form.Label>
        <Form.Control
          type="password"
          placeholder="Введите пароль"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Авторизоваться
      </Button>
    </Form>
  );
};

export default LoginForm;