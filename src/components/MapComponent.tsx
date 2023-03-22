import MarkersLayer from "./MarkersLayer";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import EventFilters from "./EventFilters";
import ReactDOM from "react-dom";

const containerStyle = {
  width: "100%",
  height: "100vh"
};
const controlButtonDiv = document.createElement("div");
const handleOnLoad = (map: google.maps.Map) => {
  map &&
    map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(
      controlButtonDiv
    );
};
//default coordinates of the Bay Area
export default function Map() {
  const defaultProps = {
    center: {
      lat: 37.7339524,
      lng: -122.0414691
    },
    zoom: 10
  };

  const filterStyles = {
    backgroundColor: "rgb(245, 245, 245)",
    opacity: "0.7"
  };
  //  google.maps.ControlPosition.TOP_CENTER
  return (
    // Important! Always set the container height explicitly
    <>
      {process.env.REACT_APP_GOOGLEMAP_API_KEY ? (
        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLEMAP_API_KEY}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={defaultProps.center}
            zoom={defaultProps.zoom}
            onLoad={(map) => handleOnLoad(map)}>
            {ReactDOM.createPortal(
              <div style={filterStyles}>
                <EventFilters />
              </div>,
              controlButtonDiv
            )}

            <MarkersLayer />
          </GoogleMap>
        </LoadScript>
      ) : (
        <div>error</div>
      )}
    </>
  );
}
