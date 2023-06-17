import React from "react";
import logs from "../../assets/memo-pad.png";

import { CommandButtonProps } from "../../types";

interface LogCommandProp extends CommandButtonProps {}

const LogButton: React.FC<LogCommandProp> = ({
  name,
  cmdRoute,
  fetchMethod,
}) => {
  const handleLog = async () => {
    const URL = cmdRoute;
    const response = await fetch(URL, {
      method: fetchMethod,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name }),
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
