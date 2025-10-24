import React from 'react';

function MetricsCard({ title, value }) {
  return (
    <div style={{ border: '1px solid gray', padding: '10px', margin: '5px' }}>
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  );
}

export default MetricsCard;

