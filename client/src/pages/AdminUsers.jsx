import { useQuery } from '@tanstack/react-query';
import api from '../api/client';
import '../styles/AdminUsers.css';
import { User, Mail, ShieldCheck, Calendar } from 'lucide-react';

export default function AdminUsers() {
  const { data, isLoading } = useQuery({
    queryKey: ['admin-users'],
    queryFn: async () => (await api.get('/admin/users')).data.data,
    enabled: !!localStorage.getItem('token')
  });

  if (isLoading) return <div className="admin-users-container">Loading...</div>;

  return (
    <div className="admin-users-container">
      <h2 className="admin-users-title">Admin: All Users</h2>

      <div className="users-table-wrapper">
        <table className="users-table">
          <thead>
            <tr>
              <th><User size={16} className="icon-filled yellow" /> Name</th>
              <th><Mail size={16} className="icon-filled blue" /> Email</th>
              <th><ShieldCheck size={16} className="icon-filled green" /> KYC Status</th>
              <th><Calendar size={16} className="icon-filled purple" /> Created</th>
            </tr>
          </thead>
          <tbody>
            {data?.map(u => (
              <tr key={u._id}>
                <td>
                  <User size={14} className="row-icon icon-filled yellow" /> {u.name}
                </td>
                <td>
                  <Mail size={14} className="row-icon icon-filled blue" /> {u.email}
                </td>
                <td>
                  <ShieldCheck
                    size={14}
                    className={`row-icon icon-filled ${u.kycStatus === 'Verified' ? 'green' : 'red'}`}
                  /> {u.kycStatus}
                </td>
                <td>
                  <Calendar size={14} className="row-icon icon-filled purple" /> {new Date(u.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}