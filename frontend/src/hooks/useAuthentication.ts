import { useAppSelector } from "../store/store-hooks";

export const useAuth = (): boolean => {
  const isAuth = useAppSelector((state) => state.user.isAuthenticated);

  return isAuth;
};