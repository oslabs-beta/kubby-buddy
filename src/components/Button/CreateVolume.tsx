import React, { useContext, useRef, useState } from 'react';
import create from '../../assets/add-document.png';
import * as Popover from '@radix-ui/react-popover';

import './CreatePopover.scss';
import { Cross2Icon, CheckIcon } from '@radix-ui/react-icons';
import { CommandButtonProps } from '../../types';
import { UserContext } from '../../UserContext';

interface CreateCommandProp extends CommandButtonProps {}

const CreateVolumeButton: React.FC<CreateCommandProp> = ({
  cmdRoute,
  fetchMethod,
}) => {
  const { setAvailableVolumes } = useContext(UserContext);
  const volumeName = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<undefined | string>(undefined);

  const command = async () => {
    try {
      const URL = cmdRoute;
      const response = await fetch(URL, {
        method: fetchMethod,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: volumeName.current?.value,
        }),
      });
      const data = await response.json();

      setStatus('Creation Successful!');
      const volumesURL = 'volume/all-volumes';
      //refetches volumes now that new volume has been created
      const getVolumes = await fetch(volumesURL);
      const volumesData = await getVolumes.json();
      setAvailableVolumes(volumesData);

      if (!response.ok) throw new Error(data);
    } catch (err) {
      setStatus(err instanceof Error ? err.message : String(err));
    }
  };

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button style={{ backgroundImage: `url(${create})` }} />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className="PopoverContent"
          sideOffset={5}
          onPointerDownOutside={() => setStatus(undefined)}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <p className="Text" style={{ marginBottom: 10 }}>
              New Volume
            </p>
            <fieldset className="Fieldset">
              <label className="Label" htmlFor="name">
                Name
              </label>
              <input
                className="Input"
                id="name"
                ref={volumeName}
                placeholder="name of volume"
              />
            </fieldset>

            {status && <label className="creationStatus">{status}</label>}

            <CheckIcon className="submitCheck" onClick={command} />
          </div>
          <Popover.Close
            className="PopoverClose"
            aria-label="Close"
            onClick={() => setStatus(undefined)}
          >
            <Cross2Icon />
          </Popover.Close>
          <Popover.Arrow className="PopoverArrow" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export const CreateVolumeCommands: React.FC<CreateCommandProp> = ({
  name,
  cmdRoute,
  fetchMethod,
}) => {
  return (
    <CreateVolumeButton
      name={name}
      cmdRoute={cmdRoute}
      fetchMethod={fetchMethod}
    />
  );
};
