import { useAppSelector } from "../store/store-hooks";

export const useAuthentication = (): boolean => {
  const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);

  return isAuthenticated;
};