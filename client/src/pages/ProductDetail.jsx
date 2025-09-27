import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import api from '../api/client';
import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import '../styles/ProductDetail.css';
import { Tag, BarChart2, FileText, ShoppingCart } from 'lucide-react';

function fakeChartData(price) {
  const data = [];
  for (let i = 10; i >= 0; i--) {
    const p = Math.round((price * (0.95 + Math.random() * 0.1)) * 100) / 100;
    data.push({ day: `D-${i}`, price: p });
  }
  return data;
}

export default function ProductDetail() {
  const { id } = useParams();
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: async () => (await api.get(`/products/${id}`)).data.data
  });
  const [units, setUnits] = useState(1);
  const [msg, setMsg] = useState('');

  const buy = useMutation({
    mutationFn: () => api.post('/transactions/buy', { productId: id, units: Number(units) }),
    onSuccess: () => {
      setMsg('✅ Purchase successful!');
      qc.invalidateQueries(['wallet']);
      qc.invalidateQueries(['portfolio']);
      setTimeout(() => setMsg(''), 1500);
    },
    onError: (e) => setMsg(e.response?.data?.message || '❌ Purchase failed')
  });

  if (isLoading) return <div className="product-detail-container">Loading...</div>;
  const chartData = fakeChartData(data.pricePerUnit);

  return (
    <div className="product-detail-container">
      <h2 className="product-detail-title">
        {data.name} <span className="product-category">({data.category})</span>
      </h2>

      <div className="product-meta">
        <div className="meta-item">
          <Tag size={18} /> Price: ₹ {data.pricePerUnit}
        </div>
        <div className="meta-item">
          <BarChart2 size={18} /> P/E: {data.peRatio}
        </div>
      </div>

      <p className="product-description">
        <FileText size={18} /> {data.description}
      </p>

      <div className="chart-container">
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={chartData}>
            <XAxis dataKey="day" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip />
            <Line type="monotone" dataKey="price" stroke="#0ea5e9" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="buy-section">
        <input
          type="number"
          min={1}
          value={units}
          onChange={e => setUnits(e.target.value)}
          className="buy-input"
        />
        <button onClick={() => buy.mutate()} className="buy-btn">
          <ShoppingCart size={18} /> Buy
        </button>
      </div>

      {msg && <div className="message">{msg}</div>}
    </div>
  );
}
