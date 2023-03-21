import React from "react";
import "./App.css";
import Map from "./components/MapComponent";
import MapContextProvider from "./providers/MapContext";

function App() {
  return (
    <div className="App">
      <MapContextProvider>
        <Map />
      </MapContextProvider>
    </div>
  );
}

export default App;
