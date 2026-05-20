import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Mail, Shield, ShieldCheck, ShieldAlert } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Admins() {
  const { admins, addAdmin, deleteAdmin } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [newAdmin, setNewAdmin] = useState({
    name: '',
    email: '',
    role: 'Full Access',
    status: 'Active'
  });

  const handleAddAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    addAdmin(newAdmin);
    setIsModalOpen(false);
    setNewAdmin({ name: '', email: '', role: 'Full Access', status: 'Active' });
  };

  const roleStyles: Record<string, string> = {
    'Full Access': 'bg-purple-50 text-purple-700 ring-purple-600/20',
    'Product Manager': 'bg-blue-50 text-blue-700 ring-blue-600/20',
    'Order Fulfillment': 'bg-amber-50 text-amber-700 ring-amber-600/20',
    'Support Staff': 'bg-emerald-50 text-emerald-700 ring-emerald-600/20'
  };

  return (
    <div className="space-y-6 relative">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Admin Users</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Admin
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-semibold uppercase text-xs tracking-wider">Admin Name</th>
                <th className="px-6 py-4 font-semibold uppercase text-xs tracking-wider">Role & Access</th>
                <th className="px-6 py-4 font-semibold uppercase text-xs tracking-wider">Status</th>
                <th className="px-6 py-4 font-semibold uppercase text-xs tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {admins.map((admin) => (
                <tr key={admin.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm uppercase shadow-sm">
                        {admin.name.slice(0, 2)}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{admin.name}</div>
                        <div className="text-gray-500 text-xs flex items-center gap-1 mt-0.5">
                          <Mail className="w-3 h-3" />
                          {admin.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                       {admin.role === 'Full Access' ? (
                          <ShieldAlert className="w-4 h-4 text-purple-600" />
                       ) : (
                          <ShieldCheck className="w-4 h-4 text-blue-600" />
                       )}
                      <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium whitespace-nowrap ring-1 ring-inset ${roleStyles[admin.role] || 'bg-gray-50 text-gray-700 ring-gray-600/20'}`}>
                        {admin.role}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium whitespace-nowrap
                      ${admin.status === 'Active' ? 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20' : 'bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20'}
                    `}>
                      {admin.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 group">
                      <button 
                        onClick={() => deleteAdmin(admin.id)}
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                        title="Delete Admin"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Add New Admin</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-500">
                 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <form onSubmit={handleAddAdmin} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input 
                  required
                  type="text" 
                  value={newAdmin.name}
                  onChange={(e) => setNewAdmin({...newAdmin, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input 
                  required
                  type="email" 
                  value={newAdmin.email}
                  onChange={(e) => setNewAdmin({...newAdmin, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Access Role</label>
                <select 
                  value={newAdmin.role}
                  onChange={(e) => setNewAdmin({...newAdmin, role: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="Full Access">Full Access (All features)</option>
                  <option value="Product Manager">Product Manager (Products only)</option>
                  <option value="Order Fulfillment">Order Fulfillment (Orders only)</option>
                  <option value="Support Staff">Support Staff (Customers only)</option>
                </select>
              </div>
              <div className="pt-4 flex items-center justify-end gap-3">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Create Admin
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
