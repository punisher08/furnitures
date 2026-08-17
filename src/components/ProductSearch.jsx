import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProductSearch = ({
  inventory = [],
  onProductClick,
  activeTab,
  setActiveTab

}) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  

  const results = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    if (!keyword) {
      return [];
    }

    return inventory
      .filter((item) => {
        return (
          String(item.name || '').toLowerCase().includes(keyword) ||
          String(item.sku || '').toLowerCase().includes(keyword) ||
          String(item.category || '').toLowerCase().includes(keyword) ||
          String(item.material || '').toLowerCase().includes(keyword) ||
          String(item.supplier || '').toLowerCase().includes(keyword)
        );
      })
      .slice(0, 8);
  }, [search, inventory]);

 const handleProductClick = (product) => {
  setSearch('');
  setIsFocused(false);

  navigate(`/product/${product.id}`);
  setActiveTab('single-product')
};

  const clearSearch = () => {
    setSearch('');
  };

  return (
    <div className="relative w-full">

      {/* Search Input */}
      <div className="relative">

        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setIsFocused(true)}
          placeholder="Search furniture, SKU, category..."
          className="
            h-[52px]
            w-full
            rounded-full
            border
            border-[#e3e0da]
            bg-white
            px-6
            pr-16
            text-sm
            text-stone-700
            outline-none
            placeholder:text-stone-400
            transition
            focus:border-[#344a22]
            focus:ring-2
            focus:ring-[#344a22]/10
          "
        />

        {/* Clear */}
        {search && (
          <button
            type="button"
            onClick={clearSearch}
            className="
              absolute
              right-[52px]
              top-1/2
              flex
              h-7
              w-7
              -translate-y-1/2
              items-center
              justify-center
              rounded-full
              text-stone-400
              transition
              hover:bg-stone-100
              hover:text-stone-700
            "
          >
            ×
          </button>
        )}

        {/* Search Icon */}
        <button
          type="button"
          className="
            absolute
            right-1.5
            top-1.5
            flex
            h-[43px]
            w-[43px]
            items-center
            justify-center
            rounded-full
            bg-[#344a22]
            text-white
            transition
            hover:bg-[#283a1a]
          "
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="h-5 w-5"
          >
            <circle cx="11" cy="11" r="6.5" />
            <path d="m16 16 5 5" />
          </svg>
        </button>

      </div>


      {/* Search Results */}
      {isFocused && search.trim() && (
        <>

          {/* Click outside */}
          <div
            className="fixed inset-0 z-30"
            onClick={() => setIsFocused(false)}
          />

          <div
            className="
              absolute
              left-0
              right-0
              top-[60px]
              z-40
              overflow-hidden
              rounded-2xl
              border
              border-[#e7e4de]
              bg-white
              shadow-[0_15px_40px_rgba(0,0,0,0.12)]
            "
          >

            {/* Result Header */}
            {results.length > 0 && (
              <div className="border-b border-stone-100 px-5 py-3">

                <div className="flex items-center justify-between">

                  <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-stone-400">
                    Products
                  </span>

                  <span className="text-[10px] text-stone-400">
                    {results.length} result{results.length !== 1 ? 's' : ''}
                  </span>

                </div>

              </div>
            )}


            {/* Products */}
            {results.length > 0 ? (

              <div className="max-h-[420px] overflow-y-auto">

                {results.map((product) => (

                  <button
                    key={product.id || product.sku}
                    type="button"
                    onClick={() => handleProductClick(product)}
                    className="
                      flex
                      w-full
                      items-center
                      gap-4
                      px-5
                      py-3
                      text-left
                      transition
                      hover:bg-[#f7f6f2]
                    "
                  >

                    {/* Product Image */}
                    <div
                      className="
                        h-14
                        w-14
                        shrink-0
                        overflow-hidden
                        rounded-xl
                        border
                        border-stone-200
                        bg-stone-100
                      "
                    >
                      {product.imageUrl ? (

                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="h-full w-full object-cover"
                          referrerPolicy="no-referrer"
                        />

                      ) : (

                        <div className="flex h-full w-full items-center justify-center text-stone-400">

                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            className="h-6 w-6"
                          >
                            <rect
                              x="3"
                              y="3"
                              width="18"
                              height="18"
                              rx="2"
                            />
                            <circle cx="8.5" cy="8.5" r="1.5" />
                            <path d="m21 15-5-5L5 21" />
                          </svg>

                        </div>

                      )}
                    </div>


                    {/* Product Information */}
                    <div className="min-w-0 flex-1">

                      <div className="truncate text-sm font-semibold text-stone-800">
                        {product.name}
                      </div>

                      <div className="mt-1 flex items-center gap-2">

                        {product.sku && (
                          <span className="text-[10px] font-medium uppercase tracking-wide text-stone-400">
                            {product.sku}
                          </span>
                        )}

                        {product.category && (
                          <>
                            <span className="text-stone-300">
                              •
                            </span>

                            <span className="truncate text-[10px] text-stone-400">
                              {product.category}
                            </span>
                          </>
                        )}

                      </div>

                    </div>


                    {/* Stock / Price */}
                    <div className="hidden shrink-0 text-right sm:block">

                      <div className="text-sm font-semibold text-[#344a22]">
                        {Number(product.retailPrice || 0).toLocaleString(
                          undefined,
                          {
                            style: 'currency',
                            currency: 'PHP',
                          }
                        )}
                      </div>

                      <div
                        className={`mt-1 text-[10px] font-medium ${
                          Number(product.stock || 0) <=
                          Number(product.minStockAlert || 0)
                            ? 'text-red-500'
                            : 'text-stone-400'
                        }`}
                      >
                        {product.stock || 0} in stock
                      </div>

                    </div>


                    {/* Arrow */}
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      className="h-4 w-4 shrink-0 text-stone-300"
                    >
                      <path d="m9 18 6-6-6-6" />
                    </svg>

                  </button>

                ))}

              </div>

            ) : (

              /* No Results */
              <div className="px-6 py-10 text-center">

                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-stone-100">

                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="h-6 w-6 text-stone-400"
                  >
                    <circle cx="11" cy="11" r="6.5" />
                    <path d="m16 16 5 5" />
                  </svg>

                </div>

                <div className="text-sm font-semibold text-stone-700">
                  No products found
                </div>

                <div className="mt-1 text-xs text-stone-400">
                  Try searching by product name, SKU, category, or material.
                </div>

              </div>

            )}

          </div>

        </>
      )}

    </div>
  );
};

export default ProductSearch;