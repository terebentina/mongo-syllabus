import React, { PropTypes } from 'react';

function DBDashboard({ db, stats }) {
  return (
    <div>DB Dashboard: {db}</div>
  );
}

DBDashboard.propTypes = {
  db: PropTypes.string.isRequired, stats: PropTypes.object,
};

export default DBDashboard;
