//App types
export type EventGeography = {
  coordinates: number[];
  type: string;
  crs: {};
};

export type Event_Type =
  | "CONSTRUCTION"
  | "SPECIAL_EVENT"
  | "WEATHER_CONDITION"
  | "ROAD_CONDITION"
  | "INCIDENT";
export interface TrafficEvent {
  areas: {}[];
  created: string;
  event_subtypes: string[];
  event_type: Event_Type;

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

export interface FilterTypes {
  CONSTRUCTION: boolean;
  SPECIAL_EVENT: boolean;
  WEATHER_CONDITION: boolean;
  ROAD_CONDITION: boolean;
  INCIDENT: boolean;
  MIN_DATE: number;
}
