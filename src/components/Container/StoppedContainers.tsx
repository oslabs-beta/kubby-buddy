//@ts-ignore
import React, { FC, useContext, useState } from 'react';
import { UserContext } from '../../UserContext';
import { StartCommands } from '../Button/Start';
// import { StopCommands } from '../Button/Stop';
import { DeleteCommands } from '../Button/Delete';
import { LogCommands } from '../Button/Logs';
// import { Graph } from '../Graph/Graph';
// import LineGraph from '../LineGraph/Line';

export const StoppedContainers: FC = () => {
  const { stoppedContainers } = useContext(UserContext);
  const [stopInvoked, setStop] = useState(false);
  // const [change, setChange] = useState(false);
  // console.log('testtest====', runningContainers);

  const handleStopInvoke = () => {
    if (!stopInvoked) setStop(true);
    else setStop(false);
  };

  // const updateChange = () => {
  //   setChange((prevChange) => !prevChange);
  // };

  // useEffect(() => {
  //   // Call the updateChange function whenever statStream is updated
  //   updateChange();
  // }, [statStream]);

  let stopped;

  if (typeof stoppedContainers === 'string') {
    stopped = (
      <div>
        <p>You have no running containers</p>
      </div>
    );
  } else {
    stopped = stoppedContainers.map((el, index) => (
      <div className="container" key={index}>
        <div className="container-info">
          <div className="container-name">{el.Names}</div>
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
          {/* <StopCommands
              name={el.Names}
              cmdRoute={new URL('/container/stop', window.location.href)}
              fetchMethod="post"
              // onClick={handleStopInvoke}
            /> */}
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
            cmdRoute={
              new URL(`/container/log?name=${el.Names}`, window.location.href)
            }
            fetchMethod="get"
          />
        </div>

        {/* <div className="dropdown">
        <button>container</button>
        <button>volumes</button>
        <button>image</button>
        <button>stats</button>
      </div> */}
        {/* <div className="chartContainer">
            {statStream.length > 0 ? (
              <LineGraph
                className="bargraph"
                data={statStream[index]}
                change={change}
              />
            ) : (
              ''
            )}
          </div>
          <div className="chartContainer">
            {statStream.length > 0 ? (
              <Graph className="bargraph" data={statStream[index]} />
            ) : (
              ''
            )}
          </div> */}
      </div>
    ));
  }

  return <div className="dockercontainer">{stopped}</div>;
};
