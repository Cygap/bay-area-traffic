import axios from "axios";
import React, { useEffect } from "react";
import "./App.css";
import Map from "./components/MapComponent";

function App() {
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_511_BASE_URL}?api_key=${process.env.REACT_APP_511_API_KEY}&status=ACTIVE&limit=500`
      )
      .then((res) => {
        console.log("%cApp.tsx line:9 res", "color: #007acc;", res);
      });
  }, []);

  return (
    <div className="App">
      <Map />
    </div>
  );
}

export default App;
