// @ts-ignore
import React, { createContext, useState, ReactNode } from 'react';
import { Context, Container, Image, Volume } from './types';

export const UserContext = createContext<Context>({
  runningContainers: [],
  setRunningContainers: () => {},
  stoppedContainers: [],
  setStoppedContainers: () => {},
  availableImages: [],
  setAvailableImages: () => {},
  availableVolumes: [],
  setAvailableVolumes: () => {},
  statStream: [],
  setStatStream: () => {},
  showing: '',
  setShowing: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [runningContainers, setRunningContainers] = useState<Container[]>([]);
  const [stoppedContainers, setStoppedContainers] = useState<Container[]>([]);
  const [availableImages, setAvailableImages] = useState<Image[]>([]);
  const [availableVolumes, setAvailableVolumes] = useState<Volume[]>([]);
  const [statStream, setStatStream] = useState<Container[]>([]);
  const [showing, setShowing] = useState<string>('Images');

  const contextProps: Context = {
    runningContainers,
    setRunningContainers,
    stoppedContainers,
    setStoppedContainers,
    availableImages,
    setAvailableImages,
    statStream,
    setStatStream,
    showing,
    setShowing,
    availableVolumes,
    setAvailableVolumes,
  };

  return (
    <UserContext.Provider value={contextProps}>{children}</UserContext.Provider>
  );
};
