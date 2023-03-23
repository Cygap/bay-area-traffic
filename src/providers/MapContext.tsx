import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { MapContextType, TrafficEvent } from "./types";

import CONSTRUCTION from "../assets/construction-roller.svg";
import ROAD_CONDITION from "../assets/blocker.svg";
import SPECIAL_EVENT from "../assets/ferris-wheel.svg";
import WEATHER_CONDITION from "../assets/weather.svg";
import INCIDENT from "../assets/sports-car-crash.svg";

/**
 * object with constants to populate and display event_type filters
 */
export const eventType = {
  INCIDENT,
  CONSTRUCTION,
  SPECIAL_EVENT,
  WEATHER_CONDITION,
  ROAD_CONDITION
};

/** Constants to display TimeSlider */
export const START_TIME = Date.now() - 1000 * 60 * 60 * 1;
export const END_TIME = Date.now();

//Decided to go with React's context instead of RTK - the only part of the state that changes after loading the data is filters object.
//And that one in a trivial manner. RTK would be an "overkill" for this App. Potentially, might refactor state to RTK to showcase
//the possibility in a separate branch later. Keeping It Simple for now...
export const MapContext = createContext<MapContextType | null>(null);
/**
 * Provides the state to the app's components
 * @param props @type {React.PropsWithChildren} - destructured children prop is used to pass the context
 * @returns {React.element} - context provider
 */
export default function MapContextProvider({
  children
}: React.PropsWithChildren) {
  const [markers, setMarkers] = useState<TrafficEvent[]>([] as TrafficEvent[]);
  const [startTime, setStartTime] = useState(START_TIME);

  useEffect(() => {
    const min = Math.min(...markers.map(({ updated }) => Date.parse(updated)));
    if (min !== Infinity) {
      setStartTime(min);
    }
    console.log(
      "%cMapContext.tsx line:45 startTime",
      "color: #007acc;",
      new Date(startTime),
      markers,
      min
    );
  }, [markers]);
  const [filters, setFilters] = useState({
    CONSTRUCTION: true,
    SPECIAL_EVENT: true,
    WEATHER_CONDITION: true,
    ROAD_CONDITION: true,
    INCIDENT: true,
    MIN_DATE: startTime
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

  const loadTrafficEvents = async (url: string) => {
    setEventsLoadingStatus(LoadingStatus.loading);

    try {
      const res = await axios.get(url);

      let trafficEvents = res.data.events;
      setEventsLoadingStatus(LoadingStatus.idle);

      if (res.data.pagination.next_url) {
        //For bigger data sets, that should be loaded in batches need to set-up some delay between requests, so as not to cause DOS on the server.
        //For this specific App this approach is not needed (there is limited amount of data), so everything could be loaded in one batch. Splitting
        //it just to showcase the possibility.
        await new Promise((resolve) => setTimeout(resolve, 200));
        const additionalEvents = await loadTrafficEvents(
          `${process.env.REACT_APP_511_BASE_URL}${res.data.pagination.next_url}`
        );

        trafficEvents = trafficEvents.concat(additionalEvents);
      }

      setEventsLoadingStatus(LoadingStatus.done);
      console.log("%c traffic events loaded", "color: #274E13;");
      (() => {
        const min = Math.min(
          ...markers.map(({ updated }) => Date.parse(updated))
        );
        if (min !== Infinity) {
          setStartTime(min);
        }
        console.log(
          "%cMapContext.tsx line:45 startTime",
          "color: #007acc;",
          new Date(startTime),
          markers,
          min
        );
      })();
      return trafficEvents;
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
    //loading all traffic data - unfortunately API provides only active events for the moment, so there are only around 50 events.
    //Had to set-up low pagination threshold in URL to simulate loading of a bigger amout of data recursively by separate batches.
    //On large amount of data code refactoring might be needed to allow user to interact with the filters and Markers,
    //while the data is still loading but we already have some data to display. However practice could be questionable, stake holder
    //should specifically state that we shall allow user to work with incomplete data.
    (async () =>
      setMarkers(
        await loadTrafficEvents(
          `${process.env.REACT_APP_511_BASE_URL}/traffic/events?api_key=${process.env.REACT_APP_511_API_KEY}&limit=30&offset=0`
        )
      ))();
    //For this simple app start loading data only once... No need to put dependencies
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * This "getter" function selects the Markers complying to the state of filters. It is provided to the components to display.
   * @returns {TrafficEvent[]} - an array of filtered traffic event objects to display in the components or null, if the filter returns undefined.
   */
  const getFilteredMarkers = () => {
    const result = markers.filter(
      ({ event_type, updated }) =>
        filters[event_type] && filters.MIN_DATE <= Date.parse(updated)
    );
    return result ? result : null;
  };

  const contextValue = {
    getFilteredMarkers,
    filters,
    setFilters,
    eventsLoadingStatus,
    startTime
  };

  return (
    <MapContext.Provider value={contextValue}>{children}</MapContext.Provider>
  );
}
