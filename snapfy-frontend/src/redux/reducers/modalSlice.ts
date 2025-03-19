import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface modalState {
  reviewModalV2: boolean;
  poolVersion: string;
  dashboardSearch: string;
}

const initialState: modalState = {
  reviewModalV2: false,
  poolVersion: "All Pools",
  dashboardSearch: "",
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setReviewModalV2: (state, action: PayloadAction<boolean>) => {
      state.reviewModalV2 = action.payload;
    },
    setPoolVersion: (state, action: PayloadAction<string>) => {
      state.poolVersion = action.payload;
    },
    setDashboardSearch: (state, action: PayloadAction<string>) => {
      state.dashboardSearch = action.payload;
    },
  },
});

export const { setReviewModalV2, setPoolVersion, setDashboardSearch } =
  modalSlice.actions;
const modalReducer = modalSlice.reducer;

export default modalReducer;
