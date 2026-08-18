import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

import DashboardLayout from "./layouts/DashboardLayout";
import Overview from "./pages/Overview";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* LOGIN */}
        <Route path="/" element={<Login />} />

        {/* SIGN UP */}
        <Route path="/signup" element={<Signup />} />

        {/* EXISTING DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            <DashboardLayout>
              <Overview />
            </DashboardLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
