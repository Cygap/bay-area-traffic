import { createSlice, createSelector } from "@reduxjs/toolkit";
import axios from "axios";

import { AppDispatch, RootState } from "../../providers/store";
import { TrafficEvent } from "../../providers/types";

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
      let trafficEvents: TrafficEvent[] = res.data.events;

      if (res.data.pagination.next_url) {
        dispatch(setLoadingStatus("idle"));
        //Bigger data sets should be loaded in batches. Need to set-up some delay between requests, so as not to cause DOS on the server.
        //For this specific App this approach is not needed (there is limited amount of data), so everything could be loaded in one batch. Splitting
        //it just to showcase the possibility.
        await new Promise((resolve) => setTimeout(resolve, 200));

        dispatch(
          loadTrafficEvents(
            `${process.env.REACT_APP_511_BASE_URL}${res.data.pagination.next_url}`
          )
        );
      } else {
        dispatch(setLoadingStatus("done"));
      }

      dispatch(addEvents(trafficEvents));
      console.log("%c traffic events loaded events at RTK", "color: #274E13;");
    } catch (e) {
      if (e instanceof Error) {
        console.log(
          "%cError while fetching data",
          "color: #CC0000;",
          e.message
        );
        dispatch(setLoadingStatus("error"));
      }
    }
  };

/**
 * Selector to get the oldest update time in events
 */
export const getMinEventsUpdateTime = createSelector(
  (state: RootState) => state.events.trafficEvents,
  (trafficEvents) =>
    Math.min(...trafficEvents.map(({ updated }) => Date.parse(updated)))
);

/**
 * selector to apply filters
 */
export const getFilteredMarkers = createSelector(
  (state: RootState) => state.events.trafficEvents,
  (state: RootState) => state.time.values[0],
  (state: RootState) => state.types,
  (trafficEvents, minTime, types) =>
    trafficEvents.filter(
      ({ updated, event_type }) =>
        minTime <= Date.parse(updated) && types[event_type]
    )
);

/**
 * selector for loading status of traffic events
 */
export const getLoadingStatus = createSelector(
  (state: RootState) => state.events,
  (events) => events.loadingStatus
);

export const { addEvents, setLoadingStatus } = eventsSlice.actions;

export default eventsSlice.reducer;
