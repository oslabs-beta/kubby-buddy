import React, { FC, useContext, useMemo } from 'react';
import './Volumes.scss';
import { UserContext } from '../../UserContext';
// import { CreateCommands } from '../../components/Button/Create';
import { DeleteVolumeCommands } from '../Button/DeleteVolume';
import { CreateVolumeCommands } from '../Button/CreateVolume';
import { Volume } from '../../types';

interface VolumeWithStats extends Volume {
  Stats?: Record<string, string>;
}

export const Volumes: FC = () => {
  const { availableVolumes } = useContext(UserContext);

  let volumes;

  const VolumeContainer: React.FC<{ el: VolumeWithStats; index: number }> =
    React.memo(({ el, index }) => {
      const renderStatusOrStats = el.Stats ? (
        <>
          <p>Image: {el.Stats.Image}</p>
          <p>Local Volumes: {el.Stats.LocalVolumes}</p>
          <p>Names: {el.Stats.Names}</p>
          <p>Ports: {el.Stats.Ports}</p>
        </>
      ) : null;
      return (
        <li className="listImage" key={index}>
          <div className="image-info">
            <p className="image-title">{el.Name}</p>
            <div className="image-subinfo"></div>
            <div className="image-subinfo">
              <p>Mountpoint: {el.Mountpoint}</p>
            </div>
            <div className="image-subinfo">
              <p>Size: {el.Size}</p>
              <p>Scope: {el.Scope}</p>
              {renderStatusOrStats}
            </div>
            <div className="image-subinfo"></div>
          </div>
          <div className="cmdbutton">
            <DeleteVolumeCommands
              id={el.Name}
              cmdRoute={new URL('/volume/delete-volume', window.location.href)}
              fetchMethod="delete"
            />
          </div>
        </li>
      );
      56;
    });

  volumes = useMemo(
    () =>
      availableVolumes.map((el, index) => (
        <VolumeContainer el={el} index={index} key={`volume${index}`} />
      )),
    [availableVolumes]
  );

  return (
    <div className="imagescontainer">
      <div className="createVolume">
        <CreateVolumeCommands
          cmdRoute={new URL('/volume/create-volume', window.location.href)}
          fetchMethod={'post'}
        />
      </div>
      {volumes}
    </div>
  );
};
