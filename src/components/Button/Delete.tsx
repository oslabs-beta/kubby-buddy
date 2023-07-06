// /prune-stopped-containers

import React, { useContext } from 'react';
import trash from '../../assets/trash.png';
import { UserContext } from '../../UserContext';

import { CommandButtonProps } from '../../types';

interface DeleteCommandProp extends CommandButtonProps {}

const DeleteButton: React.FC<DeleteCommandProp> = ({
  name,
  cmdRoute,
  fetchMethod,
}) => {
  //helper
  const { setStoppedContainers, stoppedContainers } = useContext(UserContext);

  const command = async () => {
    try {
      const URL = cmdRoute;
      const response = await fetch(URL, {
        method: fetchMethod,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: name }),
      });
      const data = await response.json();

      if (response.ok) {
        setStoppedContainers(
          stoppedContainers.filter((container) => container.Names !== name)
        );
      } else {
        throw new Error(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <button
      style={{ backgroundImage: `url(${trash})` }}
      onClick={command}
    ></button>
  );
};

export const DeleteCommands: React.FC<DeleteCommandProp> = ({
  name,
  cmdRoute,
  fetchMethod,
}) => {
  return (
    <DeleteButton name={name} cmdRoute={cmdRoute} fetchMethod={fetchMethod} />
  );
};
