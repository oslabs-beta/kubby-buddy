import React, { useContext, FC } from 'react';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import './SwitchViewToggle.scss';
import { UserContext } from '../../UserContext';

//this is a component that will switch the views that are in main nav by manipulating the state of setShowImages and setShowContainers

export const SwitchViewToggle: FC = () => {
  const { showing, setShowing } = useContext(UserContext);

  return (
    <ToggleGroup.Root
      className="ToggleGroup"
      type="single"
      value={showing}
      onValueChange={(value) => {
        if (value) setShowing(value);
      }}
    >
      <ToggleGroup.Item className="ToggleGroupItem" value="Images">
        Images
      </ToggleGroup.Item>
      <ToggleGroup.Item className="ToggleGroupItem" value="Containers">
        Containers
      </ToggleGroup.Item>
    </ToggleGroup.Root>
  );
};
