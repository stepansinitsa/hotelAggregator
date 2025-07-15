import iziToast from "izitoast";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/store-hooks";
import { logout } from "../../store/user/userSlice";

function ButtonLogout() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    iziToast.info({
      message: "Вы вышли из системы",
      position: "bottomCenter",
    });
    navigate("/");
  };

  return (
    <Button variant="outline-danger" onClick={handleLogout}>
      Выйти
    </Button>
  );
}

export default ButtonLogout;