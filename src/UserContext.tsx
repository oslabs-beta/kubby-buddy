import React, { createContext, useState, ReactNode } from 'react';
import { Context, Container, Image } from './types';

export const UserContext = createContext<Context>({
  runningContainers: [],
  setRunningContainers: () => {},
  availableImages: [],
  setAvailableImages: () => {},
  showDockerContainers: false,
  setShowDockerContainers: () => {},
  showImages: false,
  setShowImages: () => {},
  statStream: [],
  setStatStream: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [runningContainers, setRunningContainers] = useState<Container[]>([]);
  const [availableImages, setAvailableImages] = useState<Image[]>([]);
  const [showDockerContainers, setShowDockerContainers] =
    useState<boolean>(true);
  const [showImages, setShowImages] = useState<boolean>(false);
  const [statStream, setStatStream] = useState<Container[]>([]);
  // const [showVolumes, setShowVolumes] = useState<Boolean>(true)

  const contextProps: Context = {
    runningContainers,
    setRunningContainers,
    availableImages,
    setAvailableImages,
    showDockerContainers,
    setShowDockerContainers,
    showImages,
    setShowImages,
    statStream,
    setStatStream,
  };
  return (
    <UserContext.Provider value={contextProps}>{children}</UserContext.Provider>
  );
};
