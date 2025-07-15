import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { removeToken, setToken } from '../../helpers/auth-storage.helpers';

interface AccountState {
  isAuthenticated: boolean;
  role: string;
  id: string | null;
  email: string | null;
}

const initialState: AccountState = {
  isAuthenticated: false,
  role: 'client',
  id: null,
  email: null,
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ id: string; role: string; email: string; token: string }>) => {
      const { id, role, email, token } = action.payload;
      state.isAuthenticated = true;
      state.id = id;
      state.role = role;
      state.email = email;
      setToken(token);
    },
    logout: (state) => {
      Object.assign(state, {
        isAuthenticated: false,
        role: 'client',
        id: null,
        email: null,
      });
      removeToken();
    },
  },
});

export const { login, logout } = accountSlice.actions;

export default accountSlice.reducer;