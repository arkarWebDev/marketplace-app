import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isProcessing: false,
};

export const loaderSlice = createSlice({
  name: "loader",
  initialState,
  reducers: {
    setLoader: (state, action) => {
      state.isProcessing = action.payload;
    },
  },
});

export const { setLoader } = loaderSlice.actions;
export default loaderSlice.reducer;
