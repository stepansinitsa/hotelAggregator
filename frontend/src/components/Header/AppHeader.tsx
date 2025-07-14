import { useState } from "react";
import { Container } from "react-bootstrap";
import { useAuth } from "../../hooks/useAuthentication";
import FormAuth from "./LoginForm";
import FormRegister from "./RegistrationForm";
import HeaderProfile from "./UserProfileMenu";

function HeaderAuth() {
  const isAuth = useAuth();
  const [authForm, setAuthForm] = useState(true);

  return (
    <Container>
      {isAuth === true ? (
        <HeaderProfile />
      ) : (
        authForm === true ? (
          <>
            <FormAuth />
            <div>
              <small>
                Вы зарегистрированы? <p className="fw-bold" onClick={() => setAuthForm(!authForm)}>Регистрация</p>
              </small>
            </div>
          </>
        ) : (
          <>
            <FormRegister />
            <div>
              <small>
                Регистрация прошла успешно? <p className="fw-bold" onClick={() => setAuthForm(!authForm)}>Авторизация</p>
              </small>
            </div>
          </>
        )
      )}
    </Container>
  )
}

export default HeaderAuth
