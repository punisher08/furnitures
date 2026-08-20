import ProductSearch from './ProductSearch';
import { useNavigate } from 'react-router-dom';

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
    inventory
}) => {
    const navigate = useNavigate();
    const handleTabClick = (e, tab) => {
        e.preventDefault();
        setActiveTab(tab);
    };

    return (
        <header className="w-full bg-[#faf9f6] text-[#171717] sticky top-0 z-40 ">

            {/* TOP BAR */}
            <div className="bg-[#344a22] text-white">
                <div
                    className="mx-auto flex h-10 max-w-[1500px] items-center justify-between px-5 sm:px-8 lg:px-12"
                >
                    <div
                        className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-wide"
                    >
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.7"
                            className="h-4 w-4"
                        >
                            <path d="M3 6h11v11H3z"></path>
                            <path d="M14 9h4l3 3v5h-7z"></path>
                            <circle cx="7" cy="19" r="2"></circle>
                            <circle cx="18" cy="19" r="2"></circle>
                        </svg>

                        <span>
                            {businessProfile?.businessName || 'Furniture Inventory & Sales'}
                        </span>
                    </div>

                    <div className="hidden items-center gap-5 text-xs text-white/80 md:flex">

                        <button
                            type="button"
                            onClick={(e) => navigate('/products')}
                            className="flex items-center gap-2 transition hover:text-white"
                        >
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.6"
                                className="h-4 w-4"
                            >
                                <circle cx="12" cy="12" r="8"></circle>
                                <path d="M12 7v5l3 2"></path>
                            </svg>

                            Visit Site
                        </button>

                        <span className="h-4 w-px bg-white/30"></span>

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


            {/* MAIN HEADER */}
            <div className="border-b border-[#e7e4de]">
                <div
                    className="mx-auto flex h-[102px] max-w-[1500px] items-center gap-8 px-5 sm:px-8 lg:px-12"
                >

                    {/* LOGO */}
                    <button
                        type="button"
                        onClick={() => {navigate('/admin')}}
                        className="flex shrink-0 items-center"
                    >
                        <div className="flex items-center gap-3">

                            <div
                                className="relative flex h-[58px] w-[42px] items-end justify-center"
                            >
                                <svg
                                    viewBox="0 0 50 70"
                                    fill="none"
                                    className="h-[58px] w-[42px]"
                                >
                                    <path
                                        d="M13 63V28C13 17 19 8 28 8C37 8 43 16 43 27V63"
                                        stroke="#344a22"
                                        strokeWidth="1.5"
                                    ></path>

                                    <path
                                        d="M13 43H40C43 43 45 45 45 48V63H8V48C8 45 10 43 13 43Z"
                                        stroke="#344a22"
                                        strokeWidth="1.5"
                                    ></path>

                                    <path
                                        d="M26 43C25 32 26 23 30 16"
                                        stroke="#344a22"
                                        strokeWidth="1.3"
                                    ></path>

                                    <path
                                        d="M27 29C21 27 19 23 20 19C25 20 28 23 27 29Z"
                                        stroke="#344a22"
                                        strokeWidth="1.2"
                                    ></path>

                                    <path
                                        d="M28 24C32 22 34 18 33 14C29 15 27 19 28 24Z"
                                        stroke="#344a22"
                                        strokeWidth="1.2"
                                    ></path>

                                    <path
                                        d="M27 35C22 34 19 31 19 27C24 28 27 30 27 35Z"
                                        stroke="#344a22"
                                        strokeWidth="1.2"
                                    ></path>
                                </svg>
                            </div>

                            <div
                                className="leading-none"
                            >
                                <span
                                    className="text-[20px] lg:text-[38px] block font-serif font-semibold tracking-tight text-[#344a22]"
                                >
                                    IGNACIO
                                </span>

                                <span
                                    className="mt-1 block text-[8px] font-medium uppercase tracking-[0.45em] text-[#789052]"
                                >
                                    Furnitures
                                </span>
                            </div>

                        </div>
                    </button>


                    {/* SEARCH */}
                    <div className="mx-auto hidden max-w-[540px] flex-1 lg:block">
                        <ProductSearch inventory={inventory} activeTab={activeTab} setActiveTab={setActiveTab} />
                    </div>


                    {/* RIGHT HEADER ACTIONS */}
                    <div className="ml-auto flex items-center gap-5 sm:gap-7">

                        {/* Add Furniture */}
                        <button
                            type="button"
                            onClick={onAddProductClick}
                            className="group hidden flex-col items-center gap-1 sm:flex"
                        >
                            <div className="relative">

                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.6"
                                    className="h-6 w-6 transition group-hover:text-[#344a22]"
                                >
                                    <circle cx="12" cy="12" r="8"></circle>
                                    <path d="M12 8v8"></path>
                                    <path d="M8 12h8"></path>
                                </svg>

                            </div>

                            <span className="text-[11px]">
                                Add Furniture
                            </span>
                        </button>


                        {/* New Sale */}
                        <button
                            type="button"
                            onClick={onNewSaleClick}
                            className="group flex flex-col items-center gap-1 hidden lg:block"
                        >
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.6"
                                className="h-6 w-6 transition group-hover:text-[#344a22]"
                            >
                                <path d="M4 7h16l-1.5 10H5.5L4 7Z"></path>
                                <path d="M8 7V5a4 4 0 0 1 8 0v2"></path>
                                <circle cx="9" cy="20" r="1"></circle>
                                <circle cx="17" cy="20" r="1"></circle>
                            </svg>

                            <span className="hidden lg:block text-[11px]">
                                New Sale
                            </span>
                        </button>


                        {/* Settings */}
                        <button
                            type="button"
                            onClick={onSettingsClick}
                            className="group flex flex-col items-center gap-1"
                        >
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.6"
                                className="h-6 w-6 transition group-hover:text-[#344a22]"
                            >
                                <circle cx="12" cy="12" r="3"></circle>
                                <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.8 1.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5v.1h-2.6v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1-1.8-1.8.1-.1A1.7 1.7 0 0 0 8 15a1.7 1.7 0 0 0-1.5-1H6.4v-2.6h.1A1.7 1.7 0 0 0 8 10a1.7 1.7 0 0 0-.3-1.9l-.1-.1 1.8-1.8.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.5V5h2.6v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1 1.8 1.8-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.5 1h.1v2.6h-.1a1.7 1.7 0 0 0-1.5 1.4Z"></path>
                            </svg>

                            <span className="text-[11px] hidden lg:block">
                                Settings
                            </span>
                        </button>

                        <button
                            type="button"
                            onClick={onLogoutClick}
                            className="group flex flex-col items-center gap-1"
                        >
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.6"
                                className="h-6 w-6 transition group-hover:text-[#344a22]"
                            >
                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                                <path d="M16 17l5-5-5-5"></path>
                                <path d="M21 12H9"></path>
                            </svg>

                            <span className="text-[11px] hidden lg:block">
                                Logout
                            </span>
                        </button>

                    </div>
                </div>
            </div>


            {/* DESKTOP NAVIGATION */}
            <nav className="hidden border-b border-[#e7e4de] lg:block">

                <div
                    className="mx-auto flex h-[76px] max-w-[1500px] items-center gap-10 px-5 sm:px-8 lg:px-12"
                >

                    {/* OVERVIEW */}
                    <a
                        className="group flex items-center gap-3"
                        href="#"
                        onClick={(e) => handleTabClick(e, 'overview')}
                    >
                        <div className="flex h-9 w-9 items-center justify-center">
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                className="h-5 w-5"
                            >
                                <rect x="3" y="3" width="7" height="7" rx="1"></rect>
                                <rect x="14" y="3" width="7" height="7" rx="1"></rect>
                                <rect x="3" y="14" width="7" height="7" rx="1"></rect>
                                <rect x="14" y="14" width="7" height="7" rx="1"></rect>
                            </svg>
                        </div>

                        <div className="leading-tight">
                            <div className="flex items-center gap-2">

                                <span
                                    className={`text-[12px] font-semibold uppercase tracking-wide ${
                                        activeTab === 'overview'
                                            ? 'text-[#d88900]'
                                            : ''
                                    }`}
                                >
                                    Overview
                                </span>

                            </div>

                            <span className="mt-1 block text-[9px] text-stone-400">
                                Dashboard
                            </span>
                        </div>
                    </a>


                    {/* INVENTORY */}
                    <a
                        className="group flex items-center gap-3"
                        href="#"
                        onClick={(e) => handleTabClick(e, 'inventory')}
                    >
                        <div className="flex h-9 w-9 items-center justify-center">
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                className="h-5 w-5"
                            >
                                <path d="M4 11h16v8H4z"></path>
                                <path d="M6 11V7h5v4M13 11V7h5v4"></path>
                                <path d="M6 19v2M18 19v2"></path>
                            </svg>
                        </div>

                        <div className="leading-tight">

                            <div className="flex items-center gap-2">

                                <span
                                    className={`text-[12px] font-semibold uppercase tracking-wide ${
                                        activeTab === 'inventory'
                                            ? 'text-[#d88900]'
                                            : ''
                                    }`}
                                >
                                    Inventory

                                    {lowStockCount > 0 && (
                                        <span className="ml-1.5 px-1.5 py-0.2 text-[12px] font-bold rounded-full bg-red-500 text-white animate-pulse">
                                            {lowStockCount}
                                        </span>
                                    )}
                                </span>

                            </div>

                            <span className="mt-1 block text-[9px] text-stone-400">
                                Furniture Stock
                            </span>

                        </div>
                    </a>


                    {/* ORDERS & SALES */}
                    <a
                        className="group flex items-center gap-3"
                        href="#"
                        onClick={(e) => handleTabClick(e, 'sales')}
                    >
                        <div className="flex h-9 w-9 items-center justify-center">

                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                className="h-5 w-5"
                            >
                                <path d="M20 4C10 4 4 9 4 17c0 2 1 3 3 3 8 0 13-6 13-16Z"></path>
                                <path d="M4 20c3-5 7-8 12-10"></path>
                            </svg>

                        </div>

                        <div className="leading-tight">

                            <div className="flex items-center gap-2">

                                <span
                                    className={`text-[12px] font-semibold uppercase tracking-wide ${
                                        activeTab === 'sales'
                                            ? 'text-[#d88900]'
                                            : ''
                                    }`}
                                >
                                    Orders &amp; Sales
                                </span>

                            </div>

                            <span className="mt-1 block text-[9px] text-stone-400">
                                Orders &amp; Transactions
                            </span>

                        </div>
                    </a>


                    {/* ANALYTICS */}
                    <a
                        className="group flex items-center gap-3"
                        href="#"
                        onClick={(e) => handleTabClick(e, 'analytics')}
                    >
                        <div className="flex h-9 w-9 items-center justify-center">

                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                className="h-5 w-5"
                            >
                                <path d="m14 4-9 9 6 6 9-9"></path>
                                <path d="m13 5 6 6M5 20l-2 1 1-2"></path>
                            </svg>

                        </div>

                        <div className="leading-tight">

                            <div className="flex items-center gap-2">

                                <span
                                    className={`text-[12px] font-semibold uppercase tracking-wide ${
                                        activeTab === 'analytics'
                                            ? 'text-[#d88900]'
                                            : ''
                                    }`}
                                >
                                    Analytics
                                </span>

                                <svg
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    className="h-3 w-3 text-stone-400 transition group-hover:translate-y-0.5"
                                >
                                    <path d="m5 7 5 5 5-5"></path>
                                </svg>

                            </div>

                            <span className="mt-1 block text-[9px] text-stone-400">
                                Sales &amp; Performance
                            </span>

                        </div>
                    </a>


                    {/* STOCK LOGS */}
                    <a
                        className="group flex items-center gap-3"
                        href="#"
                        onClick={(e) => handleTabClick(e, 'movements')}
                    >
                        <div className="flex h-9 w-9 items-center justify-center">

                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                className="h-5 w-5"
                            >
                                <circle cx="12" cy="12" r="8"></circle>
                                <path d="M12 7v5l3 2"></path>
                            </svg>

                        </div>

                        <div className="leading-tight">

                            <div className="flex items-center gap-2">

                                <span
                                    className={`text-[12px] font-semibold uppercase tracking-wide ${
                                        activeTab === 'stock-logs'
                                            ? 'text-[#d88900]'
                                            : ''
                                    }`}
                                >
                                    Stock Logs
                                </span>

                            </div>

                            <span className="mt-1 block text-[9px] text-stone-400">
                                Stock Movements
                            </span>

                        </div>
                    </a>


                    {/* NEW SALE */}
                    <button
                        type="button"
                        onClick={onNewSaleClick}
                        className="ml-auto flex h-[58px] items-center gap-4 rounded-full bg-[#344a22] px-4 pr-6 text-white transition hover:bg-[#283a1a]"
                    >

                        <div
                            className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-[#ddd8cc]"
                        >
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#344a22"
                                strokeWidth="1.5"
                                className="h-6 w-6"
                            >
                                <path d="M4 7h16l-1.5 10H5.5L4 7Z"></path>
                                <path d="M8 7V5a4 4 0 0 1 8 0v2"></path>
                            </svg>
                        </div>

                        <div className="leading-tight">

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


                    {/* ADD FURNITURE */}
                    <button
                        type="button"
                        onClick={onAddProductClick}
                        className="hidden flex h-[58px] items-center gap-4 rounded-full border border-[#344a22] px-4 pr-6 text-[#344a22] transition hover:bg-[#344a22] hover:text-white"
                    >

                        <div
                            className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-[#ddd8cc]"
                        >
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                className="h-6 w-6"
                            >
                                <circle cx="12" cy="12" r="8"></circle>
                                <path d="M12 8v8"></path>
                                <path d="M8 12h8"></path>
                            </svg>
                        </div>

                        <div className="leading-tight">

                            <span className="block text-[13px] font-semibold">
                                Add Furniture
                            </span>

                            <span className="block text-[10px] opacity-70">
                                Add New Product
                            </span>

                        </div>

                        <span className="ml-1 text-lg">
                            +
                        </span>

                    </button>

                </div>
            </nav>


            {/* MOBILE */}
            <div className="border-b border-[#e7e4de] lg:hidden">

                <div className="flex h-14 items-center justify-between px-5">

                    <button
                        type="button"
                        onClick={() => setActiveTab('overview')}
                        className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.15em]"
                    >
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.7"
                            className="h-5 w-5"
                        >
                            <path d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>

                        Menu
                    </button>

                    <button
                        type="button"
                        onClick={onNewSaleClick}
                        className="rounded-full bg-[#344a22] px-5 py-2.5 text-[10px] font-semibold uppercase tracking-wide text-white"
                    >
                        New Sale
                    </button>

                </div>
            </div>

        </header>
    );
};