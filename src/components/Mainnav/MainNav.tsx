// contain our containers

import React, { FC } from 'react'
import './MainNav.scss'
import {DockerContainer} from '../Container/DockerContainer'


export const MainNav : FC = () => {
    //test please ignore

    // {name: container, id: 12345, image: Alpine, }
   


    return(
        <div className='main-nav'>
            <p> 
            This is MainNav
            </p>
            <ul>
                
                <div className='test'>
                    Test empty
                </div>
                < DockerContainer/>
        
                
              
            </ul>

        </div>
    )
}