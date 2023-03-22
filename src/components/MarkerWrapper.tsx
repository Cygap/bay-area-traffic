import { Marker, MarkerProps } from "@react-google-maps/api";
import { useState } from "react";

interface WrapperProps extends MarkerProps {
  headline: string | google.maps.MarkerLabel | undefined;
}

export default function MarkerWrapper(props: WrapperProps) {
  const [label, setLabel] = useState<
    string | google.maps.MarkerLabel | undefined
  >(undefined);
  const markerClickHandler = () => {
    label ? setLabel(undefined) : setLabel(props.headline);
    console.log(
      "%cMarkerWrapper.tsx line:13 label",
      "color: #007acc;",
      props.headline
    );
  };
  return <Marker {...props} onClick={markerClickHandler} label={label} />;
}
