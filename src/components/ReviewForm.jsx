import React, { useRef, useState } from 'react';

const ReviewForm = ({ product, onCancel, onSubmit }) => {
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: 0,
    title: '',
    comment: '',
    image: null,
  });

  const [hoverRating, setHoverRating] = useState(0);
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});

  /*
  |--------------------------------------------------------------------------
  | Handle Input
  |--------------------------------------------------------------------------
  */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));
  };

  
  /*
  |--------------------------------------------------------------------------
  | Rating
  |--------------------------------------------------------------------------
  */

  const handleRating = (rating) => {
    setFormData((prev) => ({
      ...prev,
      rating,
    }));

    setErrors((prev) => ({
      ...prev,
      rating: '',
    }));
  };

  /*
  |--------------------------------------------------------------------------
  | Image Upload
  |--------------------------------------------------------------------------
  */

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrors((prev) => ({
        ...prev,
        image: 'Please select a valid image file.',
      }));

      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        image: 'Image must be smaller than 5MB.',
      }));

      return;
    }

    setFormData((prev) => ({
      ...prev,
      image: file,
    }));

    setImagePreview(URL.createObjectURL(file));

    setErrors((prev) => ({
      ...prev,
      image: '',
    }));
  };

  /*
  |--------------------------------------------------------------------------
  | Remove Image
  |--------------------------------------------------------------------------
  */

  const removeImage = () => {
    setFormData((prev) => ({
      ...prev,
      image: null,
    }));

    setImagePreview(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Validation
  |--------------------------------------------------------------------------
  */

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email.';
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.rating) {
      newErrors.rating = 'Please select a rating.';
    }

    if (!formData.title.trim()) {
      newErrors.title = 'Please add a review title.';
    }

    if (!formData.comment.trim()) {
      newErrors.comment = 'Please write your review.';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  /*
  |--------------------------------------------------------------------------
  | Submit
  |--------------------------------------------------------------------------
  */

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    /*
    |--------------------------------------------------------------------------
    | FormData
    |--------------------------------------------------------------------------
    |
    | This is ready for:
    |
    | POST /reviews
    |
    */

    const data = new FormData();

    data.append('productId', product?.id || '');
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('rating', formData.rating);
    data.append('title', formData.title);
    data.append('comment', formData.comment);

    if (formData.image) {
      data.append('image', formData.image);
    }

    /*
    |--------------------------------------------------------------------------
    | Pass to parent
    |--------------------------------------------------------------------------
    */

    if (onSubmit) {
      onSubmit(data, formData);
      console.log(data);
      console.log(formData);
      
    }

    console.log('Review submitted:', {
      productId: product?.id,
      ...formData,
    });
  };

  /*
  |--------------------------------------------------------------------------
  | Star Labels
  |--------------------------------------------------------------------------
  */

  const ratingLabels = {
    1: 'Poor',
    2: 'Fair',
    3: 'Good',
    4: 'Very Good',
    5: 'Excellent',
  };

  return (
    <section className="bg-[#faf9f6] py-3">

      <div className="mx-auto max-w-[900px] ">
        {/* =====================================================
            FORM
        ====================================================== */}

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-[#dedbd3] bg-white p-6 sm:p-8 lg:p-10"
        >

          {/* ===================================================
              CUSTOMER INFORMATION
          ==================================================== */}

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

            {/* Name */}

            <div>

              <label className="mb-2 block text-[9px] font-semibold uppercase tracking-wider text-stone-500">
                Your Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Sarah Mitchell"
                className={`w-full rounded-lg border bg-[#faf9f6] px-4 py-3 text-[10px] text-stone-700 outline-none transition placeholder:text-stone-300 focus:border-[#789052] focus:ring-1 focus:ring-[#789052] ${
                  errors.name
                    ? 'border-red-300'
                    : 'border-[#dedbd3]'
                }`}
              />

              {errors.name && (
                <p className="mt-1.5 text-[8px] text-red-500">
                  {errors.name}
                </p>
              )}

            </div>


            {/* Email */}

            <div>

              <label className="mb-2 block text-[9px] font-semibold uppercase tracking-wider text-stone-500">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className={`w-full rounded-lg border bg-[#faf9f6] px-4 py-3 text-[10px] text-stone-700 outline-none transition placeholder:text-stone-300 focus:border-[#789052] focus:ring-1 focus:ring-[#789052] ${
                  errors.email
                    ? 'border-red-300'
                    : 'border-[#dedbd3]'
                }`}
              />

              {errors.email && (
                <p className="mt-1.5 text-[8px] text-red-500">
                  {errors.email}
                </p>
              )}

            </div>

          </div>


          {/* ===================================================
              RATING
          ==================================================== */}

          <div className="mt-7 border-t border-[#eeeae2] pt-7">

            <label className="block text-[9px] font-semibold uppercase tracking-wider text-stone-500">
              Your Rating
            </label>

            <div className="mt-3 flex items-center gap-3">

              <div className="flex items-center gap-1">

                {[1, 2, 3, 4, 5].map((star) => {

                  const active =
                    star <=
                    (hoverRating || formData.rating);

                  return (
                    <button
                      key={star}
                      type="button"
                      onClick={() =>
                        handleRating(star)
                      }
                      onMouseEnter={() =>
                        setHoverRating(star)
                      }
                      onMouseLeave={() =>
                        setHoverRating(0)
                      }
                      className={`text-2xl leading-none transition ${
                        active
                          ? 'text-[#c89b45]'
                          : 'text-stone-200'
                      }`}
                      aria-label={`${star} star`}
                    >
                      ★
                    </button>
                  );
                })}

              </div>

              {(hoverRating || formData.rating) > 0 && (
                <span className="text-[9px] text-stone-400">
                  {
                    ratingLabels[
                      hoverRating || formData.rating
                    ]
                  }
                </span>
              )}

            </div>

            {errors.rating && (
              <p className="mt-2 text-[8px] text-red-500">
                {errors.rating}
              </p>
            )}

          </div>


          {/* ===================================================
              REVIEW
          ==================================================== */}

          <div className="mt-7 border-t border-[#eeeae2] pt-7">

            {/* Title */}

            <div>

              <label className="mb-2 block text-[9px] font-semibold uppercase tracking-wider text-stone-500">
                Review Title
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Beautiful and incredibly comfortable"
                className={`w-full rounded-lg border bg-[#faf9f6] px-4 py-3 text-[10px] text-stone-700 outline-none transition placeholder:text-stone-300 focus:border-[#789052] focus:ring-1 focus:ring-[#789052] ${
                  errors.title
                    ? 'border-red-300'
                    : 'border-[#dedbd3]'
                }`}
              />

              {errors.title && (
                <p className="mt-1.5 text-[8px] text-red-500">
                  {errors.title}
                </p>
              )}

            </div>


            {/* Comment */}

            <div className="mt-5">

              <div className="mb-2 flex items-center justify-between">

                <label className="text-[9px] font-semibold uppercase tracking-wider text-stone-500">
                  Your Review
                </label>

                <span className="text-[8px] text-stone-300">
                  {formData.comment.length}/1000
                </span>

              </div>

              <textarea
                name="comment"
                value={formData.comment}
                onChange={(e) => {
                  if (e.target.value.length <= 1000) {
                    handleChange(e);
                  }
                }}
                rows={6}
                placeholder="Tell us about the quality, comfort, design, delivery, or anything else you loved about your purchase..."
                className={`w-full resize-none rounded-lg border bg-[#faf9f6] px-4 py-3 text-[10px] leading-5 text-stone-700 outline-none transition placeholder:text-stone-300 focus:border-[#789052] focus:ring-1 focus:ring-[#789052] ${
                  errors.comment
                    ? 'border-red-300'
                    : 'border-[#dedbd3]'
                }`}
              />

              {errors.comment && (
                <p className="mt-1.5 text-[8px] text-red-500">
                  {errors.comment}
                </p>
              )}

            </div>

          </div>


          {/* ===================================================
              PHOTO UPLOAD
          ==================================================== */}

          <div className="mt-7 border-t border-[#eeeae2] pt-7">

            <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">

              <div>

                <label className="block text-[9px] font-semibold uppercase tracking-wider text-stone-500">
                  Add a Photo
                  <span className="ml-1 font-normal text-stone-300">
                    (Optional)
                  </span>
                </label>

                <p className="mt-1 text-[8px] text-stone-400">
                  Share a photo of this piece in your home.
                </p>

              </div>

              <span className="text-[8px] text-stone-300">
                JPG, PNG or WEBP · Max 5MB
              </span>

            </div>


            {/* Image Preview */}

            {imagePreview ? (

              <div className="relative mt-4 w-full overflow-hidden rounded-xl border border-[#dedbd3] bg-[#f5f3ee] sm:w-[280px]">

                <img
                  src={imagePreview}
                  alt="Review preview"
                  className="h-[220px] w-full object-cover"
                />

                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-stone-500 shadow-sm transition hover:bg-white hover:text-red-500"
                  aria-label="Remove image"
                >
                  ×
                </button>

                <div className="absolute bottom-0 left-0 right-0 bg-black/40 px-3 py-2 text-[8px] text-white">
                  {formData.image?.name}
                </div>

              </div>

            ) : (

              <button
                type="button"
                onClick={() =>
                  fileInputRef.current?.click()
                }
                className="mt-4 flex w-full flex-col items-center justify-center rounded-xl border border-dashed border-[#cfcac0] bg-[#faf9f6] px-5 py-10 text-center transition hover:border-[#789052] hover:bg-[#f6f7f2]"
              >

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#eef1e8] text-[#789052]">

                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="h-5 w-5"
                  >
                    <rect
                      x="3"
                      y="5"
                      width="18"
                      height="14"
                      rx="2"
                    />

                    <circle
                      cx="8.5"
                      cy="10"
                      r="1.5"
                    />

                    <path d="m21 15-5-5L5 19" />

                  </svg>

                </div>

                <span className="mt-3 text-[9px] font-semibold text-[#344a22]">
                  Upload a customer photo
                </span>

                <span className="mt-1 text-[8px] text-stone-400">
                  Click to browse your files
                </span>

              </button>

            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleImageChange}
              className="hidden"
            />

            {errors.image && (
              <p className="mt-2 text-[8px] text-red-500">
                {errors.image}
              </p>
            )}

          </div>


          {/* ===================================================
              NOTE
          ==================================================== */}

          <div className="mt-7 rounded-lg bg-[#f7f6f2] px-4 py-3">

            <div className="flex gap-2">

              <span className="text-[10px] text-[#789052]">
                ✓
              </span>

              <p className="text-[8px] leading-4 text-stone-400">
                Your review helps other customers make better
                decisions. Reviews are published after moderation.
                Your email address will never be displayed publicly.
              </p>

            </div>

          </div>


          {/* ===================================================
              ACTIONS
          ==================================================== */}

          <div className="mt-7 flex flex-col-reverse gap-3 border-t border-[#eeeae2] pt-7 sm:flex-row sm:justify-end">

            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="rounded-full border border-stone-300 px-7 py-3 text-[9px] font-semibold uppercase tracking-wider text-stone-500 transition hover:bg-stone-50"
              >
                Cancel
              </button>
            )}

            <button
              type="submit"
              className="rounded-full bg-[#344a22] px-8 py-3 text-[9px] font-semibold uppercase tracking-wider text-white transition hover:bg-[#283a1a]"
            >
              Submit Review
            </button>

          </div>

        </form>

      </div>

    </section>
  );
};

export default ReviewForm;