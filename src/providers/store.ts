import { configureStore } from "@reduxjs/toolkit";
import typeReducer from "../features/filters/TypeFiltersSlice";
import timeReducer from "../features/timeslider/TimeSliderSlice";
import eventReducer from "../features/events/EventsSlice";

const store = configureStore({
  reducer: {
    types: typeReducer,
    time: timeReducer,
    events: eventReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
