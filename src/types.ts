import React, { ReactNode } from "react";

export interface Context {
    children?: ReactNode;
    runningContainers: Container[];
    setRunningContainers: React.Dispatch<React.SetStateAction<Container[]>>
}

export interface Container {
    name: String;
    id: String;
    port: Number;
    volume?: Object;
}