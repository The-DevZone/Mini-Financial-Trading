import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '../api/client';
import { Link } from 'react-router-dom';
import '../styles/Watchlist.css';
import { Eye, Trash2, Tag } from 'lucide-react';

export default function Watchlist() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ['watchlist'],
    queryFn: async () => (await api.get('/watchlist')).data.data
  });

  const remove = useMutation({
    mutationFn: (productId) => api.delete(`/watchlist/${productId}`),
    onSuccess: () => qc.invalidateQueries(['watchlist'])
  });

  if (isLoading) return <div className="watchlist-container">Loading...</div>;

  return (
    <div className="watchlist-container">
      <h2 className="watchlist-title">Watchlist</h2>
      <div className="watchlist-grid">
        {data?.length ? data.map(p => (
          <div key={p._id} className="watchlist-card">
            <div className="watchlist-info">
              <strong>{p.name}</strong>{' '}
              <span className="watchlist-category">({p.category})</span>
              <div className="watchlist-price">
                <Tag size={16} /> Price: ₹ {p.pricePerUnit}
              </div>
            </div>
            <div className="watchlist-actions">
              <Link to={`/products/${p._id}`}>
                <button className="watchlist-btn view-btn">
                  <Eye size={16} /> View
                </button>
              </Link>
              <button
                onClick={() => remove.mutate(p._id)}
                className="watchlist-btn remove-btn"
              >
                <Trash2 size={16} /> Remove
              </button>
            </div>
          </div>
        )) : (
          <div className="empty-message">Nothing in watchlist.</div>
        )}
      </div>
    </div>
  );
}