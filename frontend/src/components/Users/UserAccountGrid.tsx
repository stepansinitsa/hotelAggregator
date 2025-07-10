import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store-hooks";
import { fetchUserAccounts } from "../../store/user/accountSlice";
import { UserAccountData } from "../../types/types.d";
import LoadingIndicator from "../Loader/LoadingIndicator";
import UserAccountTable from "./UserAccountTable";

const UserAccountGrid = () => {
  const dispatch = useAppDispatch();
  const { loading, error, limit, offset, email, name, contactPhone } =
    useAppSelector((state) => state.userAccountData);

  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
    dispatch(fetchUserAccounts({ limit, offset, email, name, contactPhone }));
  }, [offset, email, name, contactPhone]);

  if (loading) return <LoadingIndicator />;
  if (error || hasError)
    return <p className="text-center text-danger">Ошибка загрузки пользователей</p>;

  return <UserAccountTable />;
};

export default UserAccountGrid;