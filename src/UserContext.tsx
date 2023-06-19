import React, { createContext, useState, ReactNode } from 'react';
import { Context, Container, Image } from './types';

export const UserContext = createContext<Context>({
  runningContainers: [],
  setRunningContainers: () => {},
  availableImages: [],
  setAvailableImages: () => {},
  showing: '',
  setShowing: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [runningContainers, setRunningContainers] = useState<Container[]>([]);
  const [availableImages, setAvailableImages] = useState<Image[]>([]);
  const [showing, setShowing] = useState<string>('Containers');

  // const [showVolumes, setShowVolumes] = useState<Boolean>(true)

  const contextProps: Context = {
    runningContainers,
    setRunningContainers,
    availableImages,
    setAvailableImages,
    showing,
    setShowing,
  };
  return (
    <UserContext.Provider value={contextProps}>{children}</UserContext.Provider>
  );
};
