import { createSlice } from "@reduxjs/toolkit";

const initialState = { minTime: Date.now() - 1000 * 60 * 60 * 96 };

const timeSliderFilterSlice = createSlice({
  name: "time",
  initialState,
  reducers: {
    setMinTime(state, action: { type: string; payload: number }) {
      state.minTime = action.payload;
    }
  }
});

export const { setMinTime } = timeSliderFilterSlice.actions;

export default timeSliderFilterSlice.reducer;
