

import { useQuery } from '@tanstack/react-query';
import api from '../api/client';
import '../styles/Dashboard.css';

export default function Dashboard() {
  const { data: wallet } = useQuery({
    queryKey: ['wallet'],
    queryFn: async () => (await api.get('/wallet')).data.data
  });

  const { data: portfolio } = useQuery({
    queryKey: ['portfolio'],
    queryFn: async () => (await api.get('/portfolio')).data.data
  });

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Dashboard</h2>

      <div className="card-grid">
        <Card title="Wallet Balance" value={`₹ ${wallet?.balance?.toLocaleString() || '0'}`} />
        <Card title="Total Invested" value={`₹ ${portfolio?.summary?.totalInvested?.toLocaleString() || '0'}`} />
        <Card title="Current Value" value={`₹ ${portfolio?.summary?.totalCurrentValue?.toLocaleString() || '0'}`} />
        <Card title="Returns" value={`₹ ${portfolio?.summary?.totalReturns?.toLocaleString() || '0'}`} />
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="card">
      <div className="card-title">{title}</div>
      <div className="card-value">{value}</div>
    </div>
  );
}