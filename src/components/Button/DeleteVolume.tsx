// /prune-stopped-containers

import React, { useContext } from 'react';
import trash from '../../assets/trash.png';
import { UserContext } from '../../UserContext';

import { CommandButtonProps } from '../../types';

interface DeleteCommandProp extends CommandButtonProps {}

const DeleteVolumeButton: React.FC<DeleteCommandProp> = ({
  id,
  cmdRoute,
  fetchMethod,
}) => {
  //helper
  const { setAvailableVolumes, availableVolumes } = useContext(UserContext);

  const command = async () => {
    try {
      const URL = cmdRoute;
      const response = await fetch(URL, {
        method: fetchMethod,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: id }),
      });
      const data = await response.json();
      console.log('test---->:' + data);
      if (response.ok) {
        setAvailableVolumes(
          availableVolumes.filter((volume) => volume.Name !== id)
        );
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

export const DeleteVolumeCommands: React.FC<DeleteCommandProp> = ({
  id,
  cmdRoute,
  fetchMethod,
}) => {
  return (
    <DeleteVolumeButton id={id} cmdRoute={cmdRoute} fetchMethod={fetchMethod} />
  );
};
