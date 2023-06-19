import React, { FC, useContext, useState } from 'react';
import { UserContext } from '../../UserContext';
import { StartCommands } from '../Button/Start';
import { StopCommands } from '../Button/Stop';
import { DeleteCommands } from '../Button/Delete';
import { LogCommands } from '../Button/Logs';
import { Graph } from '../Graph/Graph';

export const DisplayRunning: FC = () => {
  const { runningContainers, statStream } = useContext(UserContext);
  console.log('containerdisplay', statStream);
  const [stopInvoked, setStop] = useState(false);
  console.log('testtest====', runningContainers);

  const handleStopInvoke = () => {
    if (!stopInvoked) setStop(true);
    else setStop(false);
  };

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
              {/* <p className="State">State: {el.State}</p>
              <p className="Networks">Networks: {el.Networks}</p>
              <p className="CreatedAt">CreatedAt: {el.CreatedAt}</p>
              <p className="Status">Status: {el.Status}</p>
              <p className="Size">Size: {el.Size}</p>
              <p className="Command">Command: {el.Command}</p>
              <p className="ID">ID: {el.ID}</p>
              <p className="LocalVolumes">LocalVolumes: {el.LocalVolumes}</p>
              <p className="Mounts">Mounts: {el.Mounts}</p>
              <p className="Labels">Labels: {el.Labels}</p>
              <p className="volume">volume: {(el.volume as string) || "N/A"}</p> */}
            </div>
          </div>

          <div className="cmdbutton">
            <StartCommands
              name={el.Names}
              cmdRoute={new URL('/container/start', window.location.href)}
              fetchMethod="post"
              onClick={handleStopInvoke}
            />
            {/* <StopCommands name={el.Name} /> */}
            <StopCommands
              name={el.Names}
              cmdRoute={new URL('/container/stop', window.location.href)}
              fetchMethod="post"
              // onClick={handleStopInvoke}
            />
            {/* {stopInvoked && (
                <DeleteCommands
                 name={el.Names}
                 cmdRoute={new URL("/container/remove-specific-container", window.location.href)}
                 fetchMethod='delete'
                />

            )} */}
            <DeleteCommands
              name={el.Names}
              cmdRoute={
                new URL(
                  '/container/remove-specific-container',
                  window.location.href
                )
              }
              fetchMethod="delete"
            />
            <LogCommands
              name={el.Names}
              cmdRoute={new URL('/container/log', window.location.href)}
              fetchMethod="get"
            />
          </div>

          {/* <div className="dropdown">
            <button>container</button>
            <button>volumes</button>
            <button>image</button>
            <button>stats</button>
          </div> */}

          <Graph />
        </li>
      ))}
    </div>
  );
};
