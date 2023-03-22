import { useContext } from "react";
import { eventType, MapContext } from "../providers/MapContext";
import { MarkerClustererF } from "@react-google-maps/api";

import { TrafficEvent } from "../providers/types";
import MarkerWrapper from "./MarkerWrapper";

export default function MarkersLayer() {
  const state = useContext(MapContext);
  const markers: TrafficEvent[] = state ? state.getFilteredMarkers() || [] : [];
  const options = {
    imagePath:
      "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
    minimumClusterSize: 3,
    maxZoom: 13,
    averageCenter: true
  };

  return (
    //had to put a void and empty function to the onClick property of cluster - otherwise library sends the clicks to all cluster's children.
    <MarkerClustererF options={options} onClick={() => {}}>
      {(clusterer) => (
        <>
          {markers.map((marker) => {
            return (
              <MarkerWrapper
                clusterer={clusterer}
                position={{
                  lat: marker.geography.coordinates[1],
                  lng: marker.geography.coordinates[0]
                }}
                title={marker.event_type}
                icon={eventType[marker.event_type]}
                key={marker.id}
                headline={marker.headline}
              />
            );
          })}
        </>
      )}
    </MarkerClustererF>
  );
}
