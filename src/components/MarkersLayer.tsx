import { useContext } from "react";
import { MapContext } from "../providers/MapContext";
import { Marker } from "@react-google-maps/api";
import CONSTRUCTION from "../assets/construction-roller.svg";
import ROAD_CONDITION from "../assets/blocker.svg";
import SPECIAL_EVENT from "../assets/ferris-wheel.svg";
import WEATHER_CONDITION from "../assets/weather.svg";
import INCIDENT from "../assets/sports-car-crash.svg";
import { TrafficEvent } from "../providers/types";

export const eventType = {
  CONSTRUCTION,
  SPECIAL_EVENT,
  WEATHER_CONDITION,
  ROAD_CONDITION,
  INCIDENT
};
export default function MarkersLayer() {
  const state = useContext(MapContext);
  const markers: TrafficEvent[] = state ? state.getFilteredMarkers() || [] : [];

  return (
    <>
      {markers.length ? (
        markers.map((marker) => {
          return (
            <Marker
              position={{
                lat: marker.geography.coordinates[1],
                lng: marker.geography.coordinates[0]
              }}
              key={marker.id}
              title={marker.event_type}
              icon={eventType[marker.event_type]}
            />
          );
        })
      ) : (
        <></>
      )}
    </>
  );
}
