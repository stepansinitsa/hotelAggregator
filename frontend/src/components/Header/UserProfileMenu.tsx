import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../store/store-hooks";
import LogoutButton from "./LogoutButton";

const UserProfileMenu = () => {
  const user = useAppSelector((state) => state.user);

  return (
    <div className="d-flex flex-column">
      <Link to={`/bookings?userId=${user.id}`} className="mb-2 text-decoration-none">
        <Button variant="primary">Мои бронирования</Button>
      </Link>
      <LogoutButton />
    </div>
  );
};

export default UserProfileMenu;