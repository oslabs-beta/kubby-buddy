// display system wide command menu
// contains Quickview component
/*

*/
import React, { FC, useContext, useEffect } from 'react';
import './SideNav.scss';
// import { Quickview } from '../Quickview/Quickview';
import { GlobalCommands } from '../GlobalCommands/GlobalCommands';
import { UserContext } from '../../UserContext';
import favicon from '../../assets/favicon.png';
import { Container } from '../../types';

export const SideNav: FC = () => {
  // const testimage = require('../../assests/test.png')
  const {
    setStoppedContainers,
    setRunningContainers,
    setAvailableImages,
    setShowing,
    setAvailableVolumes,
    setImageAverages,
  } = useContext(UserContext);

  useEffect(() => {
    // INITIAL LOAD
    async function getRunningContainers() {
      try {
        const getURL = 'container/all-active-containers';
        const fetchResponse = await fetch(getURL);
        const data: Container[] = await fetchResponse.json();

        setRunningContainers(
          data.filter((container) => container.State !== 'exited')
        );
        setStoppedContainers(
          data.filter((container) => container.State === 'exited')
        );
      } catch (error) {
        console.log(error);
      }
    }
    async function getAvailableImages() {
      try {
        const getURL = 'image/all-images';
        const fetchResponse = await fetch(getURL);
        const data = await fetchResponse.json();
        // console.log('frontend averages', data);
        setAvailableImages(data.images);
        setImageAverages(data.averages);
      } catch (error) {
        setAvailableImages([]);
        console.log(error);
      }
    }
    async function getAvailableVolumes() {
      try {
        const getURL = 'volume/all-volumes';
        const fetchResponse = await fetch(getURL);
        const data = await fetchResponse.json();

        setAvailableVolumes(data);
      } catch (error) {
        console.log(error);
      }
    }
    getAvailableVolumes();
    getRunningContainers();
    getAvailableImages();
  }, []);

  return (
    <div className="side-nav">
      <div className="favicon-holder">
        <img className="favicon" src={favicon} />
      </div>
      <ul>
        <li>Dashboard</li>
        <li onClick={() => setShowing('Images')}>Images</li>
        <li onClick={() => setShowing('Containers')}>Containers</li>
      </ul>
      <GlobalCommands />
      {/* <Quickview /> */}
    </div>
  );
};
