// contain our containers

import React, { FC, useContext } from 'react';
import './MainNav.scss';
import { DockerContainers } from '../Container/DockerContainer';
import { Images } from '../Images/Images';
import { UserContext } from '../../UserContext';
import Loader from '../Loader/Loader';
//using a ternary based on booleans from useContext to switch the views

export const MainNav: FC = () => {
  const { showing, runningContainers } = useContext(UserContext);
  if (!runningContainers) {
    return <Loader />;
  }
  // if (showing) {
  //   return <Loader />;
  // }
  return (
    <div className="main-nav">
      <ul>{showing === 'Containers' ? <DockerContainers /> : <Images />}</ul>
    </div>
  );
};
