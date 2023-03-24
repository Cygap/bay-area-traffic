import { createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../providers/store";
import { Event_Type } from "../../providers/types";

const initialState = {
  CONSTRUCTION: true,
  SPECIAL_EVENT: true,
  WEATHER_CONDITION: true,
  ROAD_CONDITION: true,
  INCIDENT: true
};

const typeFiltersSlice = createSlice({
  name: "type",
  initialState,
  reducers: {
    toggleStatus(state, action: { type: string; payload: Event_Type }) {
      state[action.payload] = !state[action.payload];
    }
  }
});

/**
 * selector to get possible types of event in filter
 */
export const getFilters = createSelector(
  (state: RootState) => state.types,
  (types) => types
);

export const { toggleStatus } = typeFiltersSlice.actions;
export default typeFiltersSlice.reducer;
