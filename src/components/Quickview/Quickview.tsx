// display running containers as a list
// onclick take user to scroll position in main view
//@ts-ignore
import React, { FC, useContext, useEffect, useState } from 'react';
import { UserContext } from '../../UserContext';
import './Quickview.scss';
import { Container } from '../../types';

//will use ref and onclick in final version
const GoTo: FC = () => {
  return <button className="goto-button"> ➡ </button>;
};

export const Quickview: FC = () => {
  const { runningContainers } = useContext(UserContext);

  const [filteredRunningContainers, setFilteredRunningContainers] = useState<
    Container[]
  >([]);

  useEffect(() => {
    const filteredContainers = runningContainers.filter(
      (container) => container.State === 'running'
    );
    setFilteredRunningContainers(filteredContainers);
  }, [runningContainers]);

  // console.log(runningContainers);
  //display instances of running containers, just the name
  return (
    <div className="quickview-container">
      <h3 className="quickview-header">Running</h3>
      <ul className="quickview-list">
        {filteredRunningContainers.map((container, index) => {
          // if(container.State== "running"){
          return (
            <li key={index} className="quickview-item">
              {container.Names}
              <GoTo />
            </li>
          );
          // }
        })}
      </ul>
      <h3 className="quickview-header">Sleepy</h3>
      <ul className="quickview-list">
        {runningContainers
          .filter((container) => container.State === 'exited')
          .map((container, index) => (
            <li key={index} className="quickview-item">
              {container.Names}
              <GoTo />
            </li>
          ))}
      </ul>
    </div>
  );
};
