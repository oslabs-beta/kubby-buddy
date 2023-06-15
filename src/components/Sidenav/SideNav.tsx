// display system wide command menu
// contains Quickview component
/*

*/
import React, { FC, useContext, useEffect } from 'react';
import './SideNav.scss';
import { Quickview } from '../Quickview/Quickview';
import { GlobalCommands } from '../GlobalCommands/GlobalCommands';
import { UserContext } from '../../UserContext';
// import photo from '../../assests/logo.png'
//container/all-active-containers

//SwitchViewToggle will sit above Sidenav
export const SideNav: FC = () => {
  // const testimage = require('../../assests/test.png')
  const { setRunningContainers, setAvailableImages } = useContext(UserContext);

  useEffect(() => {
    async function getRunningContainers() {
      try {
        const getURL = 'container/all-active-containers';
        const fetchResponse = await fetch(getURL);
        const data = await fetchResponse.json();

        setRunningContainers(data);
      } catch (error) {
        console.log(error);
      }
    }
    async function getAvailableImages() {
      try {
        const getURL = 'image/all-images';
        const fetchResponse = await fetch(getURL);
        const data = await fetchResponse.json();

        setAvailableImages(data);
      } catch (error) {
        console.log(error);
      }
    }
    getRunningContainers();
    getAvailableImages();
  }, []);

  return (
    <div className="side-nav">
      <GlobalCommands />
      <Quickview />
    </div>
  );
};
