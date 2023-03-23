import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { MapContextType, TrafficEvent } from "./types";

import CONSTRUCTION from "../assets/construction-roller.svg";
import ROAD_CONDITION from "../assets/blocker.svg";
import SPECIAL_EVENT from "../assets/ferris-wheel.svg";
import WEATHER_CONDITION from "../assets/weather.svg";
import INCIDENT from "../assets/sports-car-crash.svg";

export const eventType = {
  INCIDENT,
  CONSTRUCTION,
  SPECIAL_EVENT,
  WEATHER_CONDITION,
  ROAD_CONDITION
};

export const START_TIME = Date.now() - 1000 * 60 * 60 * 1;
export const END_TIME = Date.now();

export const MapContext = createContext<MapContextType | null>(null);

export default function MapContextProvider({
  children
}: React.PropsWithChildren) {
  const [markers, setMarkers] = useState<TrafficEvent[]>([] as TrafficEvent[]);

  const [filters, setFilters] = useState({
    CONSTRUCTION: true,
    SPECIAL_EVENT: true,
    WEATHER_CONDITION: true,
    ROAD_CONDITION: true,
    INCIDENT: true,
    MIN_DATE: Date.now() - 1000 * 60 * 60 * 96
  });

  enum LoadingStatus {
    loading = "loading",
    done = "done",
    error = "error",
    idle = "idle"
  }
  const [eventsLoadingStatus, setEventsLoadingStatus] = useState(
    LoadingStatus.idle
  );

  const loadTrafficEvents = async () => {
    setEventsLoadingStatus(LoadingStatus.loading);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_511_BASE_URL}?api_key=${process.env.REACT_APP_511_API_KEY}&status=ACTIVE&limit=500`
      );

      setMarkers(res.data.events);

      setEventsLoadingStatus(LoadingStatus.done);
      console.log("%c traffic events loaded", "color: #274E13;", res);
    } catch (e) {
      if (e instanceof Error) {
        console.log(
          "%cMapContext.tsx line:55 e.message",
          "color: #CC0000;",
          e.message
        );
        setEventsLoadingStatus(LoadingStatus.error);
      }
    }
  };
  useEffect(() => {
    loadTrafficEvents();
    //For this simple app loading data only once... No need to put dependencies
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getFilteredMarkers = () => {
    const result = markers.filter(
      ({ event_type, updated }) =>
        filters[event_type] && filters.MIN_DATE <= Date.parse(updated)
    );
    return result ? result : null;
  };

  const contextValue = {
    markers: markers ?? [], //exposing also initial set of event markers for potential further uses (like adding event or deleting event)
    getFilteredMarkers,
    filters,
    setFilters,
    eventsLoadingStatus
  };

  return (
    <MapContext.Provider value={contextValue}>{children}</MapContext.Provider>
  );
}
