import { useEffect, useState } from "react";
import { getLogs } from "../api";

export default function Dashboard() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    getLogs("test@gmail.com").then(res => {
      setLogs(res.data);
    });
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      {logs.map((log, i) => (
        <div key={i}>
          {log.fileName} | Errors: {log.errorCount}
        </div>
      ))}
    </div>
  );
}
