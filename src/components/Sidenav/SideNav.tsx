// display system wide command menu
// contains Quickview component 
/*

*/
import React, { FC, useContext, useEffect} from 'react'
import './SideNav.scss'
import { Quickview } from '../Quickview/Quickview'
import { UserContext } from '../../UserContext';
// import photo from '../../assests/logo.png'
//container/all-active-containers

export const SideNav : FC = () => {
    // const testimage = require('../../assests/test.png')
    const {setRunningContainers} = useContext(UserContext)


    useEffect(() => { 
        async function getRunningContainers(){
            try{
                const getURL = 'container/all-active-containers'
                const fetchResponse = await fetch(getURL)
                const data = await fetchResponse.json();
                console.log('++++++' + data)
                setRunningContainers([...data.split('}')])
            } catch (error){
                console.log(error)
            }
        }
        getRunningContainers()
     },[])


    return(
        <div className='side-nav'>

        <Quickview/>
        </div>
    )
}