import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Booking from "./pages/Booking";
import ClientLogin from "./pages/ClientLogin";
import AdminLogin from "./pages/AdminLogin";
import MyAppointments from "./pages/MyAppointments";
import AdminLayout from "./components/AdminLayout/AdminLayout";
import AdminAppointments from "./pages/admin/AdminAppointments";
import AdminPrices from "./pages/admin/AdminPrices";
import AdminBarbers from "./pages/admin/AdminBarbers";
import AdminPortfolio from "./pages/admin/AdminPortfolio";
import { authStorage } from "./services/auth";

function AdminRoute() {
  return authStorage.getAdmin() ? <AdminLayout /> : <Navigate to="/admin/login" replace />;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/agendar" element={<Booking />} />
      <Route path="/login" element={<ClientLogin />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/meus-agendamentos" element={<MyAppointments />} />
      <Route path="/admin" element={<AdminRoute />}>
        <Route index element={<Navigate to="agendamentos" replace />} />
        <Route path="agendamentos" element={<AdminAppointments />} />
        <Route path="precos" element={<AdminPrices />} />
        <Route path="barbeiros" element={<AdminBarbers />} />
        <Route path="portfolio" element={<AdminPortfolio />} />
      </Route>
    </Routes>
  );
}
