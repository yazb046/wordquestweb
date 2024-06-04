import React from "react";
import Container from "./pages/Main";
import AppRoutes from "./AppRoutes";

const App: React.FC = () => {
  return (
    <React.StrictMode>
      <AppRoutes />
    </React.StrictMode>
  );
};

export default App;
