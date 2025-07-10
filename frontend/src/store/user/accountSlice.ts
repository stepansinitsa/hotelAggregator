import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { removeAuthToken, setAuthToken } from "../../helpers/auth-storage.helpers";

interface AccountState {
  token: string | null;
  role: string;
  isAuthenticated: boolean;
  id: string | null;
}

const initialState: AccountState = {
  token: null,
  role: "guest",
  isAuthenticated: false,
  id: null,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{
        token: string;
        role: string;
        id: string;
      }>
    ) => {
      state.token = action.payload.token;
      state.role = action.payload.role;
      state.isAuthenticated = true;
      state.id = action.payload.id;

      setAuthToken(action.payload.token);
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.id = null;
      state.role = "guest";

      removeAuthToken();
    },
  },
});

export const { login, logout } = accountSlice.actions;

export default accountSlice.reducer;