import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../store/store-hooks";
import ButtonLogout from "./LogoutButton";

function HeaderProfile() {
  const userId = useAppSelector((state) => state.user.id);

  return (
    <div className="d-flex flex-column gap-2">
      <Link to={`/bookings?userId=${userId}`} className="text-decoration-none">
        <Button variant="outline-primary">Мои бронирования</Button>
      </Link>
      <ButtonLogout />
    </div>
  );
}

export default HeaderProfile;