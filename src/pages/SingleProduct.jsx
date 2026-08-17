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

    <div className="min-h-screen bg-[#faf9f6]">

      <main className="mx-auto max-w-[1200px] px-5 py-10 sm:px-8 lg:px-12">

        {/* Back */}

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-500 transition hover:text-[#344a22]"
        >

          <span className="text-lg">
            ←
          </span>

          Back to Inventory

        </button>

        {/* Product */}

        <div className="grid overflow-hidden rounded-3xl border border-[#e7e4de] bg-white lg:grid-cols-2">

          {/* Image */}

          <div className="flex min-h-[450px] items-center justify-center bg-[#f3f1eb] p-8 lg:min-h-[600px]">

            {product.imageUrl ? (

              <img
                src={product.imageUrl}
                alt={product.name}
                className="h-full max-h-[550px] w-full object-contain"
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

          </div>

          {/* Details */}

          <div className="flex flex-col p-8 sm:p-10 lg:p-14">

            {/* Category */}

            {product.category && (

              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#789052]">
                {product.category}
              </span>

            )}

            {/* Name */}

            <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight text-[#344a22] sm:text-5xl">
              {product.name}
            </h1>

            {/* SKU */}

            {product.sku && (

              <div className="mt-3 text-xs text-stone-400">
                SKU: {product.sku}
              </div>

            )}

            {/* Price */}

            <div className="mt-8 border-y border-[#e7e4de] py-6">

              <div className="text-3xl font-semibold text-stone-800">

                {retailPrice.toLocaleString(
                  undefined,
                  {
                    style: 'currency',
                    currency: 'PHP',
                  }
                )}

              </div>

              <div className="mt-2 text-xs text-stone-400">
                Retail Price
              </div>

            </div>

            {/* Information */}

            <div className="mt-8 grid grid-cols-2 gap-4">

              <div className="rounded-xl bg-[#f7f6f2] p-4">

                <div className="text-[10px] font-semibold uppercase tracking-wider text-stone-400">
                  Material
                </div>

                <div className="mt-1 text-sm font-medium text-stone-700">
                  {product.material || '—'}
                </div>

              </div>

              <div className="rounded-xl bg-[#f7f6f2] p-4">

                <div className="text-[10px] font-semibold uppercase tracking-wider text-stone-400">
                  Supplier
                </div>

                <div className="mt-1 text-sm font-medium text-stone-700">
                  {product.supplier || '—'}
                </div>

              </div>

              <div className="rounded-xl bg-[#f7f6f2] p-4">

                <div className="text-[10px] font-semibold uppercase tracking-wider text-stone-400">
                  Stock
                </div>

                <div
                  className={`mt-1 text-sm font-semibold ${
                    Number(product.stock) <=
                    Number(product.minStockAlert)
                      ? 'text-red-500'
                      : 'text-[#344a22]'
                  }`}
                >
                  {product.stock || 0} units
                </div>

              </div>

              <div className="rounded-xl bg-[#f7f6f2] p-4">

                <div className="text-[10px] font-semibold uppercase tracking-wider text-stone-400">
                  Margin
                </div>

                <div className="mt-1 text-sm font-semibold text-[#344a22]">
                  {margin}%
                </div>

              </div>

            </div>

            {/* Status */}

            <div className="mt-8 flex items-center justify-between">

              <span className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                Status
              </span>

              <span
                className={`rounded-full px-3 py-1 text-[10px] font-semibold uppercase ${
                  product.status === 'active'
                    ? 'bg-green-100 text-green-700'
                    : product.status === 'low-stock'
                      ? 'bg-red-100 text-red-600'
                      : 'bg-stone-100 text-stone-500'
                }`}
              >
                {product.status || 'Active'}
              </span>

            </div>

            {/* Actions */}

            <div className="mt-auto flex gap-3 pt-10">

              <button
                type="button"
                className="flex-1 rounded-full bg-[#344a22] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-[#283a1a]"
              >
                Edit Product
              </button>

              <button
                type="button"
                onClick={() => navigate(-1)}
                className="rounded-full border border-stone-300 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-stone-600 transition hover:bg-stone-100"
              >
                Back
              </button>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}