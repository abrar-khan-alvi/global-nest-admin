import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockProducts, mockOrders, mockCustomers, mockAdminUsers, mockStats } from '../data/mockData';

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stockStatus: string;
  image_url: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
}

export interface Order {
  id: string;
  customerName: string;
  date: string;
  total: number;
  status: string;
  paymentMethod: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalSpent: number;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

export interface Stats {
  totalRevenue: number;
  totalOrders: number;
  activeCustomers: number;
}

interface AppContextType {
  products: Product[];
  categories: Category[];
  orders: Order[];
  customers: Customer[];
  admins: AdminUser[];
  stats: Stats;
  isAuthenticated: boolean;
  currentUser: AdminUser | null;
  addProduct: (product: Omit<Product, 'id'>) => void;
  editProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  addCategory: (category: Omit<Category, 'id'>) => void;
  editCategory: (category: Category) => void;
  deleteCategory: (id: string) => void;
  addOrder: (order: Omit<Order, 'id'>) => void;
  addAdmin: (admin: Omit<AdminUser, 'id'>) => void;
  deleteAdmin: (id: string) => void;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const initialCategories: Category[] = [
  { id: 'CAT-1', name: 'Furniture', description: 'Premium quality office, home, and outdoor furniture.' },
  { id: 'CAT-2', name: 'Electronics', description: 'High-tech consumer electronics and accessories.' },
  { id: 'CAT-3', name: 'Kitchenware', description: 'Functional and aesthetic tableware, dining, and cooking items.' },
  { id: 'CAT-4', name: 'Home Decor', description: 'Beautiful minimalist planters, lights, rugs, and decorative pieces.' },
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load initial states or from localStorage
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('gn_products');
    return saved ? JSON.parse(saved) : mockProducts;
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem('gn_categories');
    return saved ? JSON.parse(saved) : initialCategories;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('gn_orders');
    return saved ? JSON.parse(saved) : mockOrders;
  });

  const [customers, setCustomers] = useState<Customer[]>(() => {
    const saved = localStorage.getItem('gn_customers');
    return saved ? JSON.parse(saved) : mockCustomers;
  });

  const [admins, setAdmins] = useState<AdminUser[]>(() => {
    const saved = localStorage.getItem('gn_admins');
    return saved ? JSON.parse(saved) : mockAdminUsers;
  });

  // Save to local storage on changes
  useEffect(() => {
    localStorage.setItem('gn_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('gn_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('gn_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('gn_customers', JSON.stringify(customers));
  }, [customers]);

  useEffect(() => {
    localStorage.setItem('gn_admins', JSON.stringify(admins));
  }, [admins]);

  // Derived dashboard stats
  const [stats, setStats] = useState<Stats>(mockStats);

  useEffect(() => {
    const totalRev = orders
      .filter(o => o.status === 'Delivered')
      .reduce((sum, o) => sum + o.total, 0);

    setStats({
      totalRevenue: totalRev > 0 ? totalRev : mockStats.totalRevenue,
      totalOrders: orders.length,
      activeCustomers: customers.length,
    });
  }, [orders, customers]);

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('gn_authenticated') === 'true';
  });

  const [currentUser, setCurrentUser] = useState<AdminUser | null>(() => {
    const saved = localStorage.getItem('gn_current_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = async (email: string, password: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const admin = admins.find(a => a.email.toLowerCase() === email.toLowerCase());
    
    if (!admin) {
      throw new Error('Invalid email address. This user is not registered as an administrator.');
    }
    
    if (admin.status !== 'Active') {
      throw new Error('This administrator account is currently inactive.');
    }
    
    if (password !== 'admin123') {
      throw new Error('Incorrect password. Please use the default password (admin123) for testing.');
    }
    
    setIsAuthenticated(true);
    setCurrentUser(admin);
    localStorage.setItem('gn_authenticated', 'true');
    localStorage.setItem('gn_current_user', JSON.stringify(admin));
    return true;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    localStorage.removeItem('gn_authenticated');
    localStorage.removeItem('gn_current_user');
  };

  // Product Actions
  const addProduct = (p: Omit<Product, 'id'>) => {
    const nextId = `PRD-${String(products.length + 1).padStart(3, '0')}`;
    setProducts([...products, { ...p, id: nextId }]);
  };

  const editProduct = (p: Product) => {
    setProducts(products.map(item => item.id === p.id ? p : item));
  };

  const deleteProduct = (id: string) => {
    setProducts(products.filter(item => item.id !== id));
  };

  // Category Actions
  const addCategory = (c: Omit<Category, 'id'>) => {
    const nextId = `CAT-${String(categories.length + 1).padStart(3, '0')}`;
    setCategories([...categories, { ...c, id: nextId }]);
  };

  const editCategory = (c: Category) => {
    // Also rename any product with the old category name to the new category name
    const oldCategoryName = categories.find(cat => cat.id === c.id)?.name;
    if (oldCategoryName && oldCategoryName !== c.name) {
      setProducts(prevProducts => prevProducts.map(p => 
        p.category === oldCategoryName ? { ...p, category: c.name } : p
      ));
    }
    setCategories(categories.map(item => item.id === c.id ? c : item));
  };

  const deleteCategory = (id: string) => {
    const categoryToDelete = categories.find(c => c.id === id);
    if (categoryToDelete) {
      // Re-assign/delete categories in products if necessary
      setCategories(categories.filter(item => item.id !== id));
    }
  };

  // Order Actions
  const addOrder = (o: Omit<Order, 'id'>) => {
    const nextId = `ORD-${String(orders.length + 1).padStart(3, '0')}`;
    setOrders([{ ...o, id: nextId }, ...orders]);
  };

  // Admin Actions
  const addAdmin = (a: Omit<AdminUser, 'id'>) => {
    const nextId = `ADM-${String(admins.length + 1).padStart(3, '0')}`;
    setAdmins([...admins, { ...a, id: nextId }]);
  };

  const deleteAdmin = (id: string) => {
    setAdmins(admins.filter(item => item.id !== id));
  };

  return (
    <AppContext.Provider value={{
      products,
      categories,
      orders,
      customers,
      admins,
      stats,
      isAuthenticated,
      currentUser,
      addProduct,
      editProduct,
      deleteProduct,
      addCategory,
      editCategory,
      deleteCategory,
      addOrder,
      addAdmin,
      deleteAdmin,
      login,
      logout,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
