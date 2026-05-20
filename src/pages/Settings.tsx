import React, { useState } from 'react';
import { Save, Upload, Image as ImageIcon, CheckCircle2 } from 'lucide-react';

export default function Settings() {
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [images, setImages] = useState({
    logo: '/logo.png',
    desktopHero: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80',
    mobileHero: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=400&q=80',
    promoBanner: 'https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?auto=format&fit=crop&w=800&q=80',
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1000);
  };

  return (
    <div className="space-y-6 max-w-4xl relative">
      {/* Success Notification */}
      {showSuccess && (
        <div className="fixed top-20 right-4 sm:right-8 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-4 py-3 rounded-lg shadow-lg flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span className="font-medium">Settings saved successfully!</span>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Store Information</h2>
          <p className="mt-1 text-sm text-gray-500">Update your store's basic information and contact details.</p>
        </div>
        
        <form className="p-6 space-y-8" onSubmit={handleSave}>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-2 col-span-full">
              <label htmlFor="storeName" className="block text-sm font-medium text-gray-700">Store Name</label>
              <input 
                type="text" 
                id="storeName" 
                defaultValue="Global Nest"
                className="w-full h-10 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-shadow"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="supportEmail" className="block text-sm font-medium text-gray-700">Support Email</label>
              <input 
                type="email" 
                id="supportEmail" 
                defaultValue="support@globalnest.com"
                className="w-full h-10 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-shadow"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="supportPhone" className="block text-sm font-medium text-gray-700">Support Phone</label>
              <input 
                type="tel" 
                id="supportPhone" 
                defaultValue="+1 (555) 123-4567"
                className="w-full h-10 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-shadow"
              />
            </div>

            <div className="space-y-2 col-span-full">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">Physical Address</label>
              <textarea 
                id="address" 
                rows={3}
                defaultValue="123 Business Avenue, Tech Park&#10;Dhaka 1216, Bangladesh"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-shadow"
              />
            </div>
          </div>

          <hr className="border-gray-200" />
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Delivery Charges</h3>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="deliveryInside" className="block text-sm font-medium text-gray-700">Inside Dhaka (৳)</label>
                <input 
                  type="number" 
                  id="deliveryInside" 
                  defaultValue="60"
                  className="w-full h-10 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-shadow"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="deliveryOutside" className="block text-sm font-medium text-gray-700">Outside Dhaka (৳)</label>
                <input 
                  type="number" 
                  id="deliveryOutside" 
                  defaultValue="120"
                  className="w-full h-10 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-shadow"
                />
              </div>
            </div>
          </div>

          <hr className="border-gray-200" />
          
          <div>
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Graphical Images / Media Management</h3>
              <p className="mt-1 text-sm text-gray-500">Manage key website assets and banners. Provide an image URL or upload a new file.</p>
            </div>

            <div className="space-y-8">
              {/* Store Logo */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 bg-gray-50/50 p-4 rounded-xl border border-gray-100">
                <div className="sm:col-span-4">
                  <span className="block text-sm font-medium text-gray-900">Store Logo</span>
                  <span className="block text-xs text-gray-500 mt-1">Recommended size: 200x50px. Appears in the top navigation.</span>
                  <div className="mt-4 w-full max-w-[200px] h-20 bg-white border border-gray-200 rounded-lg flex items-center justify-center overflow-hidden shadow-sm">
                    {images.logo ? (
                      <img src={images.logo} alt="Store Logo" className="max-h-full max-w-full object-contain p-2" />
                    ) : (
                      <ImageIcon className="w-8 h-8 text-gray-300" />
                    )}
                  </div>
                </div>
                <div className="sm:col-span-8 flex flex-col justify-center space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Image URL</label>
                    <input 
                      type="url" 
                      value={images.logo}
                      onChange={(e) => setImages({...images, logo: e.target.value})}
                      className="w-full h-9 px-3 py-1.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 border-t border-gray-200"></div>
                    <span className="text-xs font-medium text-gray-400 uppercase">or</span>
                    <div className="flex-1 border-t border-gray-200"></div>
                  </div>
                  <div>
                    <button type="button" className="inline-flex items-center justify-center px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-sm transition-colors">
                      <Upload className="w-4 h-4 mr-2 text-gray-500" />
                      Upload File
                    </button>
                  </div>
                </div>
              </div>

              {/* Desktop Hero Banner */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 bg-gray-50/50 p-4 rounded-xl border border-gray-100">
                <div className="sm:col-span-4">
                  <span className="block text-sm font-medium text-gray-900">Main Hero Banner (Desktop)</span>
                  <span className="block text-xs text-gray-500 mt-1">Recommended size: 1920x800px. High-resolution banner for large screens.</span>
                  <div className="mt-4 w-full aspect-video bg-white border border-gray-200 rounded-lg flex items-center justify-center overflow-hidden shadow-sm">
                    {images.desktopHero ? (
                      <img src={images.desktopHero} alt="Desktop Hero" className="w-full h-full object-cover" />
                    ) : (
                      <ImageIcon className="w-8 h-8 text-gray-300" />
                    )}
                  </div>
                </div>
                <div className="sm:col-span-8 flex flex-col justify-center space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Image URL</label>
                    <input 
                      type="url" 
                      value={images.desktopHero}
                      onChange={(e) => setImages({...images, desktopHero: e.target.value})}
                      className="w-full h-9 px-3 py-1.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 border-t border-gray-200"></div>
                    <span className="text-xs font-medium text-gray-400 uppercase">or</span>
                    <div className="flex-1 border-t border-gray-200"></div>
                  </div>
                  <div>
                    <button type="button" className="inline-flex items-center justify-center px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-sm transition-colors">
                      <Upload className="w-4 h-4 mr-2 text-gray-500" />
                      Upload File
                    </button>
                  </div>
                </div>
              </div>

              {/* Mobile Hero Banner */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 bg-gray-50/50 p-4 rounded-xl border border-gray-100">
                <div className="sm:col-span-4">
                  <span className="block text-sm font-medium text-gray-900">Hero Banner (Mobile)</span>
                  <span className="block text-xs text-gray-500 mt-1">Recommended size: 800x1200px. Portrait format for phone screens.</span>
                  <div className="mt-4 w-32 aspect-[3/4] bg-white border border-gray-200 rounded-lg flex items-center justify-center overflow-hidden shadow-sm mx-auto sm:mx-0">
                    {images.mobileHero ? (
                      <img src={images.mobileHero} alt="Mobile Hero" className="w-full h-full object-cover" />
                    ) : (
                      <ImageIcon className="w-8 h-8 text-gray-300" />
                    )}
                  </div>
                </div>
                <div className="sm:col-span-8 flex flex-col justify-center space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Image URL</label>
                    <input 
                      type="url" 
                      value={images.mobileHero}
                      onChange={(e) => setImages({...images, mobileHero: e.target.value})}
                      className="w-full h-9 px-3 py-1.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 border-t border-gray-200"></div>
                    <span className="text-xs font-medium text-gray-400 uppercase">or</span>
                    <div className="flex-1 border-t border-gray-200"></div>
                  </div>
                  <div>
                    <button type="button" className="inline-flex items-center justify-center px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-sm transition-colors">
                      <Upload className="w-4 h-4 mr-2 text-gray-500" />
                      Upload File
                    </button>
                  </div>
                </div>
              </div>

              {/* Promotional Banner */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 bg-gray-50/50 p-4 rounded-xl border border-gray-100">
                <div className="sm:col-span-4">
                  <span className="block text-sm font-medium text-gray-900">Promotional Banner</span>
                  <span className="block text-xs text-gray-500 mt-1">Recommended size: 1200x400px. Appears in category pages or promotional sections.</span>
                  <div className="mt-4 w-full aspect-[3/1] bg-white border border-gray-200 rounded-lg flex items-center justify-center overflow-hidden shadow-sm">
                    {images.promoBanner ? (
                      <img src={images.promoBanner} alt="Promo Banner" className="w-full h-full object-cover" />
                    ) : (
                      <ImageIcon className="w-8 h-8 text-gray-300" />
                    )}
                  </div>
                </div>
                <div className="sm:col-span-8 flex flex-col justify-center space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Image URL</label>
                    <input 
                      type="url" 
                      value={images.promoBanner}
                      onChange={(e) => setImages({...images, promoBanner: e.target.value})}
                      className="w-full h-9 px-3 py-1.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 border-t border-gray-200"></div>
                    <span className="text-xs font-medium text-gray-400 uppercase">or</span>
                    <div className="flex-1 border-t border-gray-200"></div>
                  </div>
                  <div>
                    <button type="button" className="inline-flex items-center justify-center px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-sm transition-colors">
                      <Upload className="w-4 h-4 mr-2 text-gray-500" />
                      Upload File
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div className="pt-6 flex justify-end gap-3 border-t border-gray-200 mt-8">
            <button 
              type="submit" 
              disabled={isSaving}
              className={`inline-flex items-center justify-center px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-sm transition-all ${isSaving ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isSaving ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
