import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/security/LoginPage";
import Container from "./pages/Main";
import SignUpPage from "./pages/security/SignUpPage";
import PrivateRoute from "./auth/PrivateRoute";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<Container />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
      </Routes>
    </Router>
  );
}
