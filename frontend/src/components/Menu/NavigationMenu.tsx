import { ListGroup } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuthentication";
import { useAppSelector } from "../../store/store-hooks";

function MenuMain() {
  const role = useAppSelector((state) => state.user.role);
  const isAuth = useAuth();

  return (
    <ListGroup variant="flush" className="shadow-sm rounded text-center">
      <ListGroup.Item action>
        <NavLink to="/" className={({ isActive }) => (isActive ? "fw-bold text-decoration-none text-primary" : "text-decoration-none text-secondary fw-semibold")}>
          Поиск отеля
        </NavLink>
      </ListGroup.Item>

      {isAuth && (
        <ListGroup.Item action>
          <NavLink to="/requests" className={({ isActive }) => (isActive ? "fw-bold text-decoration-none text-primary" : "text-decoration-none text-secondary fw-semibold")}>
            Обращения
          </NavLink>
        </ListGroup.Item>
      )}

      {role === "admin" && (
        <ListGroup.Item action>
          <NavLink to="/all-hotels" className={({ isActive }) => (isActive ? "fw-bold text-decoration-none text-primary" : "text-decoration-none text-secondary fw-semibold")}>
            Все отели
          </NavLink>
        </ListGroup.Item>
      )}

      {(role === "admin" || role === "manager") && (
        <ListGroup.Item action>
          <NavLink to="/users" className={({ isActive }) => (isActive ? "fw-bold text-decoration-none text-primary" : "text-decoration-none text-secondary fw-semibold")}>
            Аккаунты
          </NavLink>
        </ListGroup.Item>
      )}
    </ListGroup>
  );
}

export default MenuMain;