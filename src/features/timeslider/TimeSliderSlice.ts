import { createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../providers/store";
/** Constants to display TimeSlider */
const START_TIME = Date.now() - 1000 * 60 * 60 * 1;
const END_TIME = Date.now();
const initialState = {
  values: [START_TIME],
  update: [START_TIME, END_TIME],
  domain: [START_TIME, END_TIME]
};

const timeSliderFilterSlice = createSlice({
  name: "time",
  initialState,
  reducers: {
    setMinTime(state, action: { type: string; payload: number }) {
      state.values[0] = action.payload;
    },
    setUpdate(state, action: { type: string; payload: number }) {
      state.update[0] = action.payload;
    },
    initStartTime(state, action: { type: string; payload: number }) {
      state.values[0] = state.update[0] = state.domain[0] = action.payload;
      console.log(
        "%cTimeSliderSlice.ts line:24 new Date(action.payload)",
        "color: #007acc;",
        new Date(action.payload)
      );
    }
  }
});

export const getSliderState = createSelector(
  (state: RootState) => state.time,
  (time) => time
);

export const { setMinTime, setUpdate, initStartTime } =
  timeSliderFilterSlice.actions;

export default timeSliderFilterSlice.reducer;
