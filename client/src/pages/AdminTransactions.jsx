import { useQuery } from '@tanstack/react-query';
import api from '../api/client';
import '../styles/AdminTransactions.css';
import { User, Package, Hash, Tag, DollarSign, Calendar } from 'lucide-react';

export default function AdminTransactions() {
  const { data, isLoading } = useQuery({
    queryKey: ['admin-transactions'],
    queryFn: async () => (await api.get('/admin/transactions')).data.data,
    enabled: !!localStorage.getItem('token')
  });

  if (isLoading) return <div className="admin-transactions-container">Loading...</div>;

  return (
    <div className="admin-transactions-container">
      <h2 className="admin-title">Admin: All Transactions</h2>

      <table className="transactions-table">
        <thead>
          <tr>
            <th><User size={16} className="icon-filled yellow" /> User</th>
            <th><Package size={16} className="icon-filled blue" /> Product</th>
            <th><Hash size={16} className="icon-filled purple" /> Units</th>
            <th><Tag size={16} className="icon-filled pink" /> Price</th>
            <th><DollarSign size={16} className="icon-filled green" /> Amount</th>
            <th><Calendar size={16} className="icon-filled orange" /> Date</th>
          </tr>
        </thead>
        <tbody>
          {data?.map(t => (
            <tr key={t._id}>
              <td>
                <User size={14} className="row-icon icon-filled yellow" /> {t.user?.name} ({t.user?.email})
              </td>
              <td>
                <Package size={14} className="row-icon icon-filled blue" /> {t.product?.name}
              </td>
              <td>
                <Hash size={14} className="row-icon icon-filled purple" /> {t.units}
              </td>
              <td>
                <Tag size={14} className="row-icon icon-filled pink" /> ₹{t.pricePerUnit}
              </td>
              <td>
                <DollarSign size={14} className="row-icon icon-filled green" /> ₹{t.amount}
              </td>
              <td>
                <Calendar size={14} className="row-icon icon-filled orange" /> {new Date(t.createdAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}