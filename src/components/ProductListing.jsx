import React, { useMemo, useState } from 'react';
import { Search, Heart, Grid2X2, List, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PRODUCTS_PER_LOAD = 8;





export const ProductListing = ({
  inventory = [],
  onProductClick,
  onAddToCart,
}) => {
  const materials = [
  ...new Set(
    inventory
      .map(product => product.material)
      .filter(Boolean)
  ),
]; 
const categories = [
  ...new Set(
    inventory
      .map(product => product.category)
      .filter(Boolean)
  ),
];
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('default');

  const [selectedCategories, setSelectedCategories] = useState(
    categories
  );
  console.log(selectedCategories);
  
 

  const [availability, setAvailability] = useState({
    inStock: true,
    custom: true,
  });

  const [selectedMaterial, setSelectedMaterial] = useState('All');

  const [maxPrice, setMaxPrice] = useState(100000);

  const [visibleCount, setVisibleCount] = useState(
    PRODUCTS_PER_LOAD
  );

  const [view, setView] = useState('grid');

  const [wishlist, setWishlist] = useState([]);

  /*
   * Convert your inventory data into the format
   * this component expects.
   */
  const products = useMemo(() => {
    return inventory.map((item) => ({
      ...item,

      id: item.id,

      name: item.name || 'Unnamed Product',

      category: item.category || 'Furniture',

      material: item.material || '',

      description:
        item.description ||
        'Beautiful furniture piece crafted for modern interiors.',

      price: Number(item.retailPrice || 0),

      image:
        item.imageUrl ||
        item.image ||
        '',

      stock: Number(item.stock || 0),
    }));
  }, [inventory]);

  /*
   * Filtering
   */
  const filteredProducts = useMemo(() => {
    let result = [...products];

    /*
     * Search
     */
    if (search.trim()) {
      const query = search.toLowerCase();

      result = result.filter((product) => {
        return (
          product.name?.toLowerCase().includes(query) ||
          product.category?.toLowerCase().includes(query) ||
          product.material?.toLowerCase().includes(query) ||
          product.sku?.toLowerCase().includes(query)
        );
      });
    }

    /*
     * Category
     */
    if (selectedCategories.length > 0) {
      result = result.filter((product) => {
        return selectedCategories.some((category) =>
          product.category
            ?.toLowerCase()
            .includes(category.toLowerCase().split(' ')[0])
        );
      });
    }

    /*
     * Price
     */
    result = result.filter(
      (product) => product.price <= maxPrice
    );

    /*
     * Material
     */
    if (selectedMaterial !== 'All') {
      result = result.filter((product) =>
        product.material
          ?.toLowerCase()
          .includes(selectedMaterial.toLowerCase())
      );
    }

    /*
     * Availability
     */
    if (availability.inStock && !availability.custom) {
      result = result.filter(
        (product) => product.stock > 0
      );
    }

    /*
     * Sorting
     */
    if (sort === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    }

    if (sort === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    }

    if (sort === 'name') {
      result.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    }

    return result;
  }, [
    products,
    search,
    selectedCategories,
    maxPrice,
    selectedMaterial,
    availability,
    sort,
  ]);

  const visibleProducts = filteredProducts.slice(
    0,
    visibleCount
  );

  /*
   * Category toggle
   */
  const toggleCategory = (category) => {
  setSelectedCategories(prev =>
    prev.includes(category)
      ? prev.filter(item => item !== category)
      : [...prev, category]
  );
};

let result = [...inventory];

// Category filter
if (selectedCategories.length > 0) {
  result = result.filter(product =>
    selectedCategories.includes(product.category)
  );
}

  /*
   * Wishlist
   */
  const toggleWishlist = (id) => {
    setWishlist((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }

      return [...prev, id];
    });
  };

  /*
   * Clear filters
   */
  const clearFilters = () => {
    setSearch('');
    setSort('default');
    setSelectedCategories(categories);
    setAvailability({
      inStock: true,
      custom: true,
    });
    setSelectedMaterial('All');
    setMaxPrice(100000);
    setVisibleCount(PRODUCTS_PER_LOAD);
  };


  /*
   * Add cart
   */
  const handleAddToCart = (product) => {
    if (onAddToCart) {
      onAddToCart(product);
      return;
    }

    console.log('Add to cart:', product);
  };

  return (
    <section className="min-h-screen bg-[#faf9f6] px-4 py-8 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-[1400px]">

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[20%_1fr]">

          {/* =====================================================
              SIDEBAR
          ===================================================== */}

          <aside className="h-fit rounded-xl border border-[#ddd9d0] bg-[#faf9f6] p-4">

            {/* Search */}
            <div>
              <label className="text-[12px] font-semibold uppercase tracking-wider text-[#344a22]">
                Search
              </label>

              <div className="mt-2 border-t border-[#ddd9d0] pt-3">

                <div className="relative">

                  <Search
                    className="absolute left-3 top-1/2 h-3 w-3 -translate-y-1/2 text-stone-400"
                  />

                  <input
                    type="search"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setVisibleCount(PRODUCTS_PER_LOAD);
                    }}
                    placeholder="Type to search..."
                    className="
                      h-8
                      w-full
                      rounded-md
                      border
                      border-[#ddd9d0]
                      bg-white
                      pl-8
                      pr-2
                      text-[12px]
                      text-stone-700
                      outline-none
                      transition
                      focus:border-[#344a22]
                    "
                  />

                </div>

              </div>
            </div>


            {/* Sort */}
            <div className="mt-5">

              <label className="text-[12px] font-semibold uppercase tracking-wider text-[#344a22]">
                Sort By
              </label>

              <div className="mt-2 border-t border-[#ddd9d0] pt-3">

                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="
                    h-8
                    w-full
                    rounded-md
                    border
                    border-[#ddd9d0]
                    bg-white
                    px-2
                    text-[12px]
                    text-stone-600
                    outline-none
                    focus:border-[#344a22]
                  "
                >
                  <option value="default">
                    Default Sorting
                  </option>

                  <option value="price-low">
                    Price: Low to High
                  </option>

                  <option value="price-high">
                    Price: High to Low
                  </option>

                  <option value="name">
                    Name
                  </option>
                </select>

              </div>

            </div>


            {/* Categories */}
            <div className="mt-5">

              <label className="text-[12px] font-semibold uppercase tracking-wider text-[#344a22]">
                Categories
              </label>

              <div className="mt-2 space-y-2 border-t border-[#ddd9d0] pt-3">

              

                  {categories.map(category => (
                    <label
                      key={category}
                      className="flex items-center gap-2 cursor-pointer text-xs text-stone-600"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => toggleCategory(category)}
                        className="h-3 w-3 accent-[#344a22]"
                      />

                      <span>{category}</span>
                    </label>
                  ))}

              

              </div>

            </div>


            {/* Availability */}
            <div className="mt-5">

              <label className="text-[12px] font-semibold uppercase tracking-wider text-[#344a22]">
                Availability
              </label>

              <div className="mt-2 space-y-2 border-t border-[#ddd9d0] pt-3">

                <label className="flex cursor-pointer items-center gap-2">

                  <input
                    type="checkbox"
                    checked={availability.inStock}
                    onChange={(e) =>
                      setAvailability((prev) => ({
                        ...prev,
                        inStock: e.target.checked,
                      }))
                    }
                    className="h-3 w-3 accent-[#344a22]"
                  />

                  <span className="text-[12px] text-stone-500">
                    In Stock Only
                  </span>

                </label>


                <label className="flex cursor-pointer items-center gap-2">

                  <input
                    type="checkbox"
                    checked={availability.custom}
                    onChange={(e) =>
                      setAvailability((prev) => ({
                        ...prev,
                        custom: e.target.checked,
                      }))
                    }
                    className="h-3 w-3 accent-[#344a22]"
                  />

                  <span className="text-[12px] text-stone-500">
                    Custom Crafting
                  </span>

                </label>

              </div>

            </div>


            {/* Materials */}
            <div className="mt-5">

              <label className="text-[12px] font-semibold uppercase tracking-wider text-[#344a22]">
                Wood & Materials
              </label>

              <div className="mt-2 flex flex-wrap gap-1.5 border-t border-[#ddd9d0] pt-3">

                {materials.map((material) => (

                  <button
                    key={material}
                    type="button"
                    onClick={() =>
                      setSelectedMaterial(material)
                    }
                    className={`
                      rounded-md
                      border
                      px-2
                      py-1
                      text-[12px]
                      transition
                      ${
                        selectedMaterial === material
                          ? 'border-[#344a22] bg-[#344a22] text-white'
                          : 'border-[#ddd9d0] bg-white text-stone-500 hover:border-[#344a22]'
                      }
                    `}
                  >
                    {material}
                  </button>

                ))}

              </div>

            </div>


            {/* Price */}
            <div className="mt-5">

              <label className="text-[12px] font-semibold uppercase tracking-wider text-[#344a22]">
                Max Price
              </label>

              <div className="mt-2 border-t border-[#ddd9d0] pt-3">

                <input
                  type="range"
                  min="1000"
                  max="100000"
                  step="50"
                  value={maxPrice}
                  onChange={(e) => {
                    setMaxPrice(Number(e.target.value));
                    setVisibleCount(PRODUCTS_PER_LOAD);
                  }}
                  className="w-full accent-[#344a22]"
                />

                <div className="mt-2 flex justify-between text-[12px] text-stone-500">

                  <span>
                    ₱1000
                  </span>

                  <span className="font-semibold text-stone-700">
                    ₱{maxPrice.toLocaleString()}
                  </span>

                </div>

              </div>

            </div>


            {/* Clear */}
            <button
              type="button"
              onClick={clearFilters}
              className="
                mt-5
                h-8
                w-full
                rounded-md
                border
                border-[#ddd9d0]
                bg-white
                text-[12px]
                font-semibold
                uppercase
                tracking-wider
                text-stone-600
                transition
                hover:border-[#344a22]
                hover:text-[#344a22]
              "
            >
              Clear All Filters
            </button>

          </aside>


          {/* =====================================================
              PRODUCTS
          ===================================================== */}

          <div>

            {/* Toolbar */}
            <div className="flex items-center justify-between border-b border-[#ddd9d0] pb-3">

              <div className="text-[12px] text-stone-500">

                Showing{' '}

                <span className="font-semibold text-stone-700">
                  {visibleProducts.length}
                </span>

                {' '}of{' '}

                <span className="font-semibold text-stone-700">
                  {filteredProducts.length}
                </span>

                {' '}products

              </div>


              <div className="flex items-center gap-1">

                <button
                  type="button"
                  onClick={() => setView('grid')}
                  className={`
                    flex h-7 w-7 items-center justify-center rounded-md border
                    ${
                      view === 'grid'
                        ? 'border-[#344a22] text-[#344a22]'
                        : 'border-[#ddd9d0] text-stone-400'
                    }
                  `}
                >
                  <Grid2X2 className="h-3.5 w-3.5" />
                </button>


                <button
                  type="button"
                  onClick={() => setView('list')}
                  className={`
                    flex h-7 w-7 items-center justify-center rounded-md border
                    ${
                      view === 'list'
                        ? 'border-[#344a22] text-[#344a22]'
                        : 'border-[#ddd9d0] text-stone-400'
                    }
                  `}
                >
                  <List className="h-3.5 w-3.5" />
                </button>

              </div>

            </div>


            {/* Product Grid */}
            <div
              className={`
                mt-4 grid gap-x-4 gap-y-8
                ${
                  view === 'grid'
                    ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-4'
                    : 'grid-cols-1'
                }
              `}
            >

              {visibleProducts.map((product) => (

                <article
                  key={product.id}
                  className={`
                    group
                    ${
                      view === 'list'
                        ? 'flex gap-5'
                        : ''
                    }
                  `}
                >

                  {/* Image */}
                  <div
                    className={`
                      relative
                      overflow-hidden
                      rounded-xl
                      border
                      border-[#e2ded5]
                      bg-[#f5f3ee]
                      ${
                        view === 'list'
                          ? 'h-40 w-40 shrink-0'
                          : 'aspect-square'
                      }
                    `}
                  >

                    {product.image ? (

                      <img
                      onClick={()=>{
                        navigate(`/product/${product.id}`);
                      }}
                        src={product.image}
                        alt={product.name}
                        className="
                          h-full
                          w-full
                          object-cover
                          transition
                          duration-500
                          group-hover:scale-105
                        "
                        loading="lazy"
                      />

                    ) : (

                      <div className="flex h-full items-center justify-center text-stone-300">

                        <div className="text-[12px]">
                          No Image
                        </div>

                      </div>

                    )}


                    {/* Wishlist */}
                    <button
                      type="button"
                      onClick={() =>
                        toggleWishlist(product.id)
                      }
                      className="
                        absolute
                        right-2
                        top-2
                        flex
                        h-7
                        w-7
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-[#ddd9d0]
                        bg-white/90
                        text-stone-400
                        shadow-sm
                        transition
                        hover:text-red-500
                      "
                    >

                      <Heart
                        className={`
                          h-3.5 w-3.5
                          ${
                            wishlist.includes(product.id)
                              ? 'fill-red-500 text-red-500'
                              : ''
                          }
                        `}
                      />

                    </button>

                  </div>


                  {/* Details */}
                  <div
                    className={
                      view === 'list'
                        ? 'flex-1 py-2'
                        : 'px-1'
                    }
                  >

                    <div className="mt-3 text-[12px] font-semibold uppercase tracking-wider text-[#789052]">

                      {product.category}

                    </div>


                    <button
                      type="button"
                      onClick={() =>
                        onProductClick
                          ? onProductClick(product)
                          : console.log(
                              'Product:',
                              product.id
                            )
                      }
                      className="
                        mt-1
                        block
                        text-left
                        text-sm
                        font-semibold
                        text-stone-900
                        transition
                        hover:text-[#344a22]
                      "
                    >
                      {product.name}
                    </button>


                    <p className="mt-1 line-clamp-2 text-[12px] leading-4 text-stone-500">

                      {product.description}

                    </p>


                    <div className="mt-3 text-base font-semibold text-stone-900">

                      ₱
                      {product.price.toLocaleString(
                        undefined,
                        {
                          minimumFractionDigits: 2,
                        }
                      )}

                    </div>


                    <button
                      type="button"
                      onClick={() =>
                        handleAddToCart(product)
                      }
                      className="
                        mt-2
                        h-7
                        w-full
                        rounded-md
                        bg-[#344a22]
                        text-[12px]
                        font-semibold
                        uppercase
                        tracking-wider
                        text-white
                        transition
                        hover:bg-[#283a1a]
                        hidden
                      "
                    >
                      Add to Cart
                    </button>

                  </div>

                </article>

              ))}

            </div>


            {/* Empty */}
            {visibleProducts.length === 0 && (

              <div className="flex min-h-[300px] items-center justify-center">

                <div className="text-center">

                  <div className="text-sm font-semibold text-stone-700">
                    No products found
                  </div>

                  <p className="mt-1 text-xs text-stone-400">
                    Try changing your search or filters.
                  </p>

                  <button
                    type="button"
                    onClick={clearFilters}
                    className="mt-4 text-xs font-semibold text-[#344a22] hover:underline"
                  >
                    Clear filters
                  </button>

                </div>

              </div>

            )}


            {/* Load More */}
            {visibleCount < filteredProducts.length && (

              <div className="flex justify-center pt-10">

                <button
                  type="button"
                  onClick={() =>
                    setVisibleCount(
                      (prev) =>
                        prev + PRODUCTS_PER_LOAD
                    )
                  }
                  className="
                    flex
                    min-w-[250px]
                    items-center
                    justify-center
                    gap-3
                    rounded-lg
                    border
                    border-[#ddd9d0]
                    bg-white
                    px-6
                    py-3
                    text-[12px]
                    font-semibold
                    uppercase
                    tracking-wider
                    text-stone-700
                    transition
                    hover:border-[#344a22]
                    hover:text-[#344a22]
                  "
                >
                  Load More Products

                  <ChevronDown className="h-4 w-4" />

                </button>

              </div>

            )}

          </div>

        </div>

      </div>

    </section>
  );
};

export default ProductListing;