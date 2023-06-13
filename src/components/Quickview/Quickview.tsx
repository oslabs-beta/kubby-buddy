// display running containers as a list 
// onclick take user to scroll position in main view
import React, {FC, useContext} from 'react'
import { UserContext } from '../../UserContext';
import './Quickview.scss'



export const Quickview: FC = () => {
    const {runningContainers} = useContext(UserContext)
    console.log(runningContainers)
//display instances of running containers, just the name 
    return (
    <div className='quickview-container'>
        <h3 className='quickview-header'>running</h3>
    <ul className='quickview-list'>
    {runningContainers.map(container => {
     return <li className = 'quickview-item'>
        {container.Names}
        {container.Ports}
    </li>
    }
    )}
    </ul>
    </div>
    )
}