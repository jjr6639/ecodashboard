function AirQualityCard({ icon, title, value, unit, status, description }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'good': return '#00e400';
      case 'moderate': return '#ffff00';
      case 'high': return '#ff7e00';
      default: return '#999';
    }
  };

  return (
    <div className="air-quality-card" style={{ borderTop: `3px solid ${getStatusColor(status)}` }}>
      <div className="card-icon">
        {icon}
      </div>
      <div className="card-content">
        <h4>{title}</h4>
        <div className="card-value">
          <span className="value">{value}</span>
          <span className="unit">{unit}</span>
        </div>
        <p className="card-description">{description}</p>
        <div className={`status-badge ${status}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </div>
      </div>
    </div>
  );
}

export default AirQualityCard;