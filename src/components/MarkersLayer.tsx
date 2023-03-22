import { useContext } from "react";
import { eventType, MapContext } from "../providers/MapContext";
import { Marker, MarkerClusterer } from "@react-google-maps/api";

import { TrafficEvent } from "../providers/types";

export default function MarkersLayer() {
  const state = useContext(MapContext);
  const markers: TrafficEvent[] = state ? state.getFilteredMarkers() || [] : [];
  const options = {
    imagePath:
      "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
    minimumClusterSize: 3,
    maxZoom: 13
  };

  return (
    <MarkerClusterer options={options}>
      {(clusterer) => (
        <>
          {markers.map((marker) => (
            <Marker
              clusterer={clusterer}
              position={{
                lat: marker.geography.coordinates[1],
                lng: marker.geography.coordinates[0]
              }}
              title={marker.event_type}
              icon={eventType[marker.event_type]}
              key={marker.id}
            />
          ))}
        </>
      )}
    </MarkerClusterer>
  );
}
