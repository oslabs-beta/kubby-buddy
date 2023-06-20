// /prune-stopped-containers

import React, { useContext, forwardRef, Ref, useRef, FC } from 'react';
import create from '../../assets/add-document.png';
import * as Popover from '@radix-ui/react-popover';
import * as Select from '@radix-ui/react-select';
import './CreatePopover.scss';
import { Cross2Icon, CheckIcon, ChevronDownIcon } from '@radix-ui/react-icons';
import { CommandButtonProps } from '../../types';
import { UserContext } from '../../UserContext';
import classnames from 'classnames';

let selectedVolume: string;

interface SelectItemProps {
  className?: string;
  children: React.ReactNode;
  value: string;
}
// interface VolumeSelectProps {
//     onVolumeSelect: (selectedValue: string) => void;
//   }
const VolumeSelect: FC = () => {
  const { availableVolumes } = useContext(UserContext);

  return (
    <Select.Root
      value={selectedVolume}
      onValueChange={(newValue) => {
        selectedVolume = newValue;
        console.log(selectedVolume);
      }}
    >
      <Select.Trigger className="VolumeSelectTrigger">
        <Select.Value placeholder="optional: include a volume"></Select.Value>
        <Select.Icon>
          <ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="VolumeSelect">
          <Select.Viewport className="VolumeSelectViewport">
            <Select.Group>
              <Select.Label className="VolumeSelectLabel">Volumes</Select.Label>

              {availableVolumes.map((volume) => (
                <SelectItem value={volume.Name}>{volume.Name}</SelectItem>
              ))}
            </Select.Group>
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(
  ({ value, children, className, ...props }, ref: Ref<HTMLDivElement>) => {
    const valueRef = useRef<string>(value);
    return (
      <Select.Item
        value={value}
        className={classnames('SelectItem', className)}
        {...props}
        ref={ref}
        onClick={() => console.log(valueRef)}
      >
        <Select.ItemText>{children}</Select.ItemText>
        <Select.ItemIndicator className="SelectItemIndicator">
          <CheckIcon />
        </Select.ItemIndicator>
      </Select.Item>
    );
  }
);

interface CreateCommandProp extends CommandButtonProps {
  image?: string;
  remove?: string;
  volumeName?: string;
  fileDirectory?: string;
  port?: string;
}

const CreateButton: React.FC<CreateCommandProp> = ({
  name,
  cmdRoute,
  fetchMethod,
}) => {
  const containerName = useRef<HTMLInputElement>(null);
  const port = useRef<HTMLInputElement>(null);
  const volumeDirectory = useRef<HTMLInputElement>(null);

  const command = async () => {
    try {
      const URL = cmdRoute;
      const response = await fetch(URL, {
        method: fetchMethod,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: containerName.current?.value,
          port: port.current?.value,
          image: name,
          fileDirectory: volumeDirectory.current?.value,
        }),
      });
      const data = await response.json();
      console.log('test---->:' + data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button style={{ backgroundImage: `url(${create})` }} />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className="PopoverContent" sideOffset={5}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <p className="Text" style={{ marginBottom: 10 }}>
              Specifications
            </p>
            <fieldset className="Fieldset">
              <label className="Label" htmlFor="name">
                Name
              </label>
              <input
                className="Input"
                id="name"
                ref={containerName}
                placeholder="name of container"
              />
            </fieldset>
            <fieldset className="Fieldset">
              <label className="Label" htmlFor="volumename">
                Volume Name
              </label>
              <VolumeSelect />
            </fieldset>
            <fieldset className="Fieldset">
              <label className="Label" htmlFor="height">
                Volume Directory
              </label>
              <input
                className="Input"
                ref={volumeDirectory}
                id="height"
                defaultValue="/var/lib/docker/volumes"
                placeholder="optional"
              />
            </fieldset>
            <fieldset className="Fieldset">
              <label className="Label" htmlFor="maxHeight">
                Port
              </label>
              <input
                className="Input"
                ref={port}
                id="maxHeight"
                defaultValue="1234"
              />
            </fieldset>
            <CheckIcon onClick={command} />
          </div>
          <Popover.Close className="PopoverClose" aria-label="Close">
            <Cross2Icon />
          </Popover.Close>
          <Popover.Arrow className="PopoverArrow" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export const CreateCommands: React.FC<CreateCommandProp> = ({
  name,
  cmdRoute,
  fetchMethod,
}) => {
  return (
    <CreateButton name={name} cmdRoute={cmdRoute} fetchMethod={fetchMethod} />
  );
};
