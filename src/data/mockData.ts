export const mockStats = {
  totalRevenue: 124500.50,
  totalOrders: 342,
  activeCustomers: 1205
};

export const mockOrders = [
  { id: "ORD-123", customerName: "John Doe", date: "2026-05-18", total: 1250.00, status: "Delivered", paymentMethod: "COD" },
  { id: "ORD-124", customerName: "Jane Smith", date: "2026-05-18", total: 450.50, status: "Pending", paymentMethod: "Card" },
  { id: "ORD-125", customerName: "Alice Walker", date: "2026-05-17", total: 2300.00, status: "Shipped", paymentMethod: "COD" },
  { id: "ORD-126", customerName: "Bob Johnson", date: "2026-05-16", total: 95.00, status: "Delivered", paymentMethod: "Card" },
  { id: "ORD-127", customerName: "Charlie Brown", date: "2026-05-15", total: 540.00, status: "Pending", paymentMethod: "COD" },
];

export const mockProducts = [
  { id: "PRD-001", name: "Ergonomic Office Chair", category: "Furniture", price: 299.99, stockStatus: "In Stock", image_url: "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=150&q=80" },
  { id: "PRD-002", name: "Wireless Mechanical Keyboard", category: "Electronics", price: 149.50, stockStatus: "Low Stock", image_url: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=150&q=80" },
  { id: "PRD-003", name: "Double Walled Glass Mug", category: "Kitchenware", price: 24.99, stockStatus: "In Stock", image_url: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=150&q=80" },
  { id: "PRD-004", name: "Noise Cancelling Headphones", category: "Electronics", price: 349.00, stockStatus: "Out of Stock", image_url: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=150&q=80" },
  { id: "PRD-005", name: "Minimalist Ceramic Planter", category: "Home Decor", price: 45.00, stockStatus: "In Stock", image_url: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=150&q=80" },
];

export const mockCustomers = [
  { id: "CUS-789", name: "John Doe", email: "john@example.com", phone: "+8801711223344", totalSpent: 3500.00 },
  { id: "CUS-790", name: "Jane Smith", email: "jane.smith@example.com", phone: "+8801819998877", totalSpent: 1200.50 },
  { id: "CUS-791", name: "Alice Walker", email: "alice.w@example.com", phone: "+8801912345678", totalSpent: 4300.00 },
  { id: "CUS-792", name: "Bob Johnson", email: "bobjohnson@example.com", phone: "+8801614567890", totalSpent: 295.00 },
  { id: "CUS-793", name: "Charlie Brown", email: "charlie.b@example.com", phone: "+8801556789012", totalSpent: 840.00 },
];

export const mockAdminUsers = [
  { id: "ADM-001", name: "Super Admin", email: "admin@globalnest.com", role: "Full Access", status: "Active" },
  { id: "ADM-002", name: "Sarah Manager", email: "sarah@globalnest.com", role: "Product Manager", status: "Active" },
  { id: "ADM-003", name: "Mike Support", email: "mike@globalnest.com", role: "Support Staff", status: "Active" },
  { id: "ADM-004", name: "Emma Orders", email: "emma@globalnest.com", role: "Order Fulfillment", status: "Inactive" },
];
