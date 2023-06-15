import React from 'react';
import logs from '../../assets/memo-pad.png';
export const LogButton: React.FC = () => {
  const handleLog = async () => {
    const response = await fetch('/container/stop', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: `container-name` }),
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <button
      style={{ backgroundImage: `url(${logs})` }}
      onClick={handleLog}
    ></button>
  );
};
