import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SocketState {
  isConnected: boolean;
}

const initialState: SocketState = {
  isConnected: false,
};

const socketSlice = createSlice({
  name: 'socketIO',
  initialState,
  reducers: {
    setConnectedStatus: (state, action: PayloadAction<{ isConnected: boolean }>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setConnectedStatus } = socketSlice.actions;

export default socketSlice.reducer;