import iziToast from "izitoast";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useFetchData from "../../api/api-client";
import { useAppDispatch } from "../../store/store-hooks";
import { login } from "../../store/user/userSlice";
import { AuthentificationData } from "../../types/types.d";

function FormRegister() {
  const [AuthentificationData, setRegData] = useState<AuthentificationData>({
    email: '',
    name: '',
    password: '',
  });
  const { authUser } = useFetchData();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const regHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      if (AuthentificationData.email.length === 0) {
        iziToast.warning({
          message: 'Введите емаил!',
          position: 'bottomCenter',
        });
        return;
      }

      if (AuthentificationData.name.length === 0) {
        iziToast.warning({
          message: 'Введите имя!',
          position: 'bottomCenter',
        });
        return;
      }

      if (AuthentificationData.password.length < 6) {
        iziToast.warning({
          message: 'Пароль должен содержать 6 и более символов!',
          position: 'bottomCenter',
        });
        return;
      }

      authUser.register(AuthentificationData)
        .then(result => {
          dispatch(login({ token: result.data.token, role: result.data.role, id: result.data.id }));
          iziToast.success({
            message: 'Успешная регистрация',
            position: 'bottomCenter',
          });
          navigate('/');
        })
        .catch(err => {    
          iziToast.error({
            message: typeof err.data.message === 'string' ? err.data.message : err.data.message[0],
            position: 'bottomCenter',
          });
        });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Form className="mb-3" onSubmit={regHandler}>
      <Form.Group className="mb-3">
        <Form.Label>Емаил</Form.Label>
        <Form.Control type="email" placeholder="Введите почту" onChange={(e) => setRegData({ ...AuthentificationData, email: e.target.value })} required />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Имя</Form.Label>
        <Form.Control type="text" placeholder="Введите имя" onChange={(e) => setRegData({ ...AuthentificationData, name: e.target.value })} required />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Телефон</Form.Label>
        <Form.Control type="tel" placeholder="Введите телефон" onChange={(e) => setRegData({ ...AuthentificationData, contactPhone: e.target.value })} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Пароль</Form.Label>
        <Form.Control type="password" placeholder="Введите пароль" onChange={(e) => setRegData({ ...AuthentificationData, password: e.target.value })} required />
      </Form.Group>
      <Button variant="primary" type="submit">
        Зарегистрироваться
      </Button>
    </Form>
  )
}

export default FormRegister