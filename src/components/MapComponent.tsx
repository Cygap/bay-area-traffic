import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({
  text,
  lat,
  lng
}: {
  text: string;
  lat: number;
  lng: number;
}) => <div>{text}</div>;

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
          <AnyReactComponent
            lat={defaultProps.center.lat}
            lng={defaultProps.center.lng}
            text="My Marker"
          />
        </GoogleMapReact>
      ) : (
        <div>error</div>
      )}
    </div>
  );
}
