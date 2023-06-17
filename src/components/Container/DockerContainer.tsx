import React, { FC, useContext, useEffect } from 'react';
import './Container.scss';
import { UserContext } from '../../UserContext';
import { DisplayRunning } from './ContainerDisplay';

export const DockerContainers: FC = () => {
  const { setRunningContainers } = useContext(UserContext);

  useEffect(() => {
    async function getRunningContainers() {
      try {
        const url = 'container/all-active-containers';
        const response = await fetch(url);
        const data = await response.json();
        setRunningContainers(data);
      } catch (err) {
        console.error(err);
      }
    }
    getRunningContainers();
  }, []);

  //pass down necessary props to buttons for their relevant fetch requests
  return <DisplayRunning />;
};
