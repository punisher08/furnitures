import React, {
  useEffect,
  useState,
} from 'react';

import {
  useNavigate,
  useParams,
} from 'react-router-dom';

import api from '../utils/storage';

export default function SingleProduct() {

  const {
    id,
  } = useParams();

  const navigate =
    useNavigate();

  const [
    product,
    setProduct,
  ] = useState(null);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState(null);

  /*
  |--------------------------------------------------------------------------
  | LOAD PRODUCT
  |--------------------------------------------------------------------------
  */

  useEffect(() => {

    const fetchProduct = async () => {

      try {

        setLoading(true);

        setError(null);

        const response =
          await api.get(
            `/inventory/${id}`
          );

        /*
         * Expected API:
         *
         * {
         *   success: true,
         *   message: "OK",
         *   data: {...}
         * }
         */

        const data =
          response?.data?.data ??
          response?.data;

        console.log(
          'Single product:',
          data
        );

        setProduct(data);

      } catch (error) {

        console.error(
          'Failed to load product:',
          error
        );

        setProduct(null);

        setError(
          'Failed to load product.'
        );

      } finally {

        setLoading(false);

      }

    };

    if (id) {
      fetchProduct();
    }

  }, [id]);

  /*
  |--------------------------------------------------------------------------
  | LOADING
  |--------------------------------------------------------------------------
  */

  if (loading) {

    return (
      <div className="min-h-screen bg-[#faf9f6] px-6 py-12">

        <div className="mx-auto max-w-[1200px]">

          <div className="rounded-2xl border border-[#e7e4de] bg-white p-12 text-center">

            <div className="text-sm font-medium text-stone-500">
              Loading product...
            </div>

          </div>

        </div>

      </div>
    );

  }

  /*
  |--------------------------------------------------------------------------
  | PRODUCT NOT FOUND
  |--------------------------------------------------------------------------
  */

  if (!product) {

    return (
      <div className="min-h-screen bg-[#faf9f6] px-6 py-12">

        <div className="mx-auto max-w-[1200px]">

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mb-8 text-sm font-medium text-[#344a22] hover:underline"
          >
            ← Back
          </button>

          <div className="rounded-2xl border border-[#e7e4de] bg-white p-12 text-center">

            <h1 className="text-xl font-semibold text-stone-800">
              Product not found
            </h1>

            <p className="mt-2 text-sm text-stone-500">
              {error ||
                "The product you're looking for doesn't exist."}
            </p>

          </div>

        </div>

      </div>
    );

  }

  /*
  |--------------------------------------------------------------------------
  | MARGIN
  |--------------------------------------------------------------------------
  */

  const retailPrice =
    Number(product.retailPrice || 0);

  const costPrice =
    Number(product.costPrice || 0);

  const margin =
    retailPrice > 0
      ? (
          (
            (retailPrice - costPrice) /
            retailPrice
          ) * 100
        ).toFixed(1)
      : 0;

  /*
  |--------------------------------------------------------------------------
  | PRODUCT
  |--------------------------------------------------------------------------
  */

  return (

  <div className="single-product-template min-h-screen bg-[#faf9f6] text-stone-700">

  <main className="mx-auto max-w-[1180px] px-5 py-8 sm:px-8 lg:px-10">

    {/* Back */}
    <button
      type="button"
      onClick={() => navigate(-1)}
      className="mb-8 flex items-center gap-2 text-[11px] font-medium text-stone-500 transition hover:text-[#344a22]"
    >
      <span className="text-base">←</span>
      Back to Collection
    </button>


    {/* Product */}
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">

      {/* =========================================================
          PRODUCT IMAGE
      ========================================================= */}
      <div className="relative">

        <div className="relative aspect-[1/1] overflow-hidden rounded-2xl bg-[#eeeae2]">

          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="h-full w-full object-cover"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-stone-300">

              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                className="h-24 w-24"
              >
                <rect
                  x="3"
                  y="3"
                  width="18"
                  height="18"
                  rx="2"
                />

                <circle
                  cx="8.5"
                  cy="8.5"
                  r="1.5"
                />

                <path d="m21 15-5-5L5 21" />
              </svg>

            </div>
          )}


          {/* Wishlist */}
          <button
            type="button"
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-stone-200 bg-white/95 text-stone-600 shadow-sm transition hover:bg-white hover:text-[#344a22]"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              className="h-4 w-4"
            >
              <path
                d="M20.8 8.7c0 5.5-8.8 10.3-8.8 10.3S3.2 14.2 3.2 8.7A4.7 4.7 0 0 1 8 4c1.5 0 2.9.7 4 2 1.1-1.3 2.5-2 4-2a4.7 4.7 0 0 1 4.8 4.7Z"
              />
            </svg>
          </button>


          {/* Image Counter */}
          <div className="absolute bottom-3 left-3 rounded-full bg-[#344a22] px-2.5 py-1 text-[12px] font-medium text-white">
            1/1
          </div>

        </div>

      </div>


      {/* =========================================================
          PRODUCT DETAILS
      ========================================================= */}
      <div className="flex flex-col">

        {/* Category */}
        {product.category && (
          <span className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#789052]">
            {product.category}
          </span>
        )}


        {/* Product Name */}
        <h1 className="mt-2 font-serif text-3xl font-semibold leading-tight text-[#18230f] sm:text-4xl">
          {product.name}
        </h1>


        {/* Rating */}
        <div className="mt-2 flex items-center gap-2">

          <div className="flex items-center gap-0.5 text-[#d59b32]">
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>★</span>
          </div>

          <span className="text-[12px] text-stone-400">
            4.8 · 32 reviews
          </span>

        </div>


        {/* Price */}
        <div className="mt-5 flex items-center gap-3">

          <span className="text-2xl font-semibold text-[#151a11]">
            {retailPrice.toLocaleString(undefined, {
              style: 'currency',
              currency: 'PHP',
            })}
          </span>

          {product.costPrice && Number(product.costPrice) < retailPrice && (
            <span className="text-xs text-stone-400 line-through">
              {Number(product.costPrice).toLocaleString(undefined, {
                style: 'currency',
                currency: 'PHP',
              })}
            </span>
          )}

          <span className="hidden rounded-full bg-[#e94d32] px-2 py-1 text-[8px] font-bold uppercase text-white">
            20% OFF
          </span>

        </div>


        {/* Stock Notice */}
        <div className="mt-5 rounded-md border border-dashed border-[#789052] bg-[#f3f5ed] px-3 py-2.5">

          <div className="flex items-center gap-2 text-[12px] text-[#344a22]">

            <span className="h-1.5 w-1.5 rounded-full bg-[#789052]" />

            <span>
              Only {product.stock || 0} items remaining — custom order available.
            </span>

          </div>

        </div>


        {/* Description */}
        <div className="mt-5 text-[12px] leading-5 text-stone-500">

          {product.description || (
            <>
              Indulge in organic comfort. This beautifully crafted piece
              combines timeless design with luxurious materials, creating
              a serene addition to your space.
            </>
          )}

        </div>


        {/* =========================================================
            FINISH
        ========================================================= */}
        <div className="mt-5">

          <div className="text-[12px] font-semibold uppercase tracking-[0.15em] text-stone-500">
            Finish Selection
          </div>

          <div className="mt-2 flex items-center gap-2">

            <button
              type="button"
              className="h-7 w-7 rounded-full border-2 border-[#344a22] bg-[#d8c7a8] p-0.5"
            >
              <span className="block h-full w-full rounded-full bg-[#d8c7a8]" />
            </button>

            <button
              type="button"
              className="h-7 w-7 rounded-full border border-stone-200 bg-[#33352f]"
            />

            <button
              type="button"
              className="h-7 w-7 rounded-full border border-stone-200 bg-[#e9dfca]"
            />

          </div>

          <div className="mt-1 text-[8px] text-stone-400">
            White Bouclé
          </div>

        </div>


        {/* =========================================================
            DIMENSIONS
        ========================================================= */}
        <div className="mt-5 grid grid-cols-4 overflow-hidden rounded-lg border border-[#dedbd3]">

          <div className="border-r border-[#dedbd3] px-3 py-2.5">
            <div className="text-[8px] uppercase text-stone-400">
              Width
            </div>
            <div className="mt-0.5 text-[12px] font-semibold text-stone-700">
              {product.width || '78'} cm
            </div>
          </div>

          <div className="border-r border-[#dedbd3] px-3 py-2.5">
            <div className="text-[8px] uppercase text-stone-400">
              Depth
            </div>
            <div className="mt-0.5 text-[12px] font-semibold text-stone-700">
              {product.depthCm || '82'} cm
            </div>
          </div>

          <div className="border-r border-[#dedbd3] px-3 py-2.5">
            <div className="text-[8px] uppercase text-stone-400">
              Height
            </div>
            <div className="mt-0.5 text-[12px] font-semibold text-stone-700">
              {product.heightCm || '80'} cm
            </div>
          </div>

          <div className="px-3 py-2.5">
            <div className="text-[8px] uppercase text-stone-400">
              Origin
            </div>
            <div className="mt-0.5 text-[12px] font-semibold text-stone-700">
              EU Certified
            </div>
          </div>

        </div>


        {/* =========================================================
            QUANTITY
        ========================================================= */}
        <div className="mt-5">

          <div className="text-[12px] font-semibold uppercase tracking-[0.15em] text-stone-500">
            Quantity
          </div>

          <div className="mt-2 inline-flex overflow-hidden rounded-md border border-stone-200">

            <button
              type="button"
              onClick={() =>
                setQuantity((q) => Math.max(1, q - 1))
              }
              className="h-8 w-8 text-xs text-stone-500 hover:bg-stone-50"
            >
              −
            </button>

            <div className="flex h-8 w-8 items-center justify-center border-x border-stone-200 text-xs font-medium">
              
            </div>

            <button
              type="button"
              onClick={() =>
                setQuantity((q) =>
                  Math.min(Number(product.stock || 1), q + 1)
                )
              }
              className="h-8 w-8 text-xs text-stone-500 hover:bg-stone-50"
            >
              +
            </button>

          </div>

        </div>


        {/* =========================================================
            ACTIONS
        ========================================================= */}
        <div className="mt-5 space-y-2">

          <button
            type="button"
            className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#344a22] text-[12px] font-semibold text-white transition hover:bg-[#283a1a]"
          >

            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              className="h-3.5 w-3.5"
            >
              <path d="M6 7h12l1 13H5L6 7Z" />
              <path d="M9 7a3 3 0 0 1 6 0" />
            </svg>

            Add to Cart

          </button>


          <button
            type="button"
            className="h-10 w-full rounded-lg border border-[#344a22] bg-white text-[12px] font-medium text-[#344a22] transition hover:bg-[#f3f5ed]"
          >
            Open in Room Composer →
          </button>

        </div>


        {/* =========================================================
            SHIPPING INFO
        ========================================================= */}
        <div className="mt-3 rounded-lg border border-[#dedbd3] bg-white">

          <div className="space-y-2 px-4 py-3">

            <div className="flex items-center gap-2 text-[12px] text-stone-500">
              <span className="text-[#789052]">▣</span>
              Free shipping on orders $500+
            </div>

            <div className="flex items-center gap-2 text-[12px] text-stone-500">
              <span className="text-[#789052]">↻</span>
              30-day hassle-free returns
            </div>

            <div className="flex items-center gap-2 text-[12px] text-stone-500">
              <span className="text-[#789052]">♧</span>
              Secure payment guaranteed
            </div>

          </div>

        </div>


        {/* =========================================================
            CRAFTSMANSHIP
        ========================================================= */}
        <div className="mt-5 rounded-lg border border-[#dedbd3] bg-white">

          <div className="space-y-3 px-4 py-4">

            <div className="flex gap-3">

              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#344a22] text-[8px] font-bold text-white">
                1
              </div>

              <div>
                <div className="text-[12px] font-semibold text-[#344a22]">
                  Timber Curing & Selection
                </div>

                <div className="mt-0.5 text-[8px] text-stone-400">
                  FSC raw oak inspected in workshop.
                </div>
              </div>

            </div>


            <div className="flex gap-3">

              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#344a22] text-[8px] font-bold text-white">
                2
              </div>

              <div>
                <div className="text-[12px] font-semibold text-[#344a22]">
                  Handcrafting & Joinery
                </div>

                <div className="mt-0.5 text-[8px] text-stone-400">
                  Hand-sanded and double-dowelled.
                </div>
              </div>

            </div>


            <div className="flex gap-3">

              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#344a22] text-[8px] font-bold text-white">
                3
              </div>

              <div>
                <div className="text-[12px] font-semibold text-[#344a22]">
                  Estimated Dispatch
                </div>

                <div className="mt-0.5 text-[8px] text-stone-400">
                  14 business days (White Bouclé)
                </div>
              </div>

            </div>

          </div>

        </div>


        {/* =========================================================
            ACCORDIONS
        ========================================================= */}
        <div className="mt-3 divide-y divide-[#dedbd3] border-y border-[#dedbd3]">

          <button
            type="button"
            className="flex w-full items-center justify-between py-3 text-left text-[12px] font-medium text-[#344a22]"
          >
            Craftsmanship & Sustainability
            <span>⌄</span>
          </button>

          <button
            type="button"
            className="flex w-full items-center justify-between py-3 text-left text-[12px] font-medium text-[#344a22]"
          >
            Product Dimensions & Tolerance
            <span>⌄</span>
          </button>

        </div>


        {/* Bottom actions */}
        <div className="mt-3 flex gap-2">

          <button
            type="button"
            className="flex-1 rounded-full bg-[#344a22] px-5 py-3 text-[12px] font-semibold text-white transition hover:bg-[#283a1a]"
          >
            Add to Shopping Cart
          </button>

          <button
            type="button"
            className="rounded-full border border-stone-300 bg-white px-5 py-3 text-[12px] font-medium text-stone-600 transition hover:bg-stone-50"
          >
            Open in Room Composer →
          </button>

        </div>

      </div>

    </div>


    {/* =========================================================
        TRUST / FEATURES BAR
    ========================================================= */}
    <div className="mt-12 grid grid-cols-1 border-y border-[#dedbd3] sm:grid-cols-2 lg:grid-cols-4">

      <div className="flex items-center gap-3 border-b border-[#dedbd3] px-5 py-5 sm:border-r lg:border-b-0">
        <span className="text-[#789052]">♧</span>

        <div>
          <div className="text-[8px] font-semibold uppercase text-stone-600">
            Sustainably Sourced
          </div>

          <div className="mt-1 text-[7px] text-stone-400">
            FSC-certified natural timber
          </div>
        </div>
      </div>


      <div className="flex items-center gap-3 border-b border-[#dedbd3] px-5 py-5 lg:border-b-0 lg:border-r">
        <span className="text-[#789052]">⚒</span>

        <div>
          <div className="text-[8px] font-semibold uppercase text-stone-600">
            Handcrafted
          </div>

          <div className="mt-1 text-[7px] text-stone-400">
            Built by master artisans
          </div>
        </div>
      </div>


      <div className="flex items-center gap-3 border-b border-[#dedbd3] px-5 py-5 sm:border-r lg:border-b-0">
        <span className="text-[#789052]">▣</span>

        <div>
          <div className="text-[8px] font-semibold uppercase text-stone-600">
            Free Delivery
          </div>

          <div className="mt-1 text-[7px] text-stone-400">
            On orders over $500
          </div>
        </div>
      </div>


      <div className="flex items-center gap-3 px-5 py-5">
        <span className="text-[#789052]">↻</span>

        <div>
          <div className="text-[8px] font-semibold uppercase text-stone-600">
            30-Day Returns
          </div>

          <div className="mt-1 text-[7px] text-stone-400">
            Hassle-free, no questions
          </div>
        </div>
      </div>

    </div>

  </main>

</div>
  );
}