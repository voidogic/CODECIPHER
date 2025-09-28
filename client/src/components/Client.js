import React from 'react';
import Avatar from 'react-avatar';

function Client({ username }) {
  const display = String(username || 'User');

  return (
    <div className="member-item d-flex align-items-center mb-3 px-2 py-2 glass-panel">
      <div className="position-relative me-2">
        <Avatar
          name={display}
          size={40}
          round
          color="#06b6d4"
          fgColor="#0b0f1a"
        />

        <span className="status-dot bg-success" />
      </div>
      <span className="member-name text-truncate">{display}</span>
    </div>
  );
}

export default Client;
