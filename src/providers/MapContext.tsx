import axios from "axios";
import { createContext, useEffect, useState } from "react";

// const initialValues = {
//   markers: null,
//   center: {
//     lat: 37.7339524,
//     lng: -122.0414691
//   },
//   zoom: 10
// };

type EventGeography = {
  coordinates: number[];
  type: string;
  crs: {};
};

interface TrafficEvent {
  areas: {}[];
  created: string;
  event_subtypes: string[];
  event_type: string;
  geography: EventGeography;
  headline: string;
  id: string;
  jurisdiction_url: string;
  roads: {}[];
  severity: string;
  status: "ACTIVE" | "ARCHIVED";
  updated: string;
  url: string;
}

interface MapState {
  center: {};
  zoom: number;
}

interface MapContextType {
  markers: TrafficEvent[];
  mapState: MapState;
  setMapState: Function;
  eventsLoadingStatus: string;
  setEventsLoadingStatus: Function;
}

export const MapContext = createContext<MapContextType | null>(null);

export default function MapContextProvider({
  children
}: React.PropsWithChildren) {
  const [markers, setMarkers] = useState<TrafficEvent[]>([] as TrafficEvent[]);

  const [mapState, setMapState] = useState({ center: {}, zoom: 10 });

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
        console.log("%cApp.tsx line:9 res", "color: #007acc;", res);
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

  const contextValue = {
    markers: markers ?? [],
    mapState: mapState ?? { center: {}, zoom: 10 },

    setMapState,
    eventsLoadingStatus,
    setEventsLoadingStatus
  };

  return (
    <MapContext.Provider value={contextValue}>{children}</MapContext.Provider>
  );
}
