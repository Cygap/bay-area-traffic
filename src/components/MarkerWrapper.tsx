import { InfoWindow, Marker, MarkerProps } from "@react-google-maps/api";
import { useState } from "react";

//decided to keep this interface here and not with the rest of types to avoid @react-google-maps/api imports in types.ts.
//Need that typing to use additional headline prop inside the wrapper component.
interface WrapperProps extends MarkerProps {
  headline: string | undefined;
}
/**
 * Shows Marker and handles clicking on the Marker and on the InfoWindow close button.
 * @param props @type {WrapperProps} - getting standard @react-google-maps/api props plus an additional headline prop.
 * @returns {React.element} - @react-google-maps/api Marker with InfoWindow inside
 */
export default function MarkerWrapper(props: WrapperProps) {
  const [label, setLabel] = useState<string | undefined>(undefined);
  const divStyle = {
    background: `white`,
    border: `1px solid #ccc`,
    padding: 15
  };
  const markerClickHandler = () => {
    label ? setLabel(undefined) : setLabel(props.headline);
  };
  return (
    <Marker {...props} onClick={markerClickHandler} opacity={1}>
      {label && (
        <InfoWindow position={props.position} onCloseClick={markerClickHandler}>
          <div style={divStyle}>{label}</div>
        </InfoWindow>
      )}
    </Marker>
  );
}
