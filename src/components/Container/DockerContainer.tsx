import React, { FC} from 'react'
import './Container.scss'
import {StartButton} from '../Button/Start'
import {StopButton} from '../Button/Stop'
import { DeleteButton } from '../Button/Delete'
import { LogButton } from '../Button/Logs'
import { Graph } from '../Graph/Graph'



export const DockerContainers: FC = () => {

    interface TestContainer {
        name: string;
        id: number;
        image: string;
    }

    //testJSONobject 
    const testArray: TestContainer[] = [
        {name: 'container1THISISAREALLYREALLYLONGNAME', id: 12345, image: 'Alpine1', },
        {name: 'container2', id: 12345, image: 'Alpine2', },
        {name: 'container3', id: 12345, image: 'Alpine3', },
        {name: 'container4', id: 12345, image: 'Alpine4', },
        {name: 'container4', id: 12345, image: 'Alpine4', },
        {name: 'container4', id: 12345, image: 'Alpine4', },
        {name: 'container4', id: 12345, image: 'Alpine4', },
    ]

    //pass down necessary props to buttons for their relevant fetch requests
    return (
        <div className='dockercontainer'>
           {testArray.map((el,index)=>(

            <li className="list" key={index}> 
            
            <div className='container-info'>
                <p>{el.name}</p>
                <p className='imagename'>{el.image}</p>
            </div>
        
            <div className="cmdbutton">
                
                <StartButton />
                <StopButton />
                <DeleteButton />
                <LogButton />
            </div>
            
            
            <div className="dropdown">
                
                <button>container</button>
                <button>volumes</button>
                <button>image</button>
                <button>stats</button>
            </div>

            <Graph />
            
            </li>
           ))}

        </div>
    )
}