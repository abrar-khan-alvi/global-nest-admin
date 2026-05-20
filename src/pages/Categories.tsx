import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Tag, FolderHeart, Info, Search } from 'lucide-react';
import { useApp, Category } from '../context/AppContext';

export default function Categories() {
  const { categories, products, addCategory, editCategory, deleteCategory } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const [formState, setFormState] = useState({
    name: '',
    description: ''
  });

  const getProductCount = (categoryName: string) => {
    return products.filter(p => p.category.toLowerCase() === categoryName.toLowerCase()).length;
  };

  const handleOpenAddModal = () => {
    setEditingCategory(null);
    setFormState({ name: '', description: '' });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (cat: Category) => {
    setEditingCategory(cat);
    setFormState({ name: cat.name, description: cat.description });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name.trim()) return;

    if (editingCategory) {
      editCategory({
        id: editingCategory.id,
        name: formState.name,
        description: formState.description
      });
    } else {
      addCategory({
        name: formState.name,
        description: formState.description
      });
    }
    setIsModalOpen(false);
  };

  const filteredCategories = categories.filter(cat => 
    cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cat.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
          <p className="text-sm text-gray-500 mt-1">Manage nested lists and taxonomy for dynamic store catalogs.</p>
        </div>
        <button 
          onClick={handleOpenAddModal}
          className="inline-flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Category
        </button>
      </div>

      {/* Stats row & Search */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:max-w-xs">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-4 py-2 w-full border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        
        <div className="flex gap-4 self-stretch sm:self-auto ml-auto">
          <div className="bg-white px-4 py-2 rounded-lg border border-gray-200 text-xs text-gray-500 font-medium">
            Total Categories: <span className="text-gray-900 font-semibold">{categories.length}</span>
          </div>
        </div>
      </div>

      {/* Grid List */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
        {filteredCategories.map((category) => {
          const count = getProductCount(category.name);
          return (
            <div 
              key={category.id} 
              className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-sm">
                      <Tag className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">{category.name}</h3>
                      <span className="text-xs text-gray-400 font-mono">{category.id}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button 
                      onClick={() => handleOpenEditModal(category)}
                      className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                      title="Edit Category"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => deleteCategory(category.id)}
                      className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete Category"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mt-4 flex items-start gap-1.5 line-clamp-2">
                  <Info className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  {category.description || 'No description provided.'}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Total Catalog Products</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700">
                  {count} {count === 1 ? 'Product' : 'Products'}
                </span>
              </div>
            </div>
          );
        })}

        {filteredCategories.length === 0 && (
          <div className="col-span-full bg-white border border-gray-200 rounded-xl y-12 py-12 text-center text-gray-500">
            <FolderHeart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="font-medium text-gray-700">No categories found matching your query</p>
            <p className="text-xs text-gray-400 mt-1">Try searching another term or create a new category.</p>
          </div>
        )}
      </div>

      {/* Category Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingCategory ? 'Edit Category' : 'Add New Category'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-500 focus:outline-none">
                 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category Name</label>
                <input 
                  required
                  type="text" 
                  value={formState.name}
                  onChange={(e) => setFormState({...formState, name: e.target.value})}
                  className="w-full h-10 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="e.g. Footwear, Apparels"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea 
                  value={formState.description}
                  onChange={(e) => setFormState({...formState, description: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Describe classification, style, catalog focus, etc."
                />
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
                  {editingCategory ? 'Save Changes' : 'Create Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
