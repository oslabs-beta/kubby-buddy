import React, { ReactNode } from 'react';

export interface Context {
  children?: ReactNode;
  runningContainers: Container[];
  setRunningContainers: React.Dispatch<React.SetStateAction<Container[]>>;
  stoppedContainers: Container[];
  setStoppedContainers: React.Dispatch<React.SetStateAction<Container[]>>;
  availableImages: Image[];
  setAvailableImages: React.Dispatch<React.SetStateAction<Image[]>>;
  showing: string;
  setShowing: React.Dispatch<React.SetStateAction<string>>;
  statStream: Container[];
  setStatStream: React.Dispatch<React.SetStateAction<Container[]>>;
  availableVolumes: Volume[];
  setAvailableVolumes: React.Dispatch<React.SetStateAction<Volume[]>>;
  // imageAverages: ImageAvgStats[];
  // setImageAverages: React.Dispatch<React.SetStateAction<ImageAvgStats[]>>;
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

export interface ImageAvgStats {
  mem_per: string;
  cpu_per: string;
}

export interface Image {
  Containers: string;
  CreatedAt: string;
  CreatedSince: string;
  Digest: string;
  ID: string;
  Repository: string;
  SharedSize: string;
  Size: string;
  Tag: string;
  UniqueSize: string;
  VirtualSize: string;
}
export interface Volume {
  Availability: string;
  Driver: string;
  Group: string;
  Labels: string;
  Links: string;
  Mountpoint: string;
  Name: string;
  Scope: string;
  Size: string;
  Status: string;
}
export interface CommandButtonProps {
  name?: string;
  id?: string;
  cmdRoute: URL;
  fetchMethod: string;
}

export interface GraphProps {
  // id: number
  // BlockIO?: string;
  // CPUPerc?: string;
  // Container?: string;
  // ID?: string;
  // MemPerc?: string;
  // MemUsage?: string;
  // Name?: string;
  // NetIO?: string;
  // PIDs?: string;
  [key: string]: any;
}

export type Parser = (net: string) => string[];
