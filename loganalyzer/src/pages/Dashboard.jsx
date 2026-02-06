import './Dashboard.css';
import { useEffect, useState } from "react";
import { getLogs, exportReport } from "../api";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);


export default function Dashboard() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email) {
      getLogs(email).then(res => setLogs(res.data));
    }
  }, []);

  const totalErrors = logs.reduce((sum, l) => sum + l.errorCount, 0);
  const totalWarnings = logs.reduce((sum, l) => sum + l.warningCount, 0);
  const cleanLogs = logs.filter(l => l.errorCount === 0).length;
const errorLogs = logs.length - cleanLogs;

const barData = {
  labels: ["Errors", "Warnings"],
  datasets: [
    {
      label: "Count",
      data: [totalErrors, totalWarnings],
      backgroundColor: ["#ff4d6d", "#f9c74f"]
    }
  ]
};

const pieData = {
  labels: ["Clean Logs", "Logs with Errors"],
  datasets: [
    {
      data: [cleanLogs, errorLogs],
      backgroundColor: ["#80ed99", "#ff4d6d"]
    }
  ]
};
const handleDownload = async () => {
  const email = localStorage.getItem("email");
  const res = await exportReport(email);

  const url = window.URL.createObjectURL(new Blob([res.data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "log_report.csv");
  document.body.appendChild(link);
  link.click();
};



  return (
    <div className="dashboard">
      <h1>📊 Dashboard</h1>
      <p className="subtitle">Log analysis summary</p>

      {/* SUMMARY CARDS */}
      <div className="card-container">
        <div className="card">
          <h3>Total Files</h3>
          <p>{logs.length}</p>
        </div>
        <div className="card">
          <h3>Total Errors</h3>
          <p>{totalErrors}</p>
        </div>
        <div className="card">
          <h3>Total Warnings</h3>
          <p>{totalWarnings}</p>
        </div>
      </div>

      {/* TABLE */}
      <table className="log-table">
        <thead>
          <tr>
            <th>File Name</th>
            <th>Errors</th>
            <th>Warnings</th>
            <th>Status</th>
            <th>Uploaded At</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, i) => (
            <tr key={i}>
              <td>{log.fileName}</td>
              <td>{log.errorCount}</td>
              <td>{log.warningCount}</td>
              <td>{log.status}</td>
              <td>{log.createdAt?.replace("T", " ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ display: "flex", gap: "40px", marginTop: "40px" }}>
  <div style={{ width: "400px" }}>
    <h3>📊 Error vs Warning</h3>
    <Bar data={barData} />
  </div>

  <div style={{ width: "400px" }}>
    <h3>🥧 Log Health</h3>
    <Pie data={pieData} />
  </div>
  

</div>
<button onClick={handleDownload}>
  Download Error Report 📄
</button>
    </div>
    
  );
}
