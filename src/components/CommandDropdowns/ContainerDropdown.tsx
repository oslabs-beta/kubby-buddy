// drop down for command selection
// take props to decide which commands it has?
import React, {FC} from 'react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

export const ContainerDropdown: FC = () => {

    return (
        <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button className="IconButton" aria-label="Customise options">
            Container
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
        <DropdownMenu.Content className="DropdownMenuContent" sideOffset={5}>
        <DropdownMenu.Item className="DropdownMenuItem">
            
        </DropdownMenu.Content>


        </DropdownMenu.Portal>
        </DropdownMenu.Root>
    )
}