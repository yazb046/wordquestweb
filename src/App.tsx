import React from 'react';
import { Layout } from 'antd';

import './index.css';


import AppHeader from './component/Header-components/AppHeader';
import AppContent from './component/AppContent';
import AppFooter from './component/AppFooter';
import AppWordList from './component/AppWordList';
import { StrictMode } from 'react';




const App: React.FC = () => (
  <StrictMode>
<Layout style={{ minHeight: '100vh' }}>
    <AppHeader/>
    <Layout>
      <AppWordList />
      <Layout >
        <AppContent/>
        <AppFooter />
      </Layout>
    </Layout>
  </Layout>
  </StrictMode>
  
);

export default App;
