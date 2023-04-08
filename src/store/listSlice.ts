import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { AppState } from "./store";

export interface ListState {
  loading: boolean,
  data: any[],
  totalElements: number,
  page: number,
  rowsPerPage: number,
  keyword?: string,
  filters?: any,
  sort?: {
    sortField: string,
    sortType: string
  },
  lookups: any;
}

const initialState: ListState = {
  loading: false,
  data: [],
  totalElements: 0,
  page: 0,
  rowsPerPage: 5,
  lookups: {}
};

export const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    setLoadingState(state, action) {
      state.loading = action.payload;
    },
    setListState(state, action) {
      state.loading = action.payload.loading;
      state.data = action.payload.data ? action.payload.data : state.data;
      state.totalElements = action.payload.totalElements;
      state.keyword = action.payload.keyword;
      state.filters = action.payload.filters;
      state.sort = action.payload.sort;
      state.page = action.payload.page;
      state.rowsPerPage = action.payload.rowsPerPage;
    },
    addLookup(state, action){
      state.lookups = { ...state.lookups, ...action.payload};
    },
    [HYDRATE]: (state, action) => {
    return {
      ...state,
      ...action.payload,
    };
  }}
});

export const { setListState, addLookup, setLoadingState } = listSlice.actions;
export const selectListState = (state: AppState) => state.list;

export default listSlice.reducer;