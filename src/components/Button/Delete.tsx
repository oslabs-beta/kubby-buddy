// /prune-stopped-containers

import React from 'react';
import trash from '../../assets/trash.png';

import { CommandButtonProps } from "../../types";

interface DeleteCommandProp extends CommandButtonProps {}

const DeleteButton: React.FC<DeleteCommandProp> = ({
  name,
  cmdRoute,
  fetchMethod,
}) => {
  //helper
  const command = async () => {
    try {
      const URL = cmdRoute;
      const response = await fetch(URL, {
        method: fetchMethod,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: name }),

      });
      const data = await response.json();
      console.log('test---->:' + data);
    } catch (err) {
      console.error(err);
    };
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
