import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface modalState {
  reviewModalV2: boolean;
}

const initialState: modalState = {
  reviewModalV2: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setReviewModalV2: (state, action: PayloadAction<boolean>) => {
      state.reviewModalV2 = action.payload;
    },
  },
});

export const { setReviewModalV2 } = modalSlice.actions;
const modalReducer = modalSlice.reducer;

export default modalReducer;
