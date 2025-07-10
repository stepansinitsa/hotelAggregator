import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserAccountData } from "../../types/types";

interface UserAccountState {
  loading: boolean;
  offset: number;
  limit: number;
  email: string;
  fullName: string;
  phone: string;
  list: UserAccountData[];
  refresh: boolean;
}

const initialState: UserAccountState = {
  loading: false,
  offset: 0,
  limit: 10,
  email: "",
  fullName: "",
  phone: "",
  list: [],
  refresh: true,
};

const userAccountSlice = createSlice({
  name: "userAccount",
  initialState,
  reducers: {
    fetchUserAccounts: (state) => {
      state.loading = true;
    },
    setUserAccounts: (
      state,
      action: PayloadAction<{ users: UserAccountData[]; offset: number; limit: number }>
    ) => {
      const { users, offset, limit } = action.payload;
      state.list = [...users];
      state.offset = offset;
      state.limit = limit;
      state.loading = false;
    },
    searchByEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
      state.offset = 0;
    },
    searchByName: (state, action: PayloadAction<string>) => {
      state.fullName = action.payload;
      state.offset = 0;
    },
    searchByPhone: (state, action: PayloadAction<string>) => {
      state.phone = action.payload;
      state.offset = 0;
    },
    triggerRefresh: (state) => {
      state.refresh = !state.refresh;
    },
  },
});

export const {
  fetchUserAccounts,
  setUserAccounts,
  searchByEmail,
  searchByName,
  searchByPhone,
  triggerRefresh,
} = userAccountSlice.actions;

export default userAccountSlice.reducer;