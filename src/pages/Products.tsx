import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Search, ImageIcon, Filter, CheckCircle2, ChevronRight, X, Upload } from 'lucide-react';
import { useApp, Product } from '../context/AppContext';

export default function Products() {
  const { products, categories, addProduct, editProduct, deleteProduct } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isDragging, setIsDragging] = useState(false);

  const [formState, setFormState] = useState({
    name: '',
    category: '',
    price: '',
    stockStatus: 'In Stock',
    image_url: ''
  });

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        handleFileSelect(file);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleFileSelect = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormState(prev => ({ ...prev, image_url: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  // Ensure there is a default category selected if categories exist
  useState(() => {
    if (categories.length > 0 && !formState.category) {
      setFormState(prev => ({ ...prev, category: categories[0].name }));
    }
  });

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormState({
      name: '',
      category: categories[0]?.name || '',
      price: '',
      stockStatus: 'In Stock',
      image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150&q=80'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (prd: Product) => {
    setEditingProduct(prd);
    setFormState({
      name: prd.name,
      category: prd.category,
      price: prd.price.toString(),
      stockStatus: prd.stockStatus,
      image_url: prd.image_url
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name.trim() || !formState.price) return;

    const priceNum = parseFloat(formState.price);
    if (isNaN(priceNum)) return;

    if (editingProduct) {
      editProduct({
        id: editingProduct.id,
        name: formState.name,
        category: formState.category,
        price: priceNum,
        stockStatus: formState.stockStatus,
        image_url: formState.image_url || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150&q=80'
      });
    } else {
      addProduct({
        name: formState.name,
        category: formState.category,
        price: priceNum,
        stockStatus: formState.stockStatus,
        image_url: formState.image_url || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150&q=80'
      });
    }

    setIsModalOpen(false);
  };

  const filteredProducts = products.filter(prd => {
    const matchesSearch = prd.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          prd.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || prd.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-sm text-gray-500 mt-1">Manage catalog details, pricing, stocks, and category definitions.</p>
        </div>
        <button 
          onClick={handleOpenAdd}
          className="inline-flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search products by name or SKU..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-4 py-2 w-full border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1.5 mr-1">
            <Filter className="w-3.5 h-3.5" /> Filter by:
          </span>
          <button 
            onClick={() => setSelectedCategory('All')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${selectedCategory === 'All' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            All Products
          </button>
          {categories.map((c) => (
            <button 
              key={c.id}
              onClick={() => setSelectedCategory(c.name)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${selectedCategory === c.name ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-semibold uppercase text-xs tracking-wider">Product</th>
                <th className="px-6 py-4 font-semibold uppercase text-xs tracking-wider">Category</th>
                <th className="px-6 py-4 font-semibold uppercase text-xs tracking-wider">Price</th>
                <th className="px-6 py-4 font-semibold uppercase text-xs tracking-wider">Status</th>
                <th className="px-6 py-4 font-semibold uppercase text-xs tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 flex-shrink-0 rounded-md bg-gray-100 border border-gray-200 overflow-hidden shadow-inner flex items-center justify-center">
                        {product.image_url ? (
                          <img src={product.image_url} alt={product.name} className="h-full w-full object-cover" />
                        ) : (
                          <ImageIcon className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{product.name}</div>
                        <div className="text-gray-500 text-xs font-mono mt-0.5">{product.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900">৳{product.price.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium whitespace-nowrap
                      ${product.stockStatus === 'In Stock' ? 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20' :
                        product.stockStatus === 'Low Stock' ? 'bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20' :
                        'bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20'
                      }
                    `}>
                      {product.stockStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 group">
                      <button 
                        onClick={() => handleOpenEdit(product)}
                        className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"
                        title="Edit Product"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => deleteProduct(product.id)}
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                        title="Delete Product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-12 text-gray-500">
                    <ImageIcon className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                    <p className="font-medium">No products under this selection</p>
                    <p className="text-xs text-gray-400 mt-1">Try to add new products or adjust search queries.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Dynamic Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingProduct ? 'Edit Product Details' : 'Add New Product'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-500 focus:outline-none">
                 <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                <input 
                  required
                  type="text" 
                  value={formState.name}
                  onChange={(e) => setFormState({...formState, name: e.target.value})}
                  className="w-full h-10 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="e.g. Ergonomic Office Chair"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select 
                    value={formState.category}
                    onChange={(e) => setFormState({...formState, category: e.target.value})}
                    className="w-full h-10 px-3 py-2 border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                    {categories.length === 0 && (
                      <option value="">No categories defined yet</option>
                    )}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price (৳)</label>
                  <input 
                    required
                    type="number" 
                    step="0.01"
                    value={formState.price}
                    onChange={(e) => setFormState({...formState, price: e.target.value})}
                    className="w-full h-10 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="250.00"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Stock Status</label>
                <select 
                  value={formState.stockStatus}
                  onChange={(e) => setFormState({...formState, stockStatus: e.target.value})}
                  className="w-full h-10 px-3 py-2 border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="In Stock">In Stock</option>
                  <option value="Low Stock">Low Stock</option>
                  <option value="Out of Stock">Out of Stock</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Product Image Path</label>
                
                {formState.image_url ? (
                  <div className="relative group rounded-xl border border-dashed border-gray-300 p-4 bg-gray-50 flex flex-col items-center justify-center transition-all">
                    <div className="relative w-32 h-32 rounded-lg overflow-hidden border border-gray-200 shadow-sm bg-white">
                      <img src={formState.image_url} alt="product preview" className="w-full h-full object-cover" />
                    </div>
                    <p className="text-xs text-gray-500 mt-2 font-medium">Image uploaded successfully</p>
                    <button
                      type="button"
                      onClick={() => setFormState(prev => ({ ...prev, image_url: '' }))}
                      className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-50 border border-red-200 rounded-lg text-xs font-semibold text-red-600 hover:bg-red-100/70 hover:text-red-700 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Remove Image
                    </button>
                  </div>
                ) : (
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`relative rounded-xl border-2 border-dashed p-6 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all duration-200 ${isDragging ? 'border-indigo-500 bg-indigo-50/50' : 'border-gray-300 hover:border-gray-400 bg-gray-50/50'}`}
                  >
                    <input 
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center shadow-sm text-gray-400">
                      <Upload className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div className="text-center">
                      <p className="text-xs font-medium text-gray-700">
                        <span className="text-indigo-600 hover:text-indigo-700">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-[10px] text-gray-400 mt-1">PNG, JPG, GIF up to 5MB</p>
                    </div>
                  </div>
                )}
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
                  {editingProduct ? 'Save Changes' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
