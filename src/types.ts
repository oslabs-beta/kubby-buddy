import React, { ReactNode } from 'react';

export interface Context {
  children?: ReactNode;
  runningContainers: Container[];
  setRunningContainers: React.Dispatch<React.SetStateAction<Container[]>>;
  availableImages: Image[];
  setAvailableImages: React.Dispatch<React.SetStateAction<Image[]>>;
  showing: string;
  setShowing: React.Dispatch<React.SetStateAction<string>>;
}

export interface Container {
  Command: String;
  CreatedAt: String;
  ID: String;
  volume?: Object;
  Image: String;
  Labels: String[];
  LocalVolumes: String;
  Mounts: String;
  Names: string;
  Networks: String;
  Ports: String;
  RunningFor: String;
  Size: String;
  State: String;
  Status: String;
}

export interface Image {
  Conatiners: String;
  CreatedAt: String;
  CreatedSince: String;
  Digest: String;
  ID: String;
  Repository: String;
  SharedSize: String;
  Size: String;
  Tag: String;
  UniqueSize: String;
  VirtualSize: String;
}

export interface CommandButtonProps {
  name: string;
  cmdRoute: URL;
  fetchMethod: string;
}
