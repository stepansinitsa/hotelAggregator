import { ListGroup } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useAuthentication } from "../../hooks/useAuthentication";
import { useAppSelector } from "../../store/store-hooks";

function NavigationMenu() {
  const role = useAppSelector((state) => state.user.role);
  const isAuthenticated = useAuthentication();

  return (
    <ListGroup variant="flush" className="shadow-sm rounded text-center">
      <ListGroup.Item action>
        <NavLink to="/" className="text-decoration-none text-secondary fw-semibold">
          Поиск жилья
        </NavLink>
      </ListGroup.Item>

      {isAuthenticated && (
        <ListGroup.Item action>
          <NavLink to="/requests" className="text-decoration-none text-secondary fw-semibold">
            Мои обращения
          </NavLink>
        </ListGroup.Item>
      )}

      {role === "admin" && (
        <ListGroup.Item action>
          <NavLink to="/all-lodgings" className="text-decoration-none text-secondary fw-semibold">
            Все объекты размещения
          </NavLink>
        </ListGroup.Item>
      )}

      {(role === "admin" || role === "manager") && (
        <ListGroup.Item action>
          <NavLink to="/users" className="text-decoration-none text-secondary fw-semibold">
            Пользователи
          </NavLink>
        </ListGroup.Item>
      )}
    </ListGroup>
  );
}

export default NavigationMenu;