import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '../api/client';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import '../styles/Products.css';
import { Tag, BarChart2, Eye, Star } from 'lucide-react';

export default function Products() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => (await api.get('/products')).data.data
  });
  const [msg, setMsg] = useState('');

  const addWatch = useMutation({
    mutationFn: (productId) => api.post('/watchlist', { productId }),
    onSuccess: () => {
      setMsg('✅ Added to watchlist');
      qc.invalidateQueries(['watchlist']);
      setTimeout(() => setMsg(''), 1500);
    }
  });

  if (isLoading) return <div className="products-container">Loading...</div>;

  return (
    <div className="products-container">
      <h2 className="products-title">Products</h2>
      {msg && <div className="products-message">{msg}</div>}
      
      <div className="products-grid">
        {data?.map(p => (
          <div key={p._id} className="product-card">
            <div className="product-header">
              <div className="product-info">
                <strong>{p.name}</strong>{' '}
                <span className="product-category">({p.category})</span>
                <div className="product-detail">
                  <Tag size={16} /> Price: ₹ {p.pricePerUnit}
                </div>
                <div className="product-detail">
                  <BarChart2 size={16} /> P/E: {p.peRatio}
                </div>
              </div>
              <div className="product-actions">
                <Link to={`/products/${p._id}`}>
                  <button className="action-btn view-btn">
                    <Eye size={16} /> View
                  </button>
                </Link>
                <button
                  onClick={() => addWatch.mutate(p._id)}
                  className="action-btn watch-btn"
                >
                  <Star size={16} /> Watch
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}