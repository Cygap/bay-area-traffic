export type EventGeography = {
  coordinates: number[];
  type: string;
  crs: {};
};

export interface TrafficEvent {
  areas: {}[];
  created: string;
  event_subtypes: string[];
  event_type:
    | "CONSTRUCTION"
    | "SPECIAL_EVENT"
    | "WEATHER_CONDITION"
    | "ROAD_CONDITION"
    | "INCIDENT";
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

export interface MapState {
  center: {};
  zoom: number;
}

export interface MapContextType {
  markers: TrafficEvent[];
  mapState: MapState;
  setMapState: Function;
  eventsLoadingStatus: string;
  setEventsLoadingStatus: Function;
}
