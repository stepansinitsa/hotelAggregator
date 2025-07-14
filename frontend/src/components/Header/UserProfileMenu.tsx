import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../store/store-hooks";
import ButtonLogout from "./LogoutButton";

function HeaderProfile() {
  const userId = useAppSelector(state => state.user.id);

  return (
    <div className="d-flex flex-column">
      <Link to={`/reservations?id=${userId}`} className="mb-1 text-decoration-none">
        <Button variant="primary" >
          Мои бронирования
        </Button>
      </Link>
      <ButtonLogout />
    </div>
  )
}

export default HeaderProfile;
