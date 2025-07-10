import { useState } from "react";
import { Container } from "react-bootstrap";
import { useAuthentication } from "../../hooks/useAuthentication";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";
import UserProfileMenu from "./UserProfileMenu";

function AuthContainer() {
  const isAuthenticated = useAuthentication();
  const [isLoginMode, setIsLoginMode] = useState(true);

  return (
    <Container>
      {isAuthenticated ? (
        <UserProfileMenu />
      ) : isLoginMode ? (
        <>
          <LoginForm />
          <div>
            <small>
              Нет аккаунта?{" "}
              <span
                onClick={() => setIsLoginMode(false)}
                className="fw-bold text-primary"
                style={{ cursor: "pointer" }}
              >
                Зарегистрируйтесь
              </span>
            </small>
          </div>
        </>
      ) : (
        <>
          <RegistrationForm />
          <div>
            <small>
              Уже зарегистрированы?{" "}
              <span
                onClick={() => setIsLoginMode(true)}
                className="fw-bold text-primary"
                style={{ cursor: "pointer" }}
              >
                Войти
              </span>
            </small>
          </div>
        </>
      )}
    </Container>
  );
}

export default AuthContainer;