import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Booking from './pages/Booking';
import MyAppointments from './pages/MyAppointments';

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/appointments" element={<MyAppointments />} />
      </Routes>
    </Router>
  );
}
