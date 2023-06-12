import React, { createContext, useState, ReactNode } from 'react';
import { Context, Container } from './types';




export const UserContext = createContext<Context>({
    runningContainers: [],
    setRunningContainers: () => {},
  });

export const UserProvider = ({children} : {children : ReactNode}) => {
    const [runningContainers, setRunningContainers] = useState<Container[]>([])


    const contextProps: Context = {
        runningContainers,
        setRunningContainers,
    }
    return (
        <UserContext.Provider value ={contextProps}>
        {children}
        </UserContext.Provider>
    )
}