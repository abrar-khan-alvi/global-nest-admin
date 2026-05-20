import { Mail, Phone } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Customers() {
  const { customers } = useApp();
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-semibold uppercase text-xs tracking-wider">Name</th>
                <th className="px-6 py-4 font-semibold uppercase text-xs tracking-wider">Email</th>
                <th className="px-6 py-4 font-semibold uppercase text-xs tracking-wider">Phone</th>
                <th className="px-6 py-4 font-semibold uppercase text-xs tracking-wider text-right">Total Spent</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {customers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs uppercase shadow-sm">
                        {customer.name.slice(0, 2)}
                      </div>
                      <span className="font-medium text-gray-900">{customer.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      {customer.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      {customer.phone}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right font-medium text-gray-900">
                    ৳{customer.totalSpent.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
