// contain our containers

import React, { FC } from 'react'
import './MainNav.scss'
import {DockerContainer} from '../Container/DockerContainer'


export const MainNav : FC = () => {
    
    return(
        <div className='main-nav'>
    
            <ul>
                
                
                < DockerContainer/>
        
                
              
            </ul>

        </div>
    )
}