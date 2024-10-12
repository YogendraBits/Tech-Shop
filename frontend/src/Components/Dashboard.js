// frontend/src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css'; // Import a CSS file for styling

const Dashboard = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const { data } = await axios.get('/api/logs'); // Adjust API path if needed
        setLogs(data);
      } catch (error) {
        console.error("Error fetching logs:", error);
      }
    };
    fetchLogs();
  }, []);

  // Function to format log level with colors
  const formatLogLevel = (level) => {
    switch (level) {
      case 'info':
        return <span className="log-level info">{level}</span>;
      case 'error':
        return <span className="log-level error">{level}</span>;
      case 'warn':
        return <span className="log-level warn">{level}</span>;
      default:
        return <span>{level}</span>;
    }
  };

  return (
    <div>
      <h1>API Logs</h1>
      <table className="logs-table">
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Level</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log._id}>
              <td>{new Date(log.timestamp).toLocaleString()}</td>
              <td>{formatLogLevel(log.level)}</td>
              <td>{log.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
