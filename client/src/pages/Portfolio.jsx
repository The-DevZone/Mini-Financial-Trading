import { useQuery } from '@tanstack/react-query';
import api from '../api/client';
import '../styles/Portfolio.css';
import { Briefcase, Wallet, TrendingUp, DollarSign } from 'lucide-react';

export default function Portfolio() {
  const { data, isLoading } = useQuery({
    queryKey: ['portfolio'],
    queryFn: async () => (await api.get('/portfolio')).data.data
  });

  if (isLoading) return <div className="portfolio-container">Loading...</div>;

  const { summary, holdings } = data;

  return (
    <div className="portfolio-container">
      <h2 className="portfolio-title">Portfolio</h2>

      {/* Stats */}
      <div className="portfolio-stats">
        <Stat label="Invested" value={summary.totalInvested} icon={<Wallet size={18} />} color="blue" />
        <Stat label="Current" value={summary.totalCurrentValue} icon={<Briefcase size={18} />} color="yellow" />
        <Stat label="Returns" value={summary.totalReturns} icon={<TrendingUp size={18} />} color={summary.totalReturns >= 0 ? "green" : "red"} />
      </div>

      {/* Holdings */}
      <div className="holdings-grid">
        {holdings?.length ? (
          holdings.map(h => (
            <div key={h.productId} className="holding-card">
              <div className="holding-header">
                <div>
                  <div className="holding-name">
                    {h.name} <span className="holding-category">({h.category})</span>
                  </div>
                  <div className="holding-detail-row">
                    <DollarSign size={16} className="holding-icon yellow" />
                    <span>Units: {h.units}</span>
                  </div>
                </div>

                <div className="holding-values">
                  <div className="holding-detail-row">
                    <Wallet size={16} className="holding-icon blue" />
                    <span>Invested: ₹ {h.invested}</span>
                  </div>
                  <div className="holding-detail-row">
                    <Briefcase size={16} className="holding-icon yellow" />
                    <span>Current: ₹ {h.currentValue}</span>
                  </div>
                  <div className="holding-detail-row">
                    <TrendingUp size={16} className={`holding-icon ${h.returns >= 0 ? 'green' : 'red'}`} />
                    <span>Returns: ₹ {h.returns}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-message">No holdings yet. Buy something!</div>
        )}
      </div>
    </div>
  );
}

function Stat({ label, value, icon, color }) {
  return (
    <div className="stat-card">
      <div className="stat-label">
        <span className={`stat-icon ${color}`}>{icon}</span> {label}
      </div>
      <div className="stat-value">₹ {value}</div>
    </div>
  );
}