import iziToast from "izitoast";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useFetchData from "../../api/api-client";
import { useAppDispatch } from "../../store/store-hooks";
import { login } from "../../store/user/userSlice";

function FormAuth() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { authUser } = useFetchData();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      iziToast.warning({
        message: "Пожалуйста, введите email",
        position: "bottomCenter",
      });
      return;
    }

    if (password.length < 6) {
      iziToast.warning({
        message: "Пароль должен содержать минимум 6 символов",
        position: "bottomCenter",
      });
      return;
    }

    try {
      const result = await authUser.login(email, password);
      const userData = result.data;

      dispatch(login({ token: userData.token, role: userData.role, id: userData.id, email: userData.email }));
      iziToast.success({
        message: "Авторизация успешна",
        position: "bottomCenter",
      });

      navigate("/");
    } catch (err: any) {
      iziToast.error({
        message: err?.response?.data?.message || "Ошибка при входе",
        position: "bottomCenter",
      });
    }
  };

  return (
    <Form onSubmit={handleLogin} className="mb-3">
      <Form.Group className="mb-3" controlId="form-login-email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Введите почту"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="form-login-password">
        <Form.Label>Пароль</Form.Label>
        <Form.Control
          type="password"
          placeholder="Введите пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Войти
      </Button>
    </Form>
  );
}

export default FormAuth;