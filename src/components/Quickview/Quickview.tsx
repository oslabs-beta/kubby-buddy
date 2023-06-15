// display running containers as a list
// onclick take user to scroll position in main view
import React, { FC, useContext } from "react";
import { UserContext } from "../../UserContext";
import "./Quickview.scss";

//will use ref and onclick in final version
const GoTo: FC = () => {
  return <button className="goto-button"> ➡ </button>;
};

export const Quickview: FC = () => {
  const { runningContainers } = useContext(UserContext);
  console.log(runningContainers);
  //display instances of running containers, just the name
  return (
    <div className="quickview-container">
      <h3 className="quickview-header">Running</h3>
      <ul className="quickview-list">
        {runningContainers.map((container) => {
          return (
            <li className="quickview-item">
              {container.Names}
              <GoTo />
            </li>
          );
        })}
      </ul>
      <h3 className="quickview-header">Sleepy</h3>
    </div>
  );
};
