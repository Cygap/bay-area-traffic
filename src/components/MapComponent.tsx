import GoogleMapReact from "google-map-react";
import MarkersLayer from "./MarkersLayer";

//default coordinates of the Bay Area
export default function Map() {
  const defaultProps = {
    center: {
      lat: 37.7339524,
      lng: -122.0414691
    },
    zoom: 10
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "100vh", width: "100%" }}>
      {process.env.REACT_APP_GOOGLEMAP_API_KEY ? (
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLEMAP_API_KEY }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}>
          <MarkersLayer />
        </GoogleMapReact>
      ) : (
        <div>error</div>
      )}
    </div>
  );
}
