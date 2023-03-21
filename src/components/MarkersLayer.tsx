import { useContext } from "react";
import { MapContext } from "../providers/MapContext";
import Marker from "./Marker";

export default function MarkersLayer() {
  const state = useContext(MapContext);
  const markers = state ? state.markers : [];
  console.log("%cMarkersLayer.tsx line:6 markers", "color: #007acc;", markers);
  return (
    <>
      {markers.length ? (
        markers.map((marker) => (
          <Marker
            lat={marker.geography.coordinates[1]}
            lng={marker.geography.coordinates[0]}
            key={marker.id}
            text={marker.event_type}></Marker>
        ))
      ) : (
        <></>
      )}
    </>
  );
}
