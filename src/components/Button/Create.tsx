// /prune-stopped-containers

import React, {
  useContext,
  forwardRef,
  Ref,
  useRef,
  FC,
  useState,
} from 'react';
import create from '../../assets/add-document.png';
import * as Popover from '@radix-ui/react-popover';
import * as Select from '@radix-ui/react-select';
import * as Checkbox from '@radix-ui/react-checkbox';
import './CreatePopover.scss';
import { Cross2Icon, CheckIcon, ChevronDownIcon } from '@radix-ui/react-icons';
import { CommandButtonProps } from '../../types';
import { UserContext } from '../../UserContext';
import classnames from 'classnames';

interface SelectItemProps {
  className?: string;
  children: React.ReactNode;
  value: string;
}
interface VolumeSelectProps {
  selectedVolume: string;
  setSelectedVolume: (selectedValue: string) => void;
}
const VolumeSelect: FC<VolumeSelectProps> = ({
  selectedVolume,
  setSelectedVolume,
}) => {
  const { availableVolumes } = useContext(UserContext);

  return (
    <Select.Root
      value={selectedVolume}
      onValueChange={(newValue) => {
        setSelectedVolume(newValue);
      }}
    >
      <Select.Trigger className="VolumeSelectTrigger">
        <Select.Value placeholder=""></Select.Value>
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
  const [selectedVolume, setSelectedVolume] = useState('');
  const [status, setStatus] = useState<undefined | string>(undefined);
  let removeChecked = false;

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
          remove: removeChecked ? 'yes' : 'no',
        }),
      });
      const data = await response.json();
      console.log('test---->:' + data);
      setStatus('Creation Successful');
      if (response.status === 500) throw new Error(data);
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
              New Container From This Image
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
              <label className="Label" htmlFor="Volume Name">
                Volume (optional)
              </label>
              <VolumeSelect
                setSelectedVolume={setSelectedVolume}
                selectedVolume={selectedVolume}
              />
            </fieldset>
            {selectedVolume && (
              <fieldset className="Fieldset">
                <label className="Label" htmlFor="Volume Directory">
                  Volume Directory
                </label>
                <input
                  className="Input"
                  ref={volumeDirectory}
                  id="height"
                  placeholder="volume location on container"
                />
              </fieldset>
            )}

            <fieldset className="Fieldset">
              <label className="Label" htmlFor="port">
                Port
              </label>
              <input
                className="Input"
                ref={port}
                id="maxHeight"
                placeholder="unused port number"
              />
            </fieldset>
            <fieldset className="Fieldset">
              <label className="CheckLabel" htmlFor="run with remove flag?">
                run with remove flag?
              </label>
              <Checkbox.Root
                className="CheckboxRoot"
                onCheckedChange={() => (removeChecked = !removeChecked)}
              >
                <Checkbox.Indicator className="CheckboxIndicator">
                  <CheckIcon />
                </Checkbox.Indicator>
              </Checkbox.Root>
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

export const CreateCommands: React.FC<CreateCommandProp> = ({
  name,
  cmdRoute,
  fetchMethod,
}) => {
  return (
    <CreateButton name={name} cmdRoute={cmdRoute} fetchMethod={fetchMethod} />
  );
};
