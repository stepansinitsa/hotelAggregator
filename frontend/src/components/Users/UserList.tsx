import iziToast from "izitoast";
import { useEffect, useState } from "react";
import useFetchData from "../../api/api-client";
import { useAppDispatch, useAppSelector } from "../../store/store-hooks";
import { setUsersState } from "../../store/users/usersSlice";
import LoaderMain from "../Loader/LoadingIndicator";
import UsersTable from "./UsersTable";

function UsersList() {
  const [error, setError] = useState<boolean>(false);
  const usersState = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();
  const { usersApi } = useFetchData();

  useEffect(() => {
    if (!usersState.loading) {
      dispatch(setUsersState({ loading: true }));
    }

    usersApi.search({
      limit: usersState.limit,
      offset: usersState.offset,
      email: usersState.email,
      name: usersState.name,
      contactPhone: usersState.contactPhone,
    })
      .then((result) => {
        if (result.data.length > 0) {
          dispatch(setUsersState({ list: result.data, loading: false }));
        } else {
          dispatch(setUsersState({ offset: 0, loading: false }));
        }
      })
      .catch((err) => {
        setError(true);
        iziToast.error({
          message: err?.response?.data?.message || "Ошибка при загрузке пользователей",
          position: "bottomCenter",
        });
      });

  }, [usersState.offset, usersState.email, usersState.name, usersState.contactPhone]);

  return (
    <>
      {usersState.loading ? (
        <LoaderMain />
      ) : error ? (
        <p className="text-center text-danger mt-3">Ошибка загрузки данных</p>
      ) : !usersState.list.length ? (
        <p className="text-center text-muted mt-3">Нет пользователей</p>
      ) : (
        <UsersTable list={usersState.list} />
      )}
    </>
  );
}

export default UsersList;