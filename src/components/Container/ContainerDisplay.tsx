import React, { FC, useContext } from "react";
import { UserContext } from "../../UserContext";
import { StartButton } from "../Button/Start";
import { StopButton } from "../Button/Stop";
import { DeleteButton } from "../Button/Delete";
import { LogButton } from "../Button/Logs";
import { Graph } from "../Graph/Graph";

export const DisplayRunning: FC = () => {
  const { runningContainers } = useContext(UserContext);
  console.log("testtest====", runningContainers);

  return (
    <div className="dockercontainer">
      {runningContainers.map((el, index) => (
        <li className="list" key={index}>
          <div className="container-info">
            <p>
              <strong>Container: {el.Names}</strong>
            </p>
            <div className="subinfo">
              <p className="Imagename">Image: {el.Image}</p>
              <p className="Port">Port: {el.Ports}</p>
              <p className="State">State: {el.State}</p>
              <p className="Networks">Networks: {el.Networks}</p>
              <p className="CreatedAt">CreatedAt: {el.CreatedAt}</p>
              <p className="Status">Status: {el.Status}</p>
              <p className="Size">Size: {el.Size}</p>
              <p className="Command">Command: {el.Command}</p>
              <p className="ID">ID: {el.ID}</p>
              <p className="LocalVolumes">LocalVolumes: {el.LocalVolumes}</p>
              <p className="Mounts">Mounts: {el.Mounts}</p>
              <p className="Labels">Labels: {el.Labels}</p>
              <p className="volume">volume: {(el.volume as string) || "N/A"}</p>
            </div>
          </div>

          <div className="cmdbutton">
            <StartButton />
            <StopButton />
            <DeleteButton />
            <LogButton />
          </div>

          <div className="dropdown">
            <button>container</button>
            <button>volumes</button>
            <button>image</button>
            <button>stats</button>
          </div>

          <Graph />
        </li>
      ))}
    </div>
  );
};
