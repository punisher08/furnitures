import React, {
  useEffect,
  useState,
} from 'react';

import {
  useNavigate,
  useParams,
} from 'react-router-dom';

// import api from '../utils/storage';
import axios from 'axios';
import Header from '../layouts/Header';

import {
  Search,
  X,
  Plus,
  Minus,
  RotateCcw,
} from 'lucide-react';
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://ignacio-server.test/api';

export default function SingleProduct() {

  /*
  |--------------------------------------------------------------------------
  | ROUTER
  |--------------------------------------------------------------------------
  */

  const {
    id,
  } = useParams();

  const navigate = useNavigate();


  /*
  |--------------------------------------------------------------------------
  | PRODUCT STATE
  |--------------------------------------------------------------------------
  */

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
  | IMAGE PREVIEW STATE
  |--------------------------------------------------------------------------
  */

  const [
    isImagePreviewOpen,
    setIsImagePreviewOpen,
  ] = useState(false);

  const [
    imageZoom,
    setImageZoom,
  ] = useState(1);


  /*
  |--------------------------------------------------------------------------
  | OPEN IMAGE PREVIEW
  |--------------------------------------------------------------------------
  */

  const openImagePreview = () => {

    setImageZoom(1);

    setIsImagePreviewOpen(true);

  };


  /*
  |--------------------------------------------------------------------------
  | CLOSE IMAGE PREVIEW
  |--------------------------------------------------------------------------
  */

  const closeImagePreview = () => {

    setIsImagePreviewOpen(false);

    setImageZoom(1);

  };


  /*
  |--------------------------------------------------------------------------
  | ZOOM IN
  |--------------------------------------------------------------------------
  */

  const zoomIn = () => {

    setImageZoom((prev) =>
      Math.min(3, Number((prev + 0.25).toFixed(2)))
    );

  };


  /*
  |--------------------------------------------------------------------------
  | ZOOM OUT
  |--------------------------------------------------------------------------
  */

  const zoomOut = () => {

    setImageZoom((prev) =>
      Math.max(1, Number((prev - 0.25).toFixed(2)))
    );

  };


  /*
  |--------------------------------------------------------------------------
  | RESET ZOOM
  |--------------------------------------------------------------------------
  */

  const resetZoom = () => {

    setImageZoom(1);

  };


  /*
  |--------------------------------------------------------------------------
  | MOUSE WHEEL ZOOM
  |--------------------------------------------------------------------------
  */

  const handleImageWheel = (e) => {

    e.preventDefault();

    if (e.deltaY < 0) {

      setImageZoom((prev) =>
        Math.min(3, Number((prev + 0.1).toFixed(2)))
      );

    } else {

      setImageZoom((prev) =>
        Math.max(1, Number((prev - 0.1).toFixed(2)))
      );

    }

  };


  /*
  |--------------------------------------------------------------------------
  | LOAD PRODUCT
  |--------------------------------------------------------------------------
  */


  const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  useEffect(() => {

    const fetchProduct = async () => {

      try {

        setLoading(true);

        setError(null);

        const response =
          await api.get(
            `/product/${id}`
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
      <div className="min-h-screen bg-[#faf9f6]">

        <Header />

        <div className="px-6 py-12">

          <div className="mx-auto max-w-[1200px]">

            <div className="rounded-2xl border border-[#e7e4de] bg-white p-12 text-center">

              <div className="text-sm font-medium text-stone-500">
                Loading product...
              </div>

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

      <div className="min-h-screen bg-[#faf9f6]">

        <Header />

        <div className="px-6 py-12">

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

      </div>

    );

  }


  /*
  |--------------------------------------------------------------------------
  | PRODUCT DATA
  |--------------------------------------------------------------------------
  */

  const retailPrice =
    Number(product.retailPrice || product.price || 0);

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
  | SAFE PRODUCT DATA
  |--------------------------------------------------------------------------
  */

  const dimensions =
    product.dimensions || {};

  const width =
    dimensions.width ?? product.width ?? '-';

  const depth =
    dimensions.depth ?? product.depth ?? '-';

  const height =
    dimensions.height ?? product.height ?? '-';

  const imageUrl =
    product.imageUrl ||
    product.image ||
    product.thumbnail ||
    product.photo ||
    '';


  /*
  |--------------------------------------------------------------------------
  | MAIN
  |--------------------------------------------------------------------------
  */

  return (

    <div>

      <Header />


      <div className="single-product-template min-h-screen bg-[#faf9f6] text-stone-700">

        <main className="mx-auto max-w-[1180px] px-5 py-8 sm:px-8 lg:px-10">


          {/* =========================================================
              BACK
          ========================================================= */}

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mb-8 flex items-center gap-2 text-[11px] font-medium text-stone-500 transition hover:text-[#344a22]"
          >

            <span className="text-base">
              ←
            </span>

            Back to Collection

          </button>


          {/* =========================================================
              PRODUCT
          ========================================================= */}

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">


            {/* =======================================================
                PRODUCT IMAGE
            ======================================================= */}

            <div className="relative">

              <div className="relative aspect-[1/1] overflow-hidden rounded-2xl bg-[#eeeae2]">


                {/* IMAGE */}

                {imageUrl ? (

                  <button
                    type="button"
                    onClick={openImagePreview}
                    className="group relative block h-full w-full cursor-zoom-in"
                    aria-label={`Inspect ${product.name}`}
                  >

                    <img
                      src={imageUrl}
                      alt={product.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                      referrerPolicy="no-referrer"
                    />


                    {/* Dark overlay */}

                    <div
                      className="
                        absolute
                        inset-0
                        bg-black/0
                        transition
                        duration-300
                        group-hover:bg-black/10
                      "
                    />


                    {/* Inspect Image Button */}

                    <span
                      className="
                        absolute
                        bottom-4
                        right-4
                        flex
                        items-center
                        gap-2
                        rounded-full
                        bg-white/95
                        px-3
                        py-2
                        text-[11px]
                        font-semibold
                        text-stone-700
                        opacity-0
                        shadow-lg
                        transition
                        duration-300
                        group-hover:opacity-100
                      "
                    >

                     <Search className="h-4 w-4" />

                      Inspect Image

                    </span>

                  </button>

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


                {/* ===================================================
                    WISHLIST
                =================================================== */}

                <button
                  type="button"
                  onClick={(e) => e.stopPropagation()}
                  className="
                    absolute
                    right-3
                    top-3
                    z-10
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-stone-200
                    bg-white/95
                    text-stone-600
                    shadow-sm
                    transition
                    hover:bg-white
                    hover:text-[#344a22]
                  "
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


                {/* ===================================================
                    IMAGE COUNTER
                =================================================== */}

                <div className="pointer-events-none absolute bottom-3 left-3 rounded-full bg-[#344a22] px-2.5 py-1 text-[12px] font-medium text-white">

                  1/1

                </div>


              </div>

            </div>


            {/* =========================================================
                PRODUCT DETAILS
            ========================================================= */}

            <div className="flex flex-col">


              {/* CATEGORY */}

              {product.category && (

                <span className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#789052]">

                  {product.category}

                </span>

              )}


              {/* PRODUCT NAME */}

              <h1 className="mt-2 font-serif text-3xl font-semibold leading-tight text-[#18230f] sm:text-4xl">

                {product.name}

              </h1>


              {/* RATING */}

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


              {/* PRICE */}

              <div className="mt-5 flex items-center gap-3">

                <span className="text-2xl font-semibold text-[#151a11]">

                  {retailPrice.toLocaleString(
                    undefined,
                    {
                      style: 'currency',
                      currency: 'PHP',
                    }
                  )}

                </span>


               {retailPrice > 0 && (
  <span className="text-xs text-stone-400 line-through">
    {(retailPrice * 1.20).toLocaleString(undefined, {
      style: 'currency',
      currency: 'PHP',
    })}
  </span>
)}

              </div>


              {/* STOCK NOTICE */}

              <div className="mt-5 rounded-md border border-dashed border-[#789052] bg-[#f3f5ed] px-3 py-2.5">

                <div className="flex items-center gap-2 text-[12px] text-[#344a22]">

                  <span className="h-1.5 w-1.5 rounded-full bg-[#789052]" />

                  <span>

                    Only {product.stock || 0} items remaining —
                    custom order available.

                  </span>

                </div>

              </div>


              {/* DESCRIPTION */}

              <div className="mt-5 text-[12px] leading-5 text-stone-500"
               dangerouslySetInnerHTML={{
                __html: product.description,
              }}>

               

              </div>


              {/* =====================================================
                  FINISH
              ===================================================== */}

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


                <div className="mt-1 text-[12px] text-stone-400">

                  White Bouclé

                </div>

              </div>


              {/* =====================================================
                  DIMENSIONS
              ===================================================== */}

              <div className="mt-5 grid grid-cols-4 overflow-hidden rounded-lg border border-[#dedbd3]">

                <div className="border-r border-[#dedbd3] px-3 py-2.5">

                  <div className="text-[12px] uppercase text-stone-400">
                    Width
                  </div>

                  <div className="mt-0.5 text-[12px] font-semibold text-stone-700">

                    {width} cm

                  </div>

                </div>


                <div className="border-r border-[#dedbd3] px-3 py-2.5">

                  <div className="text-[12px] uppercase text-stone-400">
                    Depth
                  </div>

                  <div className="mt-0.5 text-[12px] font-semibold text-stone-700">

                    {depth} cm

                  </div>

                </div>


                <div className="border-r border-[#dedbd3] px-3 py-2.5">

                  <div className="text-[12px] uppercase text-stone-400">
                    Height
                  </div>

                  <div className="mt-0.5 text-[12px] font-semibold text-stone-700">

                    {height} cm

                  </div>

                </div>


                <div className="px-3 py-2.5">

                  <div className="text-[12px] uppercase text-stone-400">
                    Origin
                  </div>

                  <div className="mt-0.5 text-[12px] font-semibold text-stone-700">
                    PH Certified
                  </div>

                </div>

              </div>


              {/* =====================================================
                  SHIPPING INFO
              ===================================================== */}

              <div className="mt-3 rounded-lg border border-[#dedbd3] bg-white">

                <div className="space-y-2 px-4 py-3">

                  <div className="flex items-center gap-2 text-[12px] text-stone-500">

                    <span className="text-[#789052]">
                      ▣
                    </span>

                    Free shipping on orders 25,000+

                  </div>


                  <div className="flex items-center gap-2 text-[12px] text-stone-500">

                    <span className="text-[#789052]">
                      ↻
                    </span>

                    Support

                  </div>


                  <div className="flex items-center gap-2 text-[12px] text-stone-500">

                    <span className="text-[#789052]">
                      ♧
                    </span>

                    Secure payment guaranteed

                  </div>

                </div>

              </div>


              {/* =====================================================
                  CRAFTSMANSHIP
              ===================================================== */}

         <div className="mt-5 rounded-lg border border-[#dedbd3] bg-white">

  <div className="space-y-3 px-4 py-4">

    {/* Step 1 */}
    <div className="flex gap-3">

      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#344a22] text-[12px] font-bold text-white">
        1
      </div>

      <div>

        <div className="text-[12px] font-semibold text-[#344a22]">
          Wood Selection & Preparation
        </div>

        <div className="mt-0.5 text-[12px] text-stone-400">
          Quality wood carefully selected and prepared in our workshop.
        </div>

      </div>

    </div>


    {/* Step 2 */}
    <div className="flex gap-3">

      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#344a22] text-[12px] font-bold text-white">
        2
      </div>

      <div>

        <div className="text-[12px] font-semibold text-[#344a22]">
          Handcrafted & Finished
        </div>

        <div className="mt-0.5 text-[12px] text-stone-400">
          Carefully assembled, sanded, and finished by skilled local craftsmen.
        </div>

      </div>

    </div>


    {/* Step 3 */}
    <div className="flex gap-3">

      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#344a22] text-[12px] font-bold text-white">
        3
      </div>

      <div>

        <div className="text-[12px] font-semibold text-[#344a22]">
          Made to Order
        </div>

        <div className="mt-0.5 text-[12px] text-stone-400">
          Completion time depends on the design, materials, and current workshop schedule.
        </div>

      </div>

    </div>

  </div>

</div>


              {/* =====================================================
                  BOTTOM ACTIONS
              ===================================================== */}

              <div className="mt-3 flex gap-2">

                <button
                  onClick={() => {
                    window.open(
                      'https://www.facebook.com/Checkbread',
                      '_blank',
                      'noopener,noreferrer'
                    );
                  }}
                  type="button"
                  className="flex-1 rounded-full bg-[#344a22] px-5 py-3 text-[12px] font-semibold text-white transition hover:bg-[#283a1a]"
                >

                  Visit Facebook Page

                </button>

              </div>

            </div>

          </div>


          {/* =========================================================
              TRUST / FEATURES BAR
          ========================================================= */}

          <div className="mt-12 grid grid-cols-1 border-y border-[#dedbd3] sm:grid-cols-2 lg:grid-cols-4">


            <div className="flex items-center gap-3 border-b border-[#dedbd3] px-5 py-5 sm:border-r lg:border-b-0">

              <span className="text-[#789052]">
                ♧
              </span>

              <div>

                <div className="text-[12px] font-semibold uppercase text-stone-600">
                  Sustainably Sourced
                </div>

                <div className="mt-1 text-[7px] text-stone-400">
                  FSC-certified natural timber
                </div>

              </div>

            </div>


            <div className="flex items-center gap-3 border-b border-[#dedbd3] px-5 py-5 lg:border-b-0 lg:border-r">

              <span className="text-[#789052]">
                ⚒
              </span>

              <div>

                <div className="text-[12px] font-semibold uppercase text-stone-600">
                  Handcrafted
                </div>

                <div className="mt-1 text-[7px] text-stone-400">
                  Built by master artisans
                </div>

              </div>

            </div>


            <div className="flex items-center gap-3 border-b border-[#dedbd3] px-5 py-5 sm:border-r lg:border-b-0">

              <span className="text-[#789052]">
                ▣
              </span>

              <div>

                <div className="text-[12px] font-semibold uppercase text-stone-600">
                  Free Delivery
                </div>

                <div className="mt-1 text-[7px] text-stone-400">
                  On orders over $500
                </div>

              </div>

            </div>


            <div className="flex items-center gap-3 px-5 py-5">

              <span className="text-[#789052]">
                ↻
              </span>

              <div>

                <div className="text-[12px] font-semibold uppercase text-stone-600">
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


      {/* =============================================================
          IMAGE INSPECT / ZOOM MODAL
      ============================================================= */}

      {isImagePreviewOpen && imageUrl && (

        <div
          className="
            fixed
            inset-0
            z-[9999]
            flex
            items-center
            justify-center
            bg-black/90
            p-4
          "
          onClick={closeImagePreview}
        >


          {/* =========================================================
              TOP CONTROLS
          ========================================================= */}

          <div
            className="
              absolute
              left-5
              top-5
              z-20
              flex
              items-center
              gap-2
            "
          >

            <div
              className="
                rounded-full
                bg-white/95
                px-3
                py-2
                text-[11px]
                font-semibold
                text-stone-700
                shadow-lg
              "
            >

              {product.name}

            </div>

          </div>


          {/* =========================================================
              CLOSE BUTTON
          ========================================================= */}

          <button
            type="button"
            onClick={(e) => {

              e.stopPropagation();

              closeImagePreview();

            }}
            className="
              absolute
              right-5
              top-5
              z-30
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-full
              bg-white/95
              text-stone-900
              shadow-xl
              transition
              hover:bg-white
              hover:scale-105
            "
            aria-label="Close image preview"
          >

            <X className="h-5 w-5" />

          </button>


          {/* =========================================================
              IMAGE AREA
          ========================================================= */}

          <div
            className="
              flex
              max-h-[85vh]
              max-w-[90vw]
              items-center
              justify-center
              overflow-auto
            "
            onClick={(e) => e.stopPropagation()}
            onWheel={handleImageWheel}
          >

            <img
              src={imageUrl}
              alt={product.name}
              draggable="false"
              onDoubleClick={() => {

                if (imageZoom === 1) {

                  setImageZoom(2);

                } else {

                  setImageZoom(1);

                }

              }}
              style={{
                transform: `scale(${imageZoom})`,
                transformOrigin: 'center center',
              }}
              className="
                max-h-[80vh]
                max-w-[85vw]
                select-none
                object-contain
                rounded-lg
                transition-transform
                duration-200
                ease-out
              "
              referrerPolicy="no-referrer"
            />

          </div>


          {/* =========================================================
              ZOOM CONTROLS
          ========================================================= */}

          <div
            className="
              absolute
              bottom-6
              left-1/2
              z-30
              -translate-x-1/2
              flex
              items-center
              gap-1
              rounded-xl
              bg-white/95
              p-1
              shadow-2xl
            "
            onClick={(e) => e.stopPropagation()}
          >


            {/* ZOOM OUT */}

            <button
              type="button"
              onClick={zoomOut}
              disabled={imageZoom <= 1}
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-lg
                text-stone-700
                transition
                hover:bg-stone-100
                disabled:cursor-not-allowed
                disabled:opacity-30
              "
              aria-label="Zoom out"
            >

              <Minus className="h-4 w-4" />

            </button>


            {/* ZOOM LEVEL */}

            <button
              type="button"
              onClick={resetZoom}
              className="
                flex
                h-10
                min-w-[60px]
                items-center
                justify-center
                rounded-lg
                px-2
                text-[11px]
                font-semibold
                text-stone-700
                transition
                hover:bg-stone-100
              "
              title="Reset zoom"
            >

              {Math.round(imageZoom * 100)}%

            </button>


            {/* ZOOM IN */}

            <button
              type="button"
              onClick={zoomIn}
              disabled={imageZoom >= 3}
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-lg
                text-stone-700
                transition
                hover:bg-stone-100
                disabled:cursor-not-allowed
                disabled:opacity-30
              "
              aria-label="Zoom in"
            >

              <Plus className="h-4 w-4" />

            </button>


            {/* RESET */}

            <div className="mx-1 h-6 w-px bg-stone-200" />

            <button
              type="button"
              onClick={resetZoom}
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-lg
                text-stone-600
                transition
                hover:bg-stone-100
              "
              title="Reset zoom"
            >

              <RotateCcw className="h-4 w-4" />

            </button>

          </div>


          {/* =========================================================
              HELP TEXT
          ========================================================= */}

          <div
            className="
              absolute
              bottom-20
              left-1/2
              -translate-x-1/2
              whitespace-nowrap
              text-[10px]
              text-white/60
            "
          >

            Scroll to zoom · Double-click to zoom · Click outside to close

          </div>


        </div>

      )}

    </div>

  );

}