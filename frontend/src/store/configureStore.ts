import { configureStore } from "@reduxjs/toolkit";
import accountSlice from "./user/accountSlice";
import lodgingSlice from "./lodging/lodgingSlice";
import accommodationsSlice from "./accommodations/accommodationsSlice";


const store = configureStore({
  reducer: {
    account: accountSlice,
    lodging: lodgingSlice,
    accommodations: accommodationsSlice,

  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;