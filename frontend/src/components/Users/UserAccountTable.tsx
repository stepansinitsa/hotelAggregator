import iziToast from "izitoast";
import {
  Button,
  Container,
  Dropdown,
  Pagination,
  Table,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/store-hooks";
import { userAccountApi } from "../../api/api-client";
import { changeRole } from "../../store/user-account/user-accountSlice";
import { useNavigate } from "react-router-dom";

const UserAccountTable = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { list, limit, offset } = useAppSelector((state) => state.userAccount);

  const handleNextPage = (direction: "prev" | "next") => {
    if (direction === "next") {
      dispatch(changeRole({ offset: offset + limit }));
    } else {
      dispatch(changeRole({ offset: Math.max(0, offset - limit) }));
    }
  };

  const handleChangeRole = async (userId: string, newRole: string) => {
    try {
      await userAccountApi.updateUserRole({ userId, role: newRole });
      iziToast.success({
        message: `Роль обновлена на "${newRole}"`,
        position: "bottomCenter",
      });
      navigate(0); // reload
    } catch (err) {
      iziToast.error({
        message: err.message || "Ошибка при обновлении роли",
        position: "bottomCenter",
      });
    }
  };

  return (
    <Container>
      <Table striped bordered hover responsive className="mt-2">
        <thead>
          <tr>
            <th>Имя</th>
            <th>Телефон</th>
            <th>Email</th>
            <th>Роль</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {list.map((user) => (
            <tr key={user._id}>
              <td>{user.fullName}</td>
              <td>{user.phone || "Не указан"}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <Link to={`/bookings?userId=${user._id}`} className="text-decoration-none me-2">
                  <Button variant="outline-success" size="sm">
                    Бронирования
                  </Button>
                </Link>
                <DropdownButton title="Роль" variant="outline-secondary" size="sm">
                  <Dropdown.Item onClick={() => handleChangeRole(user._id, "client")}>
                    Клиент
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleChangeRole(user._id, "manager")}>
                    Менеджер
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleChangeRole(user._id, "admin")}>
                    Администратор
                  </Dropdown.Item>
                </DropdownButton>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination className="mt-3 justify-content-center">
        {offset > 0 && (
          <Pagination.Item onClick={() => handleNextPage("prev")}>
            Назад
          </Pagination.Item>
        )}
        {list.length >= limit && (
          <Pagination.Item onClick={() => handleNextPage("next")}>
            Следующая
          </Pagination.Item>
        )}
      </Pagination>
    </Container>
  );
};

export default UserAccountTable;