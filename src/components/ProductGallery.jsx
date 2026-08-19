import { useState } from "react";

const products = [
  {
    id: 1,
    name: "Modern Wooden Cabinet",
    price: "₱12,500",
    image:
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 2,
    name: "Minimalist Dining Table",
    price: "₱18,500",
    image:
      "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 3,
    name: "Solid Wood Bed Frame",
    price: "₱24,000",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 4,
    name: "Classic Wooden Chair",
    price: "₱5,500",
    image:
      "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 5,
    name: "Modern Side Table",
    price: "₱7,500",
    image:
      "https://images.unsplash.com/photo-1532372576444-dda954194ad0?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 6,
    name: "Wooden TV Console",
    price: "₱15,500",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 7,
    name: "Oak Coffee Table",
    price: "₱9,500",
    image:
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 8,
    name: "Storage Cabinet",
    price: "₱13,500",
    image:
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 9,
    name: "Wooden Bookshelf",
    price: "₱11,500",
    image:
      "https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&w=1200&q=80",
  },
];

export default function ProductGallery() {
  const [visibleProducts, setVisibleProducts] = useState(3);

  const loadMore = () => {
    setVisibleProducts((current) => current + 3);
  };

  const displayedProducts = products.slice(0, visibleProducts);

  return (
    <section className="bg-[#f5f4f0] px-6 py-20">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-gray-500">
            Our Collection
          </p>

          <h2 className="mt-9  font-serif text-[40px] leading-[1.02] tracking-tight text-[#20211e] sm:text-[46px] text-center">
            Featured Products
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Explore our collection of beautifully crafted furniture designed
            for modern and comfortable spaces.
          </p>
        </div>

        {/* Gallery */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayedProducts.map((product) => (
            <article
              key={product.id}
              className="group overflow-hidden rounded-2xl bg-white"
            >
              {/* Image */}
              <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-medium text-gray-900">
                  {product.name}
                </h3>

                <p className="mt-2 text-base font-semibold text-gray-700">
                  {product.price}
                </p>

                <button
                  type="button"
                  className="mt-5 inline-flex items-center text-sm font-medium text-gray-900 transition hover:text-gray-500"
                >
                  View Product
                  <span className="ml-2 transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Load More */}
        {visibleProducts < products.length && (
          <div className="mt-12 flex justify-center">
            <button
              type="button"
              onClick={loadMore}
              className="rounded-full border border-gray-900 px-8 py-3 text-sm font-medium text-gray-900 transition hover:bg-gray-900 hover:text-white"
            >
              Load More
            </button>
          </div>
        )}

        {/* All products loaded */}
        {visibleProducts >= products.length && (
          <p className="mt-12 text-center text-sm text-gray-500">
            You&apos;ve reached the end of our collection.
          </p>
        )}

      </div>
    </section>
  );
}