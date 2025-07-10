import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WebsocketState {
  isConnected: boolean;
}

const initialState: WebsocketState = {
  isConnected: false,
};

const websocketSlice = createSlice({
  name: "websocket",
  initialState,
  reducers: {
    connectToWebsocket: (state, action: PayloadAction<{ isConnected: boolean }>) => {
      state.isConnected = action.payload.isConnected;
    },
  },
});

export const { connectToWebsocket } = websocketSlice.actions;

export default websocketSlice.reducer;