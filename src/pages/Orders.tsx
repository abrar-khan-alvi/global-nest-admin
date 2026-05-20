import { useApp } from '../context/AppContext';

export default function Orders() {
  const { orders } = useApp();
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-semibold uppercase text-xs tracking-wider">Order ID</th>
                <th className="px-6 py-4 font-semibold uppercase text-xs tracking-wider">Customer</th>
                <th className="px-6 py-4 font-semibold uppercase text-xs tracking-wider">Date</th>
                <th className="px-6 py-4 font-semibold uppercase text-xs tracking-wider">Payment Method</th>
                <th className="px-6 py-4 font-semibold uppercase text-xs tracking-wider">Total</th>
                <th className="px-6 py-4 font-semibold uppercase text-xs tracking-wider text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">{order.id}</td>
                  <td className="px-6 py-4 text-gray-600">{order.customerName}</td>
                  <td className="px-6 py-4 text-gray-500 whitespace-nowrap">{order.date}</td>
                  <td className="px-6 py-4 text-gray-600">
                    {order.paymentMethod === 'COD' ? 'Cash on Delivery' : order.paymentMethod}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">৳{order.total.toFixed(2)}</td>
                  <td className="px-6 py-4 text-right">
                    <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium whitespace-nowrap
                      ${order.status === 'Delivered' ? 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20' :
                        order.status === 'Pending' ? 'bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20' :
                        'bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-600/20'
                      }
                    `}>
                      {order.status}
                    </span>
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
