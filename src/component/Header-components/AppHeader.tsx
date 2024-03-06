import React from 'react'
import {Layout} from 'antd';

import logo from './logo.svg';
import LogIn from './Registration';

import   './Header-style.css';
import AvatarMenu from './Avatar';
import BurgerMenu from './Burger-menu';
  
 const AppHeader: React.FC = () => {
    return(
        <Layout.Header className='headerStyle'>
            <img src={logo}  className="Applogo" alt="logo" />
            <LogIn/>
            <AvatarMenu/>
            <BurgerMenu menuItems={['Home', 'About', 'Contacts']}/>
        </Layout.Header>
    )
}

export default AppHeader



