import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserPageData } from '../../types/types.d';

interface UsersState {
  loading: boolean;
  offset: number;
  limit: number;
  email: string;
  name: string;
  contactPhone: string;
  list: UserPageData[];
  render: boolean;
}

const initialState: UsersState = {
  loading: false,
  offset: 0,
  limit: 10,
  email: '',
  name: '',
  contactPhone: '',
  list: [],
  render: true,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsersState: (state, action: PayloadAction<Partial<UsersState>>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setUsersState } = usersSlice.actions;

export default usersSlice.reducer;