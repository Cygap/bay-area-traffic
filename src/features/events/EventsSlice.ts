import { createSlice, createSelector } from "@reduxjs/toolkit";
import axios from "axios";
import { AppDispatch, RootState } from "../../providers/store";
import { TrafficEvent } from "../../providers/types";

// const initialState = [] as TrafficEvent[];
const initialState: { loadingStatus: string; trafficEvents: TrafficEvent[] } = {
  loadingStatus: "idle",
  trafficEvents: []
};
const eventsSlice = createSlice({
  name: "trafficEvents",
  initialState,
  reducers: {
    addEvents(state, action: { type: string; payload: TrafficEvent[] }) {
      return {
        ...state,
        trafficEvents: state.trafficEvents.concat(action.payload)
      };
    },
    setLoadingStatus(state, action) {
      state.loadingStatus = action.payload;
    }
  }
});

export const loadTrafficEvents =
  (url: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoadingStatus("loading"));
      const res = await axios.get(url);
      console.log("%cEventsSlice.ts line:22 res", "color: #007acc;", res);
      let trafficEvents: TrafficEvent[] = res.data.events;
      dispatch(setLoadingStatus("idle"));
      if (res.data.pagination.next_url) {
        //For bigger data sets, that should be loaded in batches need to set-up some delay between requests, so as not to cause DOS on the server.
        //For this specific App this approach is not needed (there is limited amount of data), so everything could be loaded in one batch. Splitting
        //it just to showcase the possibility.
        await new Promise((resolve) => setTimeout(resolve, 200));
        console.log(
          "%cEventsSlice.ts line:30 called recursively",
          "color: #007acc;",
          `${process.env.REACT_APP_511_BASE_URL}${res.data.pagination.next_url}`
        );
        dispatch(
          loadTrafficEvents(
            `${process.env.REACT_APP_511_BASE_URL}${res.data.pagination.next_url}`
          )
        );
      }

      console.log(
        "%c traffic events loaded RTK",
        "color: #274E13;",
        trafficEvents
      );

      dispatch(addEvents(trafficEvents));
      dispatch(setLoadingStatus("done"));
    } catch (e) {
      if (e instanceof Error) {
        console.log(
          "%cMapContext.tsx line:55 e.message",
          "color: #CC0000;",
          e.message
        );
        dispatch(setLoadingStatus("error"));
      }
    }
  };

export const getFilteredMarkers = createSelector(
  (state: RootState) => state.events.trafficEvents,
  (state: RootState) => state.time.minTime,
  (state: RootState) => state.types,
  (trafficEvents, minTime, types) =>
    trafficEvents.filter(
      ({ updated, event_type }) =>
        minTime <= Date.parse(updated) && types[event_type]
    )
);

export const getLoadingStatus = createSelector(
  (state: RootState) => state.events,
  (events) => events.loadingStatus
);

export const { addEvents, setLoadingStatus } = eventsSlice.actions;

export default eventsSlice.reducer;
