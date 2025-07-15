import iziToast from "izitoast";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useFetchData from "../../api/api-client";
import { useAppDispatch } from "../../store/store-hooks";
import { login } from "../../store/user/userSlice";
import { AuthentificationData } from "../../types/types.d";

function FormRegister() {
  const [formData, setFormData] = useState<AuthentificationData>({
    email: "",
    name: "",
    password: "",
    contactPhone: "",
  });

  const { authUser } = useFetchData();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email.trim()) {
      iziToast.warning({
        message: "Введите email!",
        position: "bottomCenter",
      });
      return;
    }

    if (!formData.name.trim()) {
      iziToast.warning({
        message: "Введите имя!",
        position: "bottomCenter",
      });
      return;
    }

    if (formData.password.length < 6) {
      iziToast.warning({
        message: "Пароль должен быть не менее 6 символов!",
        position: "bottomCenter",
      });
      return;
    }

    try {
      const result = await authUser.register(formData);
      const userData = result.data;

      dispatch(login({ token: userData.token, role: userData.role, id: userData.id, email: userData.email }));
      iziToast.success({
        message: "Регистрация успешна",
        position: "bottomCenter",
      });

      navigate("/");
    } catch (err: any) {
      iziToast.error({
        message: err?.response?.data?.message || "Ошибка регистрации",
        position: "bottomCenter",
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Form onSubmit={handleRegister} className="mt-3">
      <Form.Group className="mb-3" controlId="form-register-email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          placeholder="Введите email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="form-register-name">
        <Form.Label>Имя</Form.Label>
        <Form.Control
          type="text"
          name="name"
          placeholder="Введите имя"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="form-register-phone">
        <Form.Label>Телефон</Form.Label>
        <Form.Control
          type="tel"
          name="contactPhone"
          placeholder="Введите телефон"
          value={formData.contactPhone}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="form-register-password">
        <Form.Label>Пароль</Form.Label>
        <Form.Control
          type="password"
          name="password"
          placeholder="Введите пароль"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Button variant="success" type="submit">
        Зарегистрироваться
      </Button>
    </Form>
  );
}

export default FormRegister;