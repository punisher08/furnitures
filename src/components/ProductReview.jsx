import React, { useEffect, useState } from 'react';
import ReviewForm from './ReviewForm';
import axios from 'axios';

const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  'http://ignacio-server.test/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

const ProductReview = ({ product }) => {
  const [activeTab, setActiveTab] = useState('all');
  const [expandedReviews, setExpandedReviews] = useState({});
  const [isReviewFormVisible, setIsVisible] = useState(false);
  const [reviews, setProductReviews] = useState([]);

  // Fetch Reviews Effect
// Fetch Reviews Effect
  useEffect(() => {
    const fetchReviews = async (id) => {
      try {
        const response = await api.get(`/reviews/${id}`);
        console.log("API Response:", response.data);

        // Extract the actual array from response.data.data
        const reviewData = Array.isArray(response.data.data) 
          ? response.data.data 
          : Array.isArray(response.data) 
            ? response.data 
            : [];

        setProductReviews(reviewData);
      } catch (error) {
        console.error('Failed to load product reviews:', error);
        setProductReviews([]);
      }
    };

    const targetId = product?.id || 'chair-modern-001';
    if (targetId) {
      fetchReviews(targetId);
    }
  }, [product?.id]);

  /*
  |--------------------------------------------------------------------------
  | Photo Reviews
  |--------------------------------------------------------------------------
  */
  const photoReviews = reviews.filter(
    (review) => review.imageUrl || review.image_url
  );

  /*
  |--------------------------------------------------------------------------
  | Active Reviews
  |--------------------------------------------------------------------------
  */
  const visibleReviews =
    activeTab === 'photos' ? photoReviews : reviews;

  /*
  |--------------------------------------------------------------------------
  | Rating
  |--------------------------------------------------------------------------
  */
  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce(
            (total, review) =>
              total + Number(review.rating || 0),
            0
          ) / reviews.length
        ).toFixed(1)
      : '0.0';

  const ratingCount = (rating) =>
    reviews.filter(
      (review) => Number(review.rating) === rating
    ).length;

  const ratingPercentage = (rating) =>
    reviews.length
      ? Math.round(
          (ratingCount(rating) / reviews.length) * 100
        )
      : 0;

  /*
  |--------------------------------------------------------------------------
  | Toggle Review Image
  |--------------------------------------------------------------------------
  */
  const toggleReviewImage = (reviewId) => {
    setExpandedReviews((prev) => ({
      ...prev,
      [reviewId]: !prev[reviewId],
    }));
  };
  const handleOnSubmit = (data,formData) =>{
    console.log(data);
    console.log(formData);
    
  }

  /*
  |--------------------------------------------------------------------------
  | Stars
  |--------------------------------------------------------------------------
  */
  const renderStars = (rating, size = 'text-sm') => {
    return (
      <div className={`flex items-center gap-0.5 ${size}`}>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={
              star <= rating
                ? 'text-[#c89b45]'
                : 'text-stone-200'
            }
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <section className="bg-[#faf9f6] py-16 sm:py-20">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8 lg:px-10">

        {/* HEADER */}
        <div className="mb-10 text-center">
          <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#789052]">
            Customer Stories
          </span>
          <h2 className="mt-2 font-serif text-3xl font-medium tracking-tight text-[#344a22] sm:text-4xl">
            Reviews & Experiences
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[11px] leading-5 text-stone-500">
            Hear from customers who have welcomed this piece
            into their homes and spaces.
          </p>
        </div>

        {/* RATING SUMMARY */}
        <div className="grid overflow-hidden rounded-2xl border border-[#dedbd3] bg-white lg:grid-cols-[240px_1fr]">
          <div className="flex flex-col items-center justify-center border-b border-[#dedbd3] px-6 py-8 lg:border-b-0 lg:border-r">
            <div className="font-serif text-5xl text-[#344a22]">
              {averageRating}
            </div>
            <div className="mt-2">
              {renderStars(
                Math.round(Number(averageRating)),
                'text-base'
              )}
            </div>
            <div className="mt-2 text-[9px] text-stone-400">
              Based on {reviews.length} reviews
            </div>
          </div>

          <div className="flex flex-col justify-center px-6 py-8 sm:px-10">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div
                key={rating}
                className="mb-2 flex items-center gap-3 last:mb-0"
              >
                <span className="w-8 text-right text-[9px] text-stone-500">
                  {rating}
                </span>
                <span className="text-[12px] text-[#c89b45]">
                  ★
                </span>
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#eeeae2]">
                  <div
                    className="h-full rounded-full bg-[#789052] transition-all duration-500"
                    style={{
                      width: `${ratingPercentage(rating)}%`,
                    }}
                  />
                </div>
                <span className="w-8 text-[9px] text-stone-400">
                  {ratingCount(rating)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* REVIEW ACTIONS */}
        <div className="mt-8 flex flex-col items-start justify-between gap-5 py-5 sm:flex-row sm:items-center">
          <div>
            <h3 className="font-serif text-lg text-[#344a22]">
              See Our Previous Projects 
            </h3>
            <p className="mt-1 text-[9px] text-stone-400">
              Real experiences from our furniture community.
            </p>
          </div>

          <button
            onClick={() => setIsVisible(!isReviewFormVisible)}
            type="button"
            className="rounded-full bg-[#344a22] px-6 py-3 text-[9px] font-semibold uppercase tracking-wider text-white transition hover:bg-[#283a1a]"
          >
            {isReviewFormVisible ? 'Close Form' : 'Write a Review'}
          </button>
        </div>
        
        {/* WRITE A REVIEW FORM CONTAINER */}
        {isReviewFormVisible && (
          <div className="mt-6 mb-8">
            <ReviewForm product={product} />
          </div>
        )}

        {/* TABS */}
        <div className="mt-7 flex items-center gap-7 border-b border-[#dedbd3]">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`relative pb-3 text-[12px] font-semibold transition ${
              activeTab === 'all'
                ? 'text-[#344a22]'
                : 'text-stone-400 hover:text-[#344a22]'
            }`}
          >
            All Reviews
            <span className="ml-1.5 text-[10px] text-stone-400">
              {reviews.length}
            </span>
            {activeTab === 'all' && (
              <span className="absolute bottom-0 left-0 h-[2px] w-full rounded-full bg-[#344a22]" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('photos')}
            className={`relative flex items-center gap-1.5 pb-3 text-[12px] font-semibold transition ${
              activeTab === 'photos'
                ? 'text-[#344a22]'
                : 'text-stone-400 hover:text-[#344a22]'
            }`}
          >
            Photo Reviews
            <span className="text-[10px] text-stone-400">
              {photoReviews.length}
            </span>
            {activeTab === 'photos' && (
              <span className="absolute bottom-0 left-0 h-[2px] w-full rounded-full bg-[#344a22]" />
            )}
          </button>
        </div>

        {/* REVIEWS CONTENT LIST */}
        {activeTab === 'photos' ? (
          photoReviews.length > 0 ? (
            <div className="mt-8 columns-1 gap-5 sm:columns-2 lg:columns-3">
              {photoReviews.map((review) => {
                const imgSource = review.imageUrl || review.image_url;
                return (
                  <div
                    key={review.id}
                    className="group mb-5 break-inside-avoid overflow-hidden rounded-2xl border border-[#dedbd3] bg-white"
                  >
                    <div className="relative overflow-hidden bg-[#f5f3ee]">
                      <img
                        src={imgSource}
                        alt={`${review.name}'s review`}
                        className="block h-auto w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                        loading="lazy"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="mt-8 rounded-2xl border border-dashed border-[#dedbd3] bg-white px-6 py-14 text-center">
              <h3 className="mt-4 font-serif text-lg text-[#344a22]">
                No photo reviews yet
              </h3>
            </div>
          )
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-3">
            {visibleReviews.length > 0 ? (
              visibleReviews.map((review) => {
                const imgSource = review.imageUrl || review.image_url;
                const hasImage = Boolean(imgSource);
                const isExpanded = Boolean(expandedReviews[review.id]);

                return (
                  <article
                    key={review.id}
                    className="rounded-2xl border border-[#dedbd3] bg-white p-6 transition sm:p-7"
                  >
                    <div className="flex flex-col justify-between gap-4 sm:flex-row">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#eef1e8] font-serif text-sm text-[#344a22]">
                          {review.name?.charAt(0)?.toUpperCase()}
                        </div>
                        <div>
                          <div className="text-[12px] font-semibold text-stone-700">
                            {review.name}
                          </div>
                          <div className="mt-0.5 flex items-center gap-1 text-[10px] text-stone-400">
                            <span className="flex h-3 w-3 items-center justify-center rounded-full bg-[#789052] text-[7px] text-white">
                              ✓
                            </span>
                            Verified customer
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {renderStars(Number(review.rating), 'text-md')}
                        <span className="text-[10px] text-stone-400">
                          {review.date}
                        </span>
                      </div>
                    </div>

                    <div className="mt-5 border-t border-[#eeeae2] pt-5">
                      <h4 className="font-serif text-base font-medium text-[#344a22]">
                        {review.title}
                      </h4>
                      <p className="mt-2 max-w-3xl text-[12px] leading-5 text-stone-500">
                        {review.comment}
                      </p>
                    </div>

                    {hasImage && (
                      <div className="mt-5">
                        {isExpanded && (
                          <div className="mb-3 overflow-hidden rounded-xl border border-[#eeeae2] bg-[#f5f3ee]">
                            <img
                              src={imgSource}
                              alt={`${review.name}'s review`}
                              className="max-h-[420px] w-full object-cover"
                              loading="lazy"
                            />
                          </div>
                        )}
                        <button
                          type="button"
                          onClick={() => toggleReviewImage(review.id)}
                          className="group flex items-center gap-2 text-[9px] font-semibold text-[#344a22]"
                        >
                          <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#dedbd3] bg-[#faf9f6]">
                            {isExpanded ? '−' : '⌕'}
                          </span>
                          {isExpanded ? 'Hide photo' : 'See customer photo'}
                        </button>
                      </div>
                    )}
                  </article>
                );
              })
            ) : (
              <div className="rounded-2xl border border-dashed border-[#dedbd3] bg-white px-6 py-14 text-center lg:col-span-3">
                <h3 className="font-serif text-lg text-[#344a22]">
                  No reviews yet
                </h3>
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  );
};

export default ProductReview;