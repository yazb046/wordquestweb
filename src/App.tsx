import React from "react";
import { Layout } from "antd";
import AppHeader from "./components/AppHeader";
import AppContent from "./components/AppContent";
import AppFooter from "./components/AppFooter";
import AppWordList from "./components/AppWordList";
import { StrictMode } from "react";

const App: React.FC = () => (
  <StrictMode>
    <Layout style={{ minHeight: "100vh" }}>
      <AppHeader />
      <Layout>
        <AppWordList />
        <Layout>
          <AppContent />
          <AppFooter />
        </Layout>
      </Layout>
    </Layout>
  </StrictMode>
);

export default App;
