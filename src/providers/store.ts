import { configureStore } from "@reduxjs/toolkit";

import typeReducer from "../features/filters/TypeFiltersSlice";
import timeReducer from "../features/filters/TimeSliderSlice";

const store = configureStore({
  reducer: {
    types: typeReducer,
    time: timeReducer
  }
});

export default store;
