import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../store/store-hooks";
import { setUsersState } from "../../store/users/usersSlice";
import UsersList from "./UserList";
import UsersSearchForm from "./UserSearchingForm";

function UsersMain() {
  const dispatch = useAppDispatch();
  const usersState = useAppSelector((state) => state.users);

  useEffect(() => {
    if (
      usersState.offset !== 0 ||
      usersState.email ||
      usersState.name ||
      usersState.contactPhone
    ) {
      dispatch(setUsersState({ offset: 0, email: "", name: "", contactPhone: "" }));
    }
  }, []);

  return (
    <Container className="bg-white rounded shadow-sm p-3 mb-4">
      <h3 className="fs-5 fw-semibold">Пользователи</h3>
      <UsersSearchForm />
      <UsersList />
    </Container>
  );
}

export default UsersMain;