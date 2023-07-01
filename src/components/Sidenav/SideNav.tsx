// display system wide command menu
// contains Quickview component
/*

*/
//@ts-ignore
import React, { FC, useContext, useMemo } from 'react';
import './SideNav.scss';
// import { Quickview } from '../Quickview/Quickview';
import { GlobalCommands } from '../GlobalCommands/GlobalCommands';
import { UserContext } from '../../UserContext';
import favicon from '../../assets/favicon.png';
// import { Container } from '../../types';
// const favicon = require('../../assets/favicon.png');

export const SideNav: FC = () => {
  // const testimage = require('../../assests/test.png')
  const { setShowing } = useContext(UserContext);

  return (
    <div className="side-nav" data-testid="sidenav">
      <div className="favicon-holder">
        <img className="favicon" src={favicon} />
      </div>
      <ul>
        <li onClick={() => setShowing('Images')}>Images</li>
        <li onClick={() => setShowing('Containers')}>Containers</li>
      </ul>
      <GlobalCommands />
      {/* <Quickview /> */}
    </div>
  );
};
