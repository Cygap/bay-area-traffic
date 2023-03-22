import { InfoWindow, Marker, MarkerProps } from "@react-google-maps/api";
import { useState } from "react";

interface WrapperProps extends MarkerProps {
  headline: string | undefined;
}

export default function MarkerWrapper(props: WrapperProps) {
  const [label, setLabel] = useState<string | undefined>(undefined);
  const divStyle = {
    background: `white`,
    border: `1px solid #ccc`,
    padding: 15
  };
  const markerClickHandler = () => {
    label ? setLabel(undefined) : setLabel(props.headline);
    console.log(
      "%cMarkerWrapper.tsx line:13 label",
      "color: #007acc;",
      props.headline
    );
  };
  return (
    <Marker {...props} onClick={markerClickHandler}>
      {label && (
        <InfoWindow position={props.position} onCloseClick={markerClickHandler}>
          <div style={divStyle}>{label}</div>
        </InfoWindow>
      )}
    </Marker>
  );
}
