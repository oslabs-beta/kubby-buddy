// contain our containers

import React, { FC, useContext, useEffect } from 'react';
import './MainNav.scss';
import { DockerContainers } from '../Container/DockerContainer';
import { Images } from '../Images/Images';
import { UserContext } from '../../UserContext';
import Loader from '../Loader/Loader';
import { Container, Image, Volume, ImageAvgStats } from '../../types';
import { useQuery } from '@tanstack/react-query';

//using a ternary based on booleans from useContext to switch the views

export const MainNav: FC = () => {
  // const testimage = require('../../assests/test.png')
  const {
    setStoppedContainers,
    setRunningContainers,
    setAvailableImages,
    setShowing,
    setAvailableVolumes,
    setImageAverages,
    showing,
  } = useContext(UserContext);

  async function getInitialData() {
    try {
      const runningContainersURL = 'container/all-active-containers';
      const imagesURL = 'image/all-images';
      const volumesURL = 'volume/all-volumes';

      const initialDataResponse = await Promise.all([
        fetch(runningContainersURL),
        fetch(imagesURL),
        fetch(volumesURL),
      ]);
      const data = await Promise.all(
        initialDataResponse.map((res) => {
          if (!res.ok) {
            return console.error(res.json);
          }
          return res.json();
        })
      );

      const runningContainersResponse: Container[] = data[0];
      const imagesResponse: Image[] = data[1].images;
      const imageAveragesResponse: ImageAvgStats[] = data[1].averages;
      const volumesResponse: Volume[] = data[2];

      setRunningContainers(
        runningContainersResponse.filter(
          (container) => container.State !== 'exited'
        )
      );
      setStoppedContainers(
        runningContainersResponse.filter(
          (container) => container.State === 'exited'
        )
      );
      setAvailableImages(imagesResponse);
      setImageAverages(imageAveragesResponse);
      setAvailableVolumes(volumesResponse);
      // needs to return something otherwise react query will error in console
      return {
        runningContainers: [],
        stoppedContainers: [],
        availableImages: [],
        availableVolumes: [],
      };
    } catch (error) {
      console.error(error);
    }
  }

  const initialDataQuery = useQuery({
    queryKey: ['initialData'],
    queryFn: getInitialData,
  });

  useEffect(() => {
    if (initialDataQuery.isLoading) {
      setShowing('Loading');
    }
    if (initialDataQuery.isSuccess) {
      setShowing('Images');
    }
  }, [initialDataQuery.isLoading, initialDataQuery.isSuccess, setShowing]);

  let view;

  switch (showing) {
    case 'Containers':
      view = <DockerContainers />;
      break;
    case 'Images':
      view = <Images />;
      break;
    case 'Loading':
      view = <Loader />;
      break;
    default:
      view = null;
      break;
  }

  return (
    <div className="main-nav">
      <ul>{view}</ul>
    </div>
  );
};
