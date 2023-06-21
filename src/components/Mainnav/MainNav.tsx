// contain our containers

import React, { FC, useContext } from 'react';
import './MainNav.scss';
import { DockerContainers } from '../Container/DockerContainer';
import { Images } from '../Images/Images';
import { UserContext } from '../../UserContext';

//using a ternary based on booleans from useContext to switch the views

export const MainNav: FC = () => {
  const { showing } = useContext(UserContext);

  return (
    <div className="main-nav">
      <ul>{showing === 'Containers' ? <DockerContainers /> : <Images />}</ul>
    </div>
  );
};
