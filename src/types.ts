import React, { ReactNode } from "react";

export interface Context {
    children?: ReactNode;
    runningContainers: Container[];
    setRunningContainers: React.Dispatch<React.SetStateAction<Container[]>>
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
    Names: String;
    Networks: String;
    Ports: String;
    RunningFor:String;
    Size:String;
    State:String;
    Status:String;
    

}