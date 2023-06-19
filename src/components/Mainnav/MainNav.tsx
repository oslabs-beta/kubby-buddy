// contain our containers

import React, { FC, useContext } from 'react';
import './MainNav.scss';
import { DockerContainers } from '../Container/DockerContainer';
import { Images } from '../Images/Images';
import { UserContext } from '../../UserContext';

//using a ternary based on booleans from useContext to switch the views

export const MainNav: FC = () => {
  const { showDockerContainers, showImages } = useContext(UserContext);

  return (
    <div className="main-nav">
      <ul>
        <iframe
          className="grafana"
          src="http://localhost:3001/d-solo/c6d98103-49a2-4a71-a199-144325115d9f/new-dashboard?orgId=1&from=1687188879695&to=1687189779695&panelId=1"
        ></iframe>
        {showDockerContainers && !showImages ? (
          <DockerContainers />
        ) : (
          <Images />
        )}
      </ul>
    </div>
  );
};
