import React, { useState } from 'react';
import ProductSearch from './ProductSearch';
import { useNavigate } from 'react-router-dom';
import {
    MessageSquare,
    ShoppingBag,
    LineChart,
    CreditCard,
    Archive,
    LayoutDashboard,
    Plus,
    Settings,
    LogOut,
    Download,
    Store,
    X,
} from 'lucide-react';

export const Navnew = ({
    activeTab,
    setActiveTab,
    lowStockCount,
    onNewSaleClick,
    onAddProductClick,
    onSettingsClick,
    onLogoutClick,
    onExportClick,
    businessProfile,
    inventory,
}) => {
    const navigate = useNavigate();

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleTabClick = (e, tab) => {
        e.preventDefault();
        setActiveTab(tab);
        setMobileMenuOpen(false);
    };

    const handleMobileTab = (tab) => {
        setActiveTab(tab);
        setMobileMenuOpen(false);
    };

    const handleMobileNewSale = () => {
        setMobileMenuOpen(false);

        if (onNewSaleClick) {
            onNewSaleClick();
        }
    };

    const handleMobileAddProduct = () => {
        setMobileMenuOpen(false);

        if (onAddProductClick) {
            onAddProductClick();
        }
    };

    const handleMobileSettings = () => {
        setMobileMenuOpen(false);

        if (onSettingsClick) {
            onSettingsClick();
        }
    };

    const handleMobileLogout = () => {
        setMobileMenuOpen(false);

        if (onLogoutClick) {
            onLogoutClick();
        }
    };

    const handleVisitSite = () => {
        setMobileMenuOpen(false);
        navigate('/products');
    };

    return (
        <header className="w-full bg-[#faf9f6] text-[#171717] sticky top-0 z-40">

            {/* =====================================================
                TOP BAR
            ====================================================== */}

            <div className="bg-[#344a22] text-white">

                <div className="mx-auto flex h-10 max-w-[1500px] items-center justify-between px-5 sm:px-8 lg:px-12">

                    {/* Business Name */}
                    <div className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-wide">

                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.7"
                            className="h-4 w-4"
                        >
                            <path d="M3 6h11v11H3z" />
                            <path d="M14 9h4l3 3v5h-7z" />
                            <circle cx="7" cy="19" r="2" />
                            <circle cx="18" cy="19" r="2" />
                        </svg>

                        <span>
                            {businessProfile?.businessName ||
                                'Furniture Inventory & Sales'}
                        </span>

                    </div>


                    {/* Top Right */}
                    <div className="hidden items-center gap-5 text-xs text-white/80 md:flex">

                        <button
                            type="button"
                            onClick={() => navigate('/products')}
                            className="flex items-center gap-2 transition hover:text-white"
                        >
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.6"
                                className="h-4 w-4"
                            >
                                <circle cx="12" cy="12" r="8" />
                                <path d="M12 7v5l3 2" />
                            </svg>

                            Visit Site
                        </button>

                        <span className="h-4 w-px bg-white/30" />

                        <button
                            type="button"
                            onClick={onExportClick}
                            className="transition hover:text-white"
                        >
                            Export
                        </button>

                    </div>

                </div>
            </div>


            {/* =====================================================
                MAIN HEADER
            ====================================================== */}

            <div className="border-b border-[#e7e4de]">

                <div className="mx-auto flex min-h-[82px] lg:h-[102px] max-w-[1500px] items-center gap-4 px-5 sm:px-8 lg:px-12">

                    {/* LOGO */}

                    <button
                        type="button"
                        onClick={() => navigate('/admin')}
                        className="flex shrink-0 items-center"
                    >

                        <div className="flex items-center gap-3">

                            {/* Logo Icon */}

                            <div className="relative hidden h-[58px] w-[42px] items-end justify-center sm:flex">

                                <svg
                                    viewBox="0 0 50 70"
                                    fill="none"
                                    className="h-[58px] w-[42px]"
                                >

                                    <path
                                        d="M13 63V28C13 17 19 8 28 8C37 8 43 16 43 27V63"
                                        stroke="#344a22"
                                        strokeWidth="1.5"
                                    />

                                    <path
                                        d="M13 43H40C43 43 45 45 45 48V63H8V48C8 45 10 43 13 43Z"
                                        stroke="#344a22"
                                        strokeWidth="1.5"
                                    />

                                    <path
                                        d="M26 43C25 32 26 23 30 16"
                                        stroke="#344a22"
                                        strokeWidth="1.3"
                                    />

                                    <path
                                        d="M27 29C21 27 19 23 20 19C25 20 28 23 27 29Z"
                                        stroke="#344a22"
                                        strokeWidth="1.2"
                                    />

                                    <path
                                        d="M28 24C32 22 34 18 33 14C29 15 27 19 28 24Z"
                                        stroke="#344a22"
                                        strokeWidth="1.2"
                                    />

                                    <path
                                        d="M27 35C22 34 19 31 19 27C24 28 27 30 27 35Z"
                                        stroke="#344a22"
                                        strokeWidth="1.2"
                                    />

                                </svg>

                            </div>


                            {/* Brand */}

                            <div className="leading-none">

                                <span className="block font-serif text-[22px] sm:text-[28px] lg:text-[38px] font-semibold tracking-tight text-[#344a22]">
                                    IGNACIO
                                </span>

                                <span className="mt-1 block text-[7px] sm:text-[8px] font-medium uppercase tracking-[0.45em] text-[#789052]">
                                    Furnitures
                                </span>

                            </div>

                        </div>

                    </button>


                    {/* SEARCH */}

                    <div className="mx-auto hidden max-w-[540px] flex-1 lg:block">

                        <ProductSearch
                            inventory={inventory}
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                        />

                    </div>


                    {/* RIGHT HEADER ACTIONS */}

                    <div className="ml-auto flex items-center gap-3 sm:gap-5 lg:gap-7">

                        {/* Add Furniture */}

                        <button
                            type="button"
                            onClick={onAddProductClick}
                            className="group hidden sm:flex flex-col items-center gap-1"
                        >

                            <Plus
                                className="h-6 w-6 transition group-hover:text-[#344a22]"
                                strokeWidth={1.6}
                            />

                            <span className="text-[11px]">
                                Add Furniture
                            </span>

                        </button>


                        {/* New Sale */}

                        <button
                            type="button"
                            onClick={onNewSaleClick}
                            className="group hidden lg:flex flex-col items-center gap-1"
                        >

                            <ShoppingBag
                                className="h-6 w-6 transition group-hover:text-[#344a22]"
                                strokeWidth={1.6}
                            />

                            <span className="text-[11px]">
                                New Sale
                            </span>

                        </button>


                        {/* Settings */}

                        <button
                            type="button"
                            onClick={onSettingsClick}
                            className="group hidden sm:flex flex-col items-center gap-1"
                        >

                            <Settings
                                className="h-6 w-6 transition group-hover:text-[#344a22]"
                                strokeWidth={1.6}
                            />

                            <span className="text-[11px]">
                                Settings
                            </span>

                        </button>


                        {/* Logout */}

                        <button
                            type="button"
                            onClick={onLogoutClick}
                            className="group hidden sm:flex flex-col items-center gap-1"
                        >

                            <LogOut
                                className="h-6 w-6 transition group-hover:text-[#344a22]"
                                strokeWidth={1.6}
                            />

                            <span className="text-[11px]">
                                Logout
                            </span>

                        </button>


                        {/* MOBILE MENU BUTTON */}

                        <button
                            type="button"
                            onClick={() =>
                                setMobileMenuOpen(!mobileMenuOpen)
                            }
                            className="flex lg:hidden h-10 w-10 items-center justify-center rounded-full border border-[#ddd9d0] bg-[#faf9f6] text-[#171717] transition hover:bg-[#eeeae2]"
                            aria-label="Toggle mobile menu"
                            aria-expanded={mobileMenuOpen}
                        >

                            {mobileMenuOpen ? (
                                <X
                                    className="h-5 w-5"
                                    strokeWidth={1.8}
                                />
                            ) : (
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    className="h-5 w-5"
                                >
                                    <path d="M4 6h16" />
                                    <path d="M4 12h16" />
                                    <path d="M4 18h16" />
                                </svg>
                            )}

                        </button>

                    </div>

                </div>
            </div>


            {/* =====================================================
                DESKTOP NAVIGATION
            ====================================================== */}

            <nav className="hidden border-b border-[#e7e4de] lg:block">

                <div className="mx-auto flex h-[76px] max-w-[1500px] items-center gap-10 px-5 sm:px-8 lg:px-12">

                    {/* OVERVIEW */}

                    <AdminNavItem
                        icon={<LayoutDashboard size={20} />}
                        title="Overview"
                        subtitle="Dashboard"
                        active={activeTab === 'overview'}
                        onClick={(e) =>
                            handleTabClick(e, 'overview')
                        }
                    />


                    {/* INVENTORY */}

                    <AdminNavItem
                        icon={<Archive size={20} />}
                        title={
                            <>
                                Inventory

                                {lowStockCount > 0 && (
                                    <span className="ml-1.5 inline-flex min-w-[18px] items-center justify-center rounded-full bg-red-500 px-1.5 py-0.5 text-[10px] font-bold text-white animate-pulse">
                                        {lowStockCount}
                                    </span>
                                )}
                            </>
                        }
                        subtitle="Furniture Stock"
                        active={activeTab === 'inventory'}
                        onClick={(e) =>
                            handleTabClick(e, 'inventory')
                        }
                    />


                    {/* SALES */}

                    <AdminNavItem
                        icon={<CreditCard size={20} />}
                        title="Orders & Sales"
                        subtitle="Orders & Transactions"
                        active={activeTab === 'sales'}
                        onClick={(e) =>
                            handleTabClick(e, 'sales')
                        }
                    />


                    {/* ANALYTICS */}

                    <AdminNavItem
                        icon={<LineChart size={20} />}
                        title="Analytics"
                        subtitle="Sales & Performance"
                        active={activeTab === 'analytics'}
                        onClick={(e) =>
                            handleTabClick(e, 'analytics')
                        }
                        hasArrow
                    />


                    {/* STOCK LOGS */}

                    <AdminNavItem
                        icon={<ShoppingBag size={20} />}
                        title="Stock Logs"
                        subtitle="Stock Movements"
                        active={activeTab === 'movements'}
                        onClick={(e) =>
                            handleTabClick(e, 'movements')
                        }
                    />


                    {/* REVIEWS */}

                    <AdminNavItem
                        icon={<MessageSquare size={20} />}
                        title="Reviews"
                        subtitle="Customer Reviews"
                        active={activeTab === 'reviews'}
                        onClick={(e) =>
                            handleTabClick(e, 'reviews')
                        }
                    />


                    {/* NEW SALE */}

                    <button
                        type="button"
                        onClick={onNewSaleClick}
                        className="ml-auto flex h-[58px] items-center gap-4 rounded-full bg-[#344a22] px-4 pr-6 text-white transition hover:bg-[#283a1a]"
                    >

                        <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-[#ddd8cc]">

                            <ShoppingBag
                                size={22}
                                strokeWidth={1.5}
                                className="text-[#344a22]"
                            />

                        </div>

                        <div className="leading-tight text-left">

                            <span className="block text-[13px] font-semibold">
                                New Sale (POS)
                            </span>

                            <span className="block text-[10px] text-white/70">
                                Create New Order
                            </span>

                        </div>

                        <span className="ml-1 text-lg">
                            →
                        </span>

                    </button>

                </div>

            </nav>


            {/* =====================================================
                MOBILE MENU BAR
            ====================================================== */}

            <div className="border-b border-[#e7e4de] lg:hidden">

                <div className="hidden flex h-14 items-center justify-between px-5">

                    <button
                        type="button"
                        onClick={() =>
                            setMobileMenuOpen(!mobileMenuOpen)
                        }
                        className="hidden flex items-center gap-3 text-xs font-medium uppercase tracking-[0.15em]"
                        aria-expanded={mobileMenuOpen}
                    >

                        {mobileMenuOpen ? (
                            <X
                                className="h-5 w-5"
                                strokeWidth={1.7}
                            />
                        ) : (
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.7"
                                className="h-5 w-5"
                            >
                                <path d="M4 6h16" />
                                <path d="M4 12h16" />
                                <path d="M4 18h16" />
                            </svg>
                        )}

                        {mobileMenuOpen ? 'Close' : 'Menu'}

                    </button>


                    <button
                        type="button"
                        onClick={handleMobileNewSale}
                        className="rounded-full bg-[#344a22] px-5 py-2.5 text-[10px] font-semibold uppercase tracking-wide text-white"
                    >
                        New Sale
                    </button>

                </div>

            </div>


            {/* =====================================================
                MOBILE MENU
            ====================================================== */}

            {mobileMenuOpen && (

                <div className="lg:hidden border-b border-[#e7e4de] bg-[#faf9f6]">

                    <div className="px-5 py-5">

                        {/* SEARCH */}

                        <div className="mb-5">

                            <ProductSearch
                                inventory={inventory}
                                activeTab={activeTab}
                                setActiveTab={(tab) => {
                                    setActiveTab(tab);
                                    setMobileMenuOpen(false);
                                }}
                            />

                        </div>


                        {/* MOBILE NAVIGATION */}

                        <div className="space-y-1">

                            <MobileAdminNavItem
                                icon={<LayoutDashboard size={19} />}
                                title="Overview"
                                subtitle="Dashboard"
                                active={activeTab === 'overview'}
                                onClick={() =>
                                    handleMobileTab('overview')
                                }
                            />

                            <MobileAdminNavItem
                                icon={<Archive size={19} />}
                                title="Inventory"
                                subtitle="Furniture Stock"
                                active={activeTab === 'inventory'}
                                badge={lowStockCount}
                                onClick={() =>
                                    handleMobileTab('inventory')
                                }
                            />

                            <MobileAdminNavItem
                                icon={<CreditCard size={19} />}
                                title="Orders & Sales"
                                subtitle="Orders & Transactions"
                                active={activeTab === 'sales'}
                                onClick={() =>
                                    handleMobileTab('sales')
                                }
                            />

                            <MobileAdminNavItem
                                icon={<LineChart size={19} />}
                                title="Analytics"
                                subtitle="Sales & Performance"
                                active={activeTab === 'analytics'}
                                onClick={() =>
                                    handleMobileTab('analytics')
                                }
                            />

                            <MobileAdminNavItem
                                icon={<ShoppingBag size={19} />}
                                title="Stock Logs"
                                subtitle="Stock Movements"
                                active={activeTab === 'movements'}
                                onClick={() =>
                                    handleMobileTab('movements')
                                }
                            />

                            <MobileAdminNavItem
                                icon={<MessageSquare size={19} />}
                                title="Reviews"
                                subtitle="Customer Reviews"
                                active={activeTab === 'reviews'}
                                onClick={() =>
                                    handleMobileTab('reviews')
                                }
                            />

                        </div>


                        {/* ACTIONS */}

                        <div className="mt-5 border-t border-[#e7e4de] pt-5">

                            <div className="grid grid-cols-2 gap-3">

                                {/* Add Furniture */}

                                <button
                                    type="button"
                                    onClick={handleMobileAddProduct}
                                    className="flex items-center gap-3 rounded-xl border border-[#ddd9d0] bg-white px-4 py-3 text-left transition hover:border-[#344a22] hover:bg-[#f5f3ee]"
                                >

                                    <Plus
                                        size={19}
                                        strokeWidth={1.7}
                                        className="text-[#344a22]"
                                    />

                                    <div>

                                        <span className="block text-xs font-semibold">
                                            Add Furniture
                                        </span>

                                        <span className="block text-[9px] text-stone-400">
                                            New Product
                                        </span>

                                    </div>

                                </button>


                                {/* Settings */}

                                <button
                                    type="button"
                                    onClick={handleMobileSettings}
                                    className="flex items-center gap-3 rounded-xl border border-[#ddd9d0] bg-white px-4 py-3 text-left transition hover:border-[#344a22] hover:bg-[#f5f3ee]"
                                >

                                    <Settings
                                        size={19}
                                        strokeWidth={1.7}
                                        className="text-[#344a22]"
                                    />

                                    <div>

                                        <span className="block text-xs font-semibold">
                                            Settings
                                        </span>

                                        <span className="block text-[9px] text-stone-400">
                                            Business Settings
                                        </span>

                                    </div>

                                </button>


                                {/* Export */}

                                <button
                                    type="button"
                                    onClick={() => {
                                        setMobileMenuOpen(false);

                                        if (onExportClick) {
                                            onExportClick();
                                        }
                                    }}
                                    className="flex items-center gap-3 rounded-xl border border-[#ddd9d0] bg-white px-4 py-3 text-left transition hover:border-[#344a22] hover:bg-[#f5f3ee]"
                                >

                                    <Download
                                        size={19}
                                        strokeWidth={1.7}
                                        className="text-[#344a22]"
                                    />

                                    <div>

                                        <span className="block text-xs font-semibold">
                                            Export
                                        </span>

                                        <span className="block text-[9px] text-stone-400">
                                            Export Reports
                                        </span>

                                    </div>

                                </button>


                                {/* Visit Site */}

                                <button
                                    type="button"
                                    onClick={handleVisitSite}
                                    className="flex items-center gap-3 rounded-xl border border-[#ddd9d0] bg-white px-4 py-3 text-left transition hover:border-[#344a22] hover:bg-[#f5f3ee]"
                                >

                                    <Store
                                        size={19}
                                        strokeWidth={1.7}
                                        className="text-[#344a22]"
                                    />

                                    <div>

                                        <span className="block text-xs font-semibold">
                                            Visit Site
                                        </span>

                                        <span className="block text-[9px] text-stone-400">
                                            View Website
                                        </span>

                                    </div>

                                </button>

                            </div>


                            {/* Logout */}

                            <button
                                type="button"
                                onClick={handleMobileLogout}
                                className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-semibold text-red-600 transition hover:bg-red-100"
                            >

                                <LogOut
                                    size={17}
                                    strokeWidth={1.7}
                                />

                                Logout

                            </button>

                        </div>

                    </div>

                </div>

            )}

        </header>
    );
};


/* =========================================================
   DESKTOP NAV ITEM
========================================================= */

function AdminNavItem({
    icon,
    title,
    subtitle,
    active,
    onClick,
    hasArrow = false,
}) {
    return (
        <a
            href="#"
            onClick={onClick}
            className="group flex items-center gap-3"
        >

            <div
                className={`flex h-9 w-9 items-center justify-center transition ${
                    active
                        ? 'text-[#d88900]'
                        : 'text-[#171717]'
                }`}
            >
                {icon}
            </div>

            <div className="leading-tight">

                <div className="flex items-center gap-2">

                    <span
                        className={`text-[12px] font-semibold uppercase tracking-wide transition ${
                            active
                                ? 'text-[#d88900]'
                                : 'text-[#171717]'
                        }`}
                    >
                        {title}
                    </span>

                    {hasArrow && (
                        <svg
                            viewBox="0 0 20 20"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            className="h-3 w-3 text-stone-400 transition group-hover:translate-y-0.5"
                        >
                            <path d="m5 7 5 5 5-5" />
                        </svg>
                    )}

                </div>

                <span className="mt-1 block text-[9px] text-stone-400">
                    {subtitle}
                </span>

            </div>

        </a>
    );
}


/* =========================================================
   MOBILE NAV ITEM
========================================================= */

function MobileAdminNavItem({
    icon,
    title,
    subtitle,
    active,
    badge = 0,
    onClick,
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`flex w-full items-center gap-4 rounded-xl px-4 py-3.5 text-left transition ${
                active
                    ? 'bg-[#344a22] text-white'
                    : 'text-[#171717] hover:bg-[#f0ede6]'
            }`}
        >

            {/* Icon */}

            <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                    active
                        ? 'bg-white/10'
                        : 'bg-[#eeeae2]'
                }`}
            >
                {icon}
            </div>


            {/* Text */}

            <div className="min-w-0 flex-1">

                <div className="flex items-center gap-2">

                    <span className="text-xs font-semibold uppercase tracking-wide">
                        {title}
                    </span>

                    {badge > 0 && (
                        <span className="inline-flex min-w-[19px] items-center justify-center rounded-full bg-red-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
                            {badge}
                        </span>
                    )}

                </div>

                <span
                    className={`mt-1 block text-[9px] ${
                        active
                            ? 'text-white/60'
                            : 'text-stone-400'
                    }`}
                >
                    {subtitle}
                </span>

            </div>


            {/* Arrow */}

            <svg
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className={`h-4 w-4 ${
                    active
                        ? 'text-white/60'
                        : 'text-stone-400'
                }`}
            >
                <path d="m7 5 5 5-5 5" />
            </svg>

        </button>
    );
};

export default Navnew;