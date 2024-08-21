import React from 'react'

import { Layout } from 'antd'



const footerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    backgroundColor: 'red',
    flex: 1,
    marginRight: 48,
    width: '100%',

  };

const AppFooter: React.FC = () => {
    return(<Layout.Content className='footer-ant' style={footerStyle}>Footer</Layout.Content>)   
  }
  
  export default AppFooter