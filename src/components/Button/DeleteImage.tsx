// /prune-stopped-containers

import React, { useContext } from 'react';
import trash from '../../assets/trash.png';
import { UserContext } from '../../UserContext';

import { CommandButtonProps } from '../../types';

interface DeleteCommandProp extends CommandButtonProps {}

const DeleteImageButton: React.FC<DeleteCommandProp> = ({
  id,
  cmdRoute,
  fetchMethod,
}) => {
  //helper
  const { setAvailableImages, availableImages } = useContext(UserContext);

  const command = async () => {
    try {
      const URL = cmdRoute;
      const response = await fetch(URL, {
        method: fetchMethod,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id }),
      });
      const data = await response.json();
      console.log('test---->:' + data);
      if (response.status !== 500) {
        setAvailableImages(availableImages.filter((image) => image.ID !== id));
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

export const DeleteImageCommands: React.FC<DeleteCommandProp> = ({
  id,
  cmdRoute,
  fetchMethod,
}) => {
  return (
    <DeleteImageButton id={id} cmdRoute={cmdRoute} fetchMethod={fetchMethod} />
  );
};
