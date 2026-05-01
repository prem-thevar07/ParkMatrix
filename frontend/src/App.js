import { BrowserRouter, Routes, Route } from "react-router-dom"

import Auth from "./pages/Auth"
import Home from "./pages/Home"
import VehicleForm from "./pages/VehicleForm"
import ScanPage from "./pages/ScanPage"
import ParkingStatus from "./pages/ParkingDashboard"
import MyVehicles from "./pages/MyVehicles"

function App() {

  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Auth />} />
        <Route path="/home" element={<Home />} />
        <Route path="/form" element={<VehicleForm />} />
        <Route path="/scan" element={<ScanPage />} />
        <Route path="/parking-status" element={<ParkingStatus />} />
        <Route path="/directory" element={<MyVehicles />} />
      </Routes>

    </BrowserRouter>
  )
}

export default App