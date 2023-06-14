import React, { FC, useEffect, useState } from "react";

const Stream: FC = () => {
  const [logs, setLogs] = useState<String[]>([]);
  console.log("hi");
  //Will start the stream and get averaged data, setting it to containersArray
  useEffect(() => {
    const sse = new EventSource("http://localhost:8080/general/stats");
    sse.onmessage = (event: MessageEvent) => {
      console.log(event);
      const data = JSON.parse(event?.data);
      setLogs(data);
    };
    //If there is an error for the stream (Docker not running / No active containers) - setup for Error Component
    // sse.onerror = () => {
    //   setLogs(true)
    //   return sse.close();
    // }
    //Cleanup
    return () => {
      sse.close();
    };
  }, []);
  return <div>{logs}</div>;
};

export default Stream;
