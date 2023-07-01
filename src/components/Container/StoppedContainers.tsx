import React, { FC, useContext, useState, useMemo } from 'react';
import { UserContext } from '../../UserContext';
import { StartCommands } from '../Button/Start';
import { DeleteCommands } from '../Button/Delete';
import { LogCommands } from '../Button/Logs';
import { Container } from '../../types';

export const StoppedContainers: FC = () => {
  const { stoppedContainers } = useContext(UserContext);
  const [stopInvoked, setStop] = useState(false);

  const handleStopInvoke = () => {
    if (!stopInvoked) setStop(true);
    else setStop(false);
  };

  let stopped;

  const StoppedContainer: React.FC<{ el: Container; index: number }> =
    React.memo(({ el, index }) => {
      return (
        <div className="container" key={index}>
          <div className="container-info">
            <div className="container-name">{el.Names}</div>
            <div className="subinfo">
              <p className="Imagename">Image: {el.Image}</p>
              <p className="Port">Port: {el.Ports}</p>
            </div>
          </div>

          <div className="cmdbutton">
            <StartCommands
              name={el.Names}
              cmdRoute={new URL('/container/start', window.location.href)}
              fetchMethod="post"
              onClick={handleStopInvoke}
            />
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
        </div>
      );
    });

  if (typeof stoppedContainers === 'string') {
    stopped = (
      <div>
        <p>You have no running containers</p>
      </div>
    );
  } else {
    stopped = useMemo(
      () =>
        stoppedContainers.map((el, index) => (
          <StoppedContainer
            el={el}
            key={`stoppedcontainer${index}`}
            index={index}
          />
        )),
      [stoppedContainers]
    );
  }

  return <div className="dockercontainer">{stopped}</div>;
};
