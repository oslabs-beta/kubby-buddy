import React, { FC } from 'react';
import './GlobalCommands.scss';
import { CommandButtonProps } from '../../types';

const CommandButton: FC<CommandButtonProps> = ({
  name,
  cmdRoute,
  fetchMethod,
}) => {
  async function command() {
    try {
      const getURL = cmdRoute;
      const fetchResponse = await fetch(getURL, {
        method: fetchMethod,
      });
      const data = await fetchResponse.json();
      console.log(data);
      console.log(cmdRoute);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="button-container">
      <button className="commandButton" onClick={command}>
        {name}
      </button>
      <div className="prunetooltip">docker container prune --force</div>
    </div>
  );
};

export const GlobalCommands: FC = () => {
  return (
    <CommandButton
      name="Prune"
      cmdRoute={
        new URL('/container/prune-stopped-containers', window.location.href)
      }
      fetchMethod="delete"
    />
  );
};
