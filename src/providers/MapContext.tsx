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

// const initialValues = {
//   markers: null,
//   center: {
//     lat: 37.7339524,
//     lng: -122.0414691
//   },
//   zoom: 10
// };

export const MapContext = createContext<MapContextType | null>(null);

export default function MapContextProvider({
  children
}: React.PropsWithChildren) {
  const [markers, setMarkers] = useState<TrafficEvent[]>([] as TrafficEvent[]);

  const [mapState, setMapState] = useState({ center: {}, zoom: 10 });

  const [filters, setFilters] = useState({
    CONSTRUCTION: true,
    SPECIAL_EVENT: true,
    WEATHER_CONDITION: true,
    ROAD_CONDITION: true,
    INCIDENT: true
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

  useEffect(() => {
    (async () => {
      setEventsLoadingStatus(LoadingStatus.loading);
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_511_BASE_URL}?api_key=${process.env.REACT_APP_511_API_KEY}&status=ACTIVE&limit=500`
        );

        setMarkers(res.data.events);
        setMapState({
          center: {
            lat: 37.7339524,
            lng: -122.0414691
          },
          zoom: 10
        });
        setEventsLoadingStatus(LoadingStatus.done);
      } catch (e) {
        if (e instanceof Error) {
          console.log(
            "%cMapContext.tsx line:55 e.message",
            "color: #007acc;",
            e.message
          );
          setEventsLoadingStatus(LoadingStatus.error);
        }
      }
    })();
  }, []);

  const getFilteredMarkers = () => {
    const result = markers.filter(({ event_type }) => filters[event_type]);
    return result ? result : null;
  };

  const contextValue = {
    markers: markers ?? [],
    mapState: mapState ?? { center: {}, zoom: 10 },
    getFilteredMarkers,
    filters,
    setFilters,
    setMapState,
    eventsLoadingStatus,
    setEventsLoadingStatus
  };

  return (
    <MapContext.Provider value={contextValue}>{children}</MapContext.Provider>
  );
}
