import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { listSlice } from "./listSlice";
import { createWrapper } from "next-redux-wrapper";
import { enrollmentSlice } from "./enrollmentSlice";

const makeStore = () =>
  configureStore({
    reducer: {
      [listSlice.name]: listSlice.reducer,
      [enrollmentSlice.name]: enrollmentSlice.reducer,
    },
    devTools: true,
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const wrapper = createWrapper<AppStore>(makeStore);