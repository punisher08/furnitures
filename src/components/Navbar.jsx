import React from 'react';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  TrendingUp,
  History,
  PlusCircle,
  ShoppingCart,
  Settings,
  Download,
  Store,
} from 'lucide-react';

export const Navbar = ({
  activeTab,
  setActiveTab,
  lowStockCount,
  onNewSaleClick,
  onAddProductClick,
  onSettingsClick,
  onExportClick,
  businessProfile,
}) => {
  return (
    <header className="bg-stone-900 text-stone-100 border-b border-stone-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* =========================
            TOP HEADER
        ========================== */}
        <div className="flex items-center justify-between h-16">

          {/* Brand Logo & Name */}
          <div
            className="flex items-center space-x-3 cursor-pointer min-w-0"
            onClick={() => setActiveTab('overview')}
          >
            {/* Logo */}
            <div className="w-10 h-10 flex-shrink-0 rounded-lg bg-amber-600/90 text-stone-950 flex items-center justify-center font-serif font-bold text-xl shadow-inner">
              <Store className="w-5 h-5 text-stone-950" />
            </div>

            {/* Brand Text */}
            <div className="min-w-0">
              <div className="flex items-center space-x-2">
                <span className="font-serif font-bold text-lg text-amber-50 tracking-tight truncate max-w-[150px] sm:max-w-none">
                  {businessProfile?.storeName || 'Ignacio Furnitures'}
                </span>

                <span className="hidden sm:inline-block text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Dashboard
                </span>
              </div>

              <p className="text-xs text-stone-400 font-sans hidden sm:block">
                Inventory & Sales Suite
              </p>
            </div>
          </div>

          {/* =========================
              DESKTOP NAVIGATION
          ========================== */}
          <nav className="hidden md:flex items-center space-x-1">

            {/* Overview */}
            <button
              id="nav-tab-overview"
              onClick={() => setActiveTab('overview')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'overview'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-stone-300 hover:text-white hover:bg-stone-800'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Overview</span>
            </button>

            {/* Inventory */}
            <button
              id="nav-tab-inventory"
              onClick={() => setActiveTab('inventory')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors relative ${
                activeTab === 'inventory'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-stone-300 hover:text-white hover:bg-stone-800'
              }`}
            >
              <Package className="w-4 h-4" />

              <span>Inventory</span>

              {lowStockCount > 0 && (
                <span className="ml-1.5 px-1.5 py-0.5 text-[11px] font-bold rounded-full bg-red-500 text-white animate-pulse">
                  {lowStockCount}
                </span>
              )}
            </button>

            {/* Orders & Sales */}
            <button
              id="nav-tab-sales"
              onClick={() => setActiveTab('sales')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'sales'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-stone-300 hover:text-white hover:bg-stone-800'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Orders & Sales</span>
            </button>

            {/* Analytics */}
            <button
              id="nav-tab-analytics"
              onClick={() => setActiveTab('analytics')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'analytics'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-stone-300 hover:text-white hover:bg-stone-800'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>Analytics</span>
            </button>

            {/* Stock Logs */}
            <button
              id="nav-tab-movements"
              onClick={() => setActiveTab('movements')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'movements'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-stone-300 hover:text-white hover:bg-stone-800'
              }`}
            >
              <History className="w-4 h-4" />
              <span>Stock Logs</span>
            </button>
          </nav>

          {/* =========================
              ACTION BUTTONS
          ========================== */}
          <div className="flex items-center space-x-1.5 sm:space-x-3 flex-shrink-0">

            {/* New Sale */}
            <button
              id="btn-quick-new-sale"
              onClick={onNewSaleClick}
              className="
                flex items-center gap-1.5
                bg-emerald-600 hover:bg-emerald-500
                text-white
                px-2.5 sm:px-3.5
                py-1.5
                rounded-lg
                text-sm font-semibold
                shadow-sm
                transition-all
                hover:shadow
                active:scale-95
              "
              title="Open Point of Sale / Create New Furniture Sale"
            >
              <ShoppingCart className="w-4 h-4" />

              <span className="hidden sm:inline">
                New Sale (POS)
              </span>

              <span className="sm:hidden">
                Sale
              </span>
            </button>

            {/* Add Furniture - Desktop Only */}
            <button
              id="btn-quick-add-item"
              onClick={onAddProductClick}
              className="
                hidden lg:flex
                items-center gap-1.5
                bg-stone-800 hover:bg-stone-700
                text-amber-200
                border border-amber-500/30
                px-3 py-1.5
                rounded-lg
                text-sm font-medium
                transition-colors
              "
              title="Add New Furniture Item to Inventory"
            >
              <PlusCircle className="w-4 h-4 text-amber-400" />
              <span>Add Furniture</span>
            </button>

            {/* Export - Hidden on small mobile */}
            <button
              id="btn-export-reports"
              onClick={onExportClick}
              className="
                hidden sm:flex
                p-2
                text-stone-400
                hover:text-stone-100
                hover:bg-stone-800
                rounded-lg
                transition-colors
              "
              title="Export Inventory & Sales Data"
            >
              <Download className="w-4 h-4" />
            </button>

            {/* Settings */}
            <button
              id="btn-business-settings"
              onClick={onSettingsClick}
              className="
                p-2
                text-stone-400
                hover:text-stone-100
                hover:bg-stone-800
                rounded-lg
                transition-colors
              "
              title="Store Settings & Taxes"
            >
              <Settings className="w-4 h-4" />
            </button>

          </div>
        </div>

        {/* =========================
            MOBILE NAVIGATION
        ========================== */}
        <div className="md:hidden -mx-4 sm:-mx-6 border-t border-stone-800">

          <nav
            className="
              flex items-center
              gap-1
              px-4 sm:px-6
              py-2.5
              overflow-x-auto
              whitespace-nowrap
              scrollbar-none
            "
          >

            {/* Overview */}
            <button
              id="mobile-nav-tab-overview"
              onClick={() => setActiveTab('overview')}
              className={`
                flex-shrink-0
                px-3.5 py-2
                rounded-lg
                text-xs
                font-medium
                transition-all
                ${
                  activeTab === 'overview'
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800'
                }
              `}
            >
              Overview
            </button>

            {/* Inventory */}
            <button
              id="mobile-nav-tab-inventory"
              onClick={() => setActiveTab('inventory')}
              className={`
                flex-shrink-0
                px-3.5 py-2
                rounded-lg
                text-xs
                font-medium
                transition-all
                ${
                  activeTab === 'inventory'
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800'
                }
              `}
            >
              Inventory

              {lowStockCount > 0 && (
                <span
                  className={`ml-1.5 ${
                    activeTab === 'inventory'
                      ? 'text-white'
                      : 'text-red-400'
                  }`}
                >
                  ({lowStockCount})
                </span>
              )}
            </button>

            {/* Orders & Sales */}
            <button
              id="mobile-nav-tab-sales"
              onClick={() => setActiveTab('sales')}
              className={`
                flex-shrink-0
                px-3.5 py-2
                rounded-lg
                text-xs
                font-medium
                transition-all
                ${
                  activeTab === 'sales'
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800'
                }
              `}
            >
              Orders & Sales
            </button>

            {/* Analytics */}
            <button
              id="mobile-nav-tab-analytics"
              onClick={() => setActiveTab('analytics')}
              className={`
                flex-shrink-0
                px-3.5 py-2
                rounded-lg
                text-xs
                font-medium
                transition-all
                ${
                  activeTab === 'analytics'
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800'
                }
              `}
            >
              Analytics
            </button>

            {/* Stock Logs */}
            <button
              id="mobile-nav-tab-movements"
              onClick={() => setActiveTab('movements')}
              className={`
                flex-shrink-0
                px-3.5 py-2
                rounded-lg
                text-xs
                font-medium
                transition-all
                ${
                  activeTab === 'movements'
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800'
                }
              `}
            >
              Stock Logs
            </button>

          </nav>
        </div>

      </div>
    </header>
  );
};