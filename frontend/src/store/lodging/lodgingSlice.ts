import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LodgingDetails } from "../../types/types.d";

interface LodgingState {
  offset: number;
  limit: number;
  titleSearch: string;
  loading: boolean;
  list: LodgingDetails[];
  current: LodgingDetails | null;
}

const initialState: LodgingState = {
  offset: 0,
  limit: 5,
  titleSearch: "",
  loading: false,
  list: [],
  current: null,
};

const lodgingSlice = createSlice({
  name: "lodging",
  initialState,
  reducers: {
    updateLodgingState: (state, action: PayloadAction<Partial<LodgingState>>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { updateLodgingState } = lodgingSlice.actions;

export default lodgingSlice.reducer;