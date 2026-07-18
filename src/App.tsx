import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PublicLayout from "./components/PublicLayout";
import Home from "./pages/public/Home";
import About from "./pages/public/About";
import Services from "./pages/public/Services";
import Contact from "./pages/public/Contact";
import Login from "./pages/Login";
import Dashboard from "./pages/dashboard";
import Portal from "./pages/portal";
import ProtectedRoute from "./components/protectedroute";
import PFCalculator from "./pages/public/PFCalculator";
import Employees from "./pages/employee";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public site — wrapped in PublicLayout */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/calculators/pf" element={<PFCalculator />} />
        </Route>

        {/* Login — standalone, no public layout */}
        <Route path="/login" element={<Login />} />
        <Route
  path="/employees"
  element={
    <ProtectedRoute allowedRoles={["ADMIN"]}>
      <Employees />
    </ProtectedRoute>
  }
/>
        {/* Private — behind auth */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "EMPLOYEE"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/portal"
          element={
            <ProtectedRoute allowedRoles={["CLIENT"]}>
              <Portal />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;