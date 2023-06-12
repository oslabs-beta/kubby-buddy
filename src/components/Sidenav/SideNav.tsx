// display system wide command menu
// contains Quickview component 

import React, { FC } from 'react'
import './SideNav.scss'
// import photo from '../../assests/logo.png'


export const SideNav : FC = () => {
    // const testimage = require('../../assests/test.png')
    return(
        <div className='side-nav'>
            <p> 
            This is SideNav
            </p>
            <p> link 1 </p>
            <p> link 2 </p>
            <p> link 3 </p>
            <p> link 4 </p>
        </div>
    )
}