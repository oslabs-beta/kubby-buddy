import React, { FC} from 'react'
import './Container.scss'
import {StartButton} from '../Button/Start'

export const DockerContainer: FC = () => {

    interface TestContainer {
        name: string;
        id: number;
        image: string;
    }

    //testJSONobject 
    const testArray: TestContainer[] = [
        {name: 'container1', id: 12345, image: 'Alpine1', },
        {name: 'container2', id: 12345, image: 'Alpine2', },
        {name: 'container3', id: 12345, image: 'Alpine3', },
        {name: 'container4', id: 12345, image: 'Alpine4', },
        {name: 'container4', id: 12345, image: 'Alpine4', },
        {name: 'container4', id: 12345, image: 'Alpine4', },
        {name: 'container4', id: 12345, image: 'Alpine4', },
    ]


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
                <button>Stop</button>
                <button>Delete</button>
                <button>Logs</button>
            </div>
            
            
            <div className="othercmdbutton">
                <button>container</button>
                <button>volumes</button>
                <button>image</button>
                <button>stats</button>
            </div>

            <div className='graph'>
                <p>what is going on here image here</p>
            </div>
            
            </li>
           ))}

        </div>
    )
}