import React, { useEffect, useState, useRef } from 'react';
// import React, { useState } from "react";
import logs from '../../assets/memo-pad.png';
import './Logs.scss';

import { CommandButtonProps } from '../../types';

interface LogCommandProp extends CommandButtonProps {}

const LogButton: React.FC<LogCommandProp> = ({ cmdRoute, fetchMethod }) => {
  const [data, setData] = useState([]);
  const [showList, setShowList] = useState(false);
  const handleLog = async () => {
    const URL = cmdRoute;
    const response = await fetch(URL, {
      method: fetchMethod,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    console.log(data);
    setData(data);
    setData(data.reverse());
    setShowList(true);
  };

  function cleanLogData(log: any) {
    const cleanedLog = JSON.stringify(log).replace(/[{}]/g, '');
    return cleanedLog;
  }

  const closeRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let handler = (e: any) => {
      if (closeRef.current && !closeRef.current.contains(e.target as Node)) {
        setShowList(false);
      }
    };
    document.addEventListener('mousedown', handler);
  });

  return (
    <div>
      <button
        style={{ backgroundImage: `url(${logs})` }}
        onClick={handleLog}
      ></button>
      {showList && (
        <div className="modal">
          <div className="modal-content" ref={closeRef}>
            <div className={`log-window ${showList ? 'active' : 'inactive'}`}>
              <div className="Text">Logs</div>
              <ul>
                {data.map((log, index) => (
                  <li className="containerLogs" key={index}>
                    {cleanLogData(log)}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const LogCommands: React.FC<LogCommandProp> = ({
  name,
  cmdRoute,
  fetchMethod,
}) => {
  return (
    <div className="startCommand-container">
      <LogButton name={name} cmdRoute={cmdRoute} fetchMethod={fetchMethod} />
    </div>
  );
};

// {showList && (
//   <ScrollArea.Root className="ScrollAreaRoot modal">
//     <ScrollArea.Viewport className="ScrollAreaViewport modal-content">
//       <button className="close-button" onClick={closeModal}>
//         Close
//       </button>
//       <div className={`log-window ${showList ? 'active' : 'inactive'}`} style={{ padding: '15px 20px' }}>
//         <div className="Text">Logs</div>
//         {data.map((tag) => (
//           <div className="Tag" key={tag}>
//             {cleanLogData(tag)}
//           </div>
//         ))}
//         {/* <ScrollArea.Scrollbar className="ScrollAreaScrollbar" orientation="vertical">
//           <ScrollArea.Thumb className="ScrollAreaThumb" />
//         </ScrollArea.Scrollbar>
//         <ScrollArea.Scrollbar className="ScrollAreaScrollbar" orientation="horizontal">
//           <ScrollArea.Thumb className="ScrollAreaThumb" />
//         </ScrollArea.Scrollbar>
//         <ScrollArea.Corner className="ScrollAreaCorner" /> */}
//       </div>
//     </ScrollArea.Viewport>
//   </ScrollArea.Root>
// )}
