import { useState } from "react";
import { Container } from "react-bootstrap";
import { useAuth } from "../../hooks/useAuthentication";
import FormAuth from "./LoginForm";
import FormRegister from "./RegistrationForm";
import HeaderProfile from "./UserProfileMenu";

function HeaderAuth() {
  const isAuth = useAuth();
  const [isLoginView, setLoginView] = useState(true);

  return (
    <Container>
      {isAuth ? (
        <HeaderProfile />
      ) : isLoginView ? (
        <>
          <FormAuth />
          <div className="mt-2 text-center">
            <small>
              Нужна регистрация?{" "}
              <p className="fw-bold d-inline cursor-pointer" onClick={() => setLoginView(false)}>
                Регистрация
              </p>
            </small>
          </div>
        </>
      ) : (
        <>
          <FormRegister />
          <div className="mt-2 text-center">
            <small>
              Уже зарегистрированы?{" "}
              <p className="fw-bold d-inline cursor-pointer" onClick={() => setLoginView(true)}>
                Авторизация
              </p>
            </small>
          </div>
        </>
      )}
    </Container>
  );
}

export default HeaderAuth;