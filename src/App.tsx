import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ParkingSpace from "./pages/ParkingSpace";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/parkingspace" element={<ParkingSpace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
