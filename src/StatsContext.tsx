// import React, { createContext, useState, ReactNode } from 'react';
// import { StatsContextType, Container } from './types';

// export const StatsContext = createContext<StatsContextType>({
//   statStream: [],
//   setStatStream: () => {},
// });

// export const StatsProvider = ({ children }: { children: ReactNode }) => {

//   const [statStream, setStatStream] = useState<Container[]>([]);

//   const contextProps: StatsContextType = {
//     statStream,
//     setStatStream,
//   };

//   return (
//     <StatsContext.Provider value={contextProps}>{children}</StatsContext.Provider>
//   );
// };
