import { ListGroup } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuthentication";
import { useAppSelector } from "../../store/store-hooks";

function MenuMain() {
  const role = useAppSelector(state => state.user.role);
  const isAuth = useAuth();

  return (
    <ListGroup variant="flush" className="shadow-sm rounded text-center">
      <ListGroup.Item action>
        <NavLink className="text-decoration-none text-secondary fw-semibold" to="/">
          Поиск отеля
        </NavLink>
      </ListGroup.Item>
      {isAuth === true &&
        <ListGroup.Item action>
          <NavLink className="text-decoration-none text-secondary fw-semibold" to="/requests">
            Обращения
          </NavLink>
        </ListGroup.Item>
      }
      {role === 'admin' &&
        <ListGroup.Item action>
          <NavLink className="text-decoration-none text-secondary fw-semibold" to="/all-hotels">
            Все отели
          </NavLink>
        </ListGroup.Item>
      }
      {(role === 'admin' || role === 'manager') &&
        <ListGroup.Item action>
          <NavLink className="text-decoration-none text-secondary fw-semibold" to="/users">
            Аккаунты
          </NavLink>
        </ListGroup.Item>
      }
    </ListGroup>
  )
}

export default MenuMain
