import React from 'react';
import start from '../../assets/play.png';

export const StartButton: React.FC = () => {
  //helper
  const handleStart = async () => {
    try {
      const response = await fetch('/container/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: `container-name` }),
      });
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <button
      style={{ backgroundImage: `url(${start})` }}
      onClick={handleStart}
    ></button>
  );
};
