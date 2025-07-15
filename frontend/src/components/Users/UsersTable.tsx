import iziToast from "izitoast";
import { Button, Container, Dropdown, DropdownButton, Pagination, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import useFetchData from "../../api/api-client";
import { useAppDispatch, useAppSelector } from "../../store/store-hooks";
import { setUsersState } from "../../store/users/usersSlice";
import { UserPageData } from "../../types/types.d";

interface UsersTableProps {
  list: UserPageData[];
}

function UsersTable({ list }: UsersTableProps) {
  const dispatch = useAppDispatch();
  const usersState = useAppSelector((state) => state.users);
  const { usersApi } = useFetchData();

  const handlePageChange = (direction: string) => {
    try {
      if (direction === "plus") {
        dispatch(setUsersState({ offset: usersState.offset + usersState.limit }));
      } else if (direction === "minus") {
        dispatch(setUsersState({ offset: Math.max(0, usersState.offset - usersState.limit) }));
      }
    } catch (error) {
      console.error("Ошибка при переходе между страницами:", error);
    }
  };

  const changeUserRole = async (userId: string, newRole: string) => {
    try {
      await usersApi.updateRole(userId, newRole);
      iziToast.success({
        message: `Роль пользователя обновлена на "${newRole}"`,
        position: "bottomCenter",
      });
      dispatch(setUsersState({ render: !usersState.render }));
    } catch (err: any) {
      iziToast.error({
        message: typeof err.data.message === "string"
          ? err.data.message
          : err.data.message[0],
        position: "bottomCenter",
      });
    }
  };

  return (
    <Container>
      <Table striped bordered hover responsive className="shadow-sm rounded text-center">
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
              <td>{user.name}</td>
              <td>{user.contactPhone || "-"}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <Link to={`/bookings?userId=${user._id}`} className="text-decoration-none me-2">
                  <Button variant="outline-secondary" size="sm" className="mb-1">
                    Бронирования
                  </Button>
                </Link>
                <DropdownButton title="Сменить роль" variant="outline-primary" size="sm">
                  <Dropdown.Item onClick={() => changeUserRole(user._id, "client")}>
                    Клиент
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => changeUserRole(user._id, "manager")}>
                    Менеджер
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => changeUserRole(user._id, "admin")}>
                    Администратор
                  </Dropdown.Item>
                </DropdownButton>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination className="justify-content-center mt-3">
        {usersState.offset > 0 && (
          <Pagination.Item onClick={() => handlePageChange("minus")}>
            Назад
          </Pagination.Item>
        )}

        {list.length >= usersState.limit && (
          <Pagination.Item onClick={() => handlePageChange("plus")}>
            Вперёд
          </Pagination.Item>
        )}
      </Pagination>
    </Container>
  );
}

export default UsersTable;