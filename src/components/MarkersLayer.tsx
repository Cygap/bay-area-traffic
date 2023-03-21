import { useContext } from "react";
import { MapContext } from "../providers/MapContext";
import { Marker } from "@react-google-maps/api";

const AnyReactComponent = ({
  text
}: {
  text: string;

  lat: number;
  lng: number;
}) => <div style={{ width: "25px" }}>{text}</div>;
/*lat={37.7339524}
        lng={-122.0414691}*/
export default function MarkersLayer() {
  const state = useContext(MapContext);
  const markers = state ? state.markers : [];

  return (
    <>
      <AnyReactComponent lat={37.7339524} lng={-122.0414691} text="My Marker" />
      {markers.length ? (
        markers.map((marker) => (
          <Marker
            position={{
              lat: marker.geography.coordinates[1],
              lng: marker.geography.coordinates[0]
            }}
            key={marker.id}
            title={marker.event_type}
            label={marker.event_type}
          />
        ))
      ) : (
        <></>
      )}
    </>
  );
}
