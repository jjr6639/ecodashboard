import { TrendingUp, TrendingDown, Minus, AlertCircle } from 'lucide-react';

function EndangeredSpeciesCard({ species }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Critically Endangered': return '#d32f2f';
      case 'Endangered': return '#f57c00';
      case 'Vulnerable': return '#fbc02d';
      case 'Threatened': return '#ff9800';
      default: return '#757575';
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'increasing': return <TrendingUp size={16} color="#4caf50" />;
      case 'decreasing': return <TrendingDown size={16} color="#d32f2f" />;
      case 'stable': return <Minus size={16} color="#2196f3" />;
      default: return <Minus size={16} color="#757575" />;
    }
  };

  const getTrendText = (trend) => {
    switch (trend) {
      case 'increasing': return 'Population increasing';
      case 'decreasing': return 'Population decreasing';
      case 'stable': return 'Population stable';
      default: return 'Trend unknown';
    }
  };

  return (
    <div className="species-card">
      <div className="species-header">
        <div className="species-status" style={{ backgroundColor: getStatusColor(species.STATUS) }}>
          <AlertCircle size={16} />
          {species.STATUS}
        </div>
      </div>
      
      <div className="species-body">
        <h3 className="species-common-name">{species.COMNAME}</h3>
        <p className="species-scientific-name"><em>{species.SCINAME}</em></p>
        
        <div className="species-info">
          <p className="species-population">{species.POP_DESC}</p>
          
          {species.trend && (
            <div className="species-trend">
              {getTrendIcon(species.trend)}
              <span>{getTrendText(species.trend)}</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="species-footer">
        <span className="species-detail">Protected under ESA</span>
      </div>
    </div>
  );
}

export default EndangeredSpeciesCard;