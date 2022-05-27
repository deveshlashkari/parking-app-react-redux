import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import ParkingSpace from "./components/pages/ParkingSpace";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/parkingspace" element={<ParkingSpace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
