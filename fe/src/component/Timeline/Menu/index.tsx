import React from 'react';
import { useWindowWidth } from '../../../hooks/layout';
import mediaQuery from '../../../utils/mediaQuery'
import SideMenu from './SideMenu';
import TopMenu from './TopMenu';

const Menu = () => {
    const windowWidth = useWindowWidth();

    return (
        <nav>
            {windowWidth < mediaQuery.tablet ? 
                <SideMenu/>:
                <TopMenu />
            }
        </nav>
    );
};

export default Menu;