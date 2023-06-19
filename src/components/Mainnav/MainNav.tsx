// contain our containers

import React, { FC, useContext } from 'react';
import './MainNav.scss';
import { DisplayRunning } from '../Container/ContainerDisplay';
import { Images } from '../Images/Images';
import { UserContext } from '../../UserContext';
import { SwitchViewToggle } from '../SwitchViewToggle/SwitchViewToggle';

//using a ternary based on booleans from useContext to switch the views

export const MainNav: FC = () => {
  const { showing } = useContext(UserContext);

  return (
    <div className="main-nav">
      <SwitchViewToggle />

      <ul>{showing === 'Containers' ? <DisplayRunning /> : <Images />}</ul>
    </div>
  );
};
