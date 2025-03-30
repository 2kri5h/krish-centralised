import React, { useState, useEffect } from 'react';
import apiClient from '../../apiclient/apiclient';

const HealthCheck = () => {
  const [status, setStatus] = useState('Loading...');
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkApiHealth = async () => {
      try {
        const response = await apiClient.get('health/');
        setStatus(response.data.status);
      } catch (err) {
        setError('API is currently unavailable');
        console.error('Health check failed:', err);
      }
    };

    checkApiHealth();
  }, []);

  return (
    <div className="health-check">
      {error ? (
        <div className="health-error">{error}</div>
      ) : (
        <div className="health-status">API Status: {status}</div>
      )}
    </div>
  );
};

export default HealthCheck; 