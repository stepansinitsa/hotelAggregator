import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AccommodationsState {
  loading: boolean;
  offset: number;
  limit: number;
  name: string;
  list: AccommodationDetails[];
}

const initialState: AccommodationsState = {
  loading: false,
  offset: 0,
  limit: 5,
  name: "",
  list: [],
};

const accommodationsSlice = createSlice({
  name: "accommodations",
  initialState,
  reducers: {
    fetchAccommodations: (
      state,
      action: PayloadAction<Partial<AccommodationsState>>
    ) => {
      return { ...state, ...action.payload };
    },
    updateAccommodationsState: (
      state,
      action: PayloadAction<Partial<AccommodationsState>>
    ) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { fetchAccommodations, updateAccommodationsState } =
  accommodationsSlice.actions;

export default accommodationsSlice.reducer;