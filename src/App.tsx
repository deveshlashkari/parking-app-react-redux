import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SlotProvider } from "./context/SlotContext";
import Home from "./pages/Home";
import ParkingSpace from "./pages/ParkingSpace";

function App() {
  return (
    <BrowserRouter>
      <SlotProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/parkingspace" element={<ParkingSpace />} />
        </Routes>
      </SlotProvider>
    </BrowserRouter>
  );
}

export default App;
