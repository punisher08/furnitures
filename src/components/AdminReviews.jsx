import React, { useState, useEffect } from 'react';
import api from '../inc/API_BASE_URL';
import ProductEditor from './ProductEditor';
import { ArrowRight, Eye } from 'lucide-react';

const AdminReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedReview, setSelectedReview] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch reviews on mount (adjust endpoint as needed)
  useEffect(() => {
    
     let isMounted = true;
     const fetchReviews = async () => {
      try {
        setLoading(true);

        const response = await api.get('/reviews');

        if (!isMounted) {
          return;
        }

        

        console.log(response.data);
        
        setReviews(response.data.data);

      } catch (error) {
        console.error(
          'Failed to load guest products:',
          error
        );

        if (isMounted) {
          setProducts([]);
        }

      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await fetch('/api/reviews');
      const json = await response.json();
      if (json.success) {
        setReviews(json.data);
      }
    } catch (error) {
      console.error('Failed to load reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle status updates (e.g., approved, pending, rejected)
  const handleStatusChange = async (id, newStatus) => {
    try {
      const data = {
        id,
        status:newStatus,
        comment
      }
      const response = await api.put(`/reviews`,data);

      if (response.data.data) {
        setReviews((prev) =>
          prev.map((rev) => (rev.id === id ? { ...rev, status: newStatus, comment:comment } : rev))
        );
      }
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  // Handle opening review details modal
  const openEditModal = (review) => {
    setSelectedReview(review);
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center text-stone-500">
        Loading customer reviews...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1500px] px-5 py-8 sm:px-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-stone-200">
        <div>
          <h1 className="font-serif text-3xl text-stone-900">Customer Reviews</h1>
          <p className="text-sm text-stone-500 mt-1">Manage and moderate customer feedback across products.</p>
        </div>
        <div className="text-xs font-semibold uppercase tracking-wider text-[#344a22] bg-[#f0eee8] px-4 py-2 rounded-lg self-start">
          Total Reviews: {reviews.length}
        </div>
      </div>

      {/* Reviews Table */}
      <div className="mt-8 overflow-x-auto rounded-xl border border-stone-200 bg-white shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-stone-200 bg-stone-50 text-[11px] font-semibold uppercase tracking-wider text-stone-500">
              <th className="p-4">Rating</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Product ID</th>
              <th className="p-4">Review Summary</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100 text-sm text-stone-700">
            {reviews.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-8 text-center text-stone-400">
                  No reviews found.
                </td>
              </tr>
            ) : (
              reviews.map((rev) => (
                <tr key={rev.id} className="hover:bg-stone-50/50 transition">
                  <td className="p-4">
                    <span className="font-semibold text-amber-600">{'★'.repeat(rev.rating)}</span>
                    <span className="text-stone-300">{'★'.repeat(5 - rev.rating)}</span>
                  </td>
                  <td className="p-4 font-medium text-stone-900">
                    <div>{rev.name}</div>
                    <div className="text-xs text-stone-400 font-normal">{rev.email}</div>
                  </td>
                  <td className="p-4 text-xs font-mono text-stone-500">
                    <a className='flex flex-wrap  items-center justify-center gap-2 text-blue-700 hover:text-blue-300' href={`/product/${rev.product_id}`}>
                      {rev.product_name}
                      <ArrowRight size={12}  />
                      </a>
                  </td>
                  
                  <td className="p-4 max-w-xs truncate">
                    <div className="font-medium text-stone-800">{rev.title}</div>
                    <div className="test text-xs text-stone-500 truncate" dangerouslySetInnerHTML={{
                __html: rev.comment
              }}></div>
      
                  </td>
                  <td className="p-4">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        rev.status === 'approved'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : rev.status === 'rejected'
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {rev.status}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => openEditModal(rev)}
                      className="rounded-lg border border-stone-200 bg-white px-3 py-1.5 text-xs font-semibold text-stone-700 hover:border-stone-400 transition"
                    >
                      View
                    </button>
                    {rev.status !== 'approved' && (
                      <button
                        onClick={() => handleStatusChange(rev.id, 'approved')}
                        className="rounded-lg bg-[#344a22] px-3 py-1.5 text-xs font-semibold text-white hover:opacity-90 transition"
                      >
                        Approve
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Review Details Modal */}
      {isModalOpen && selectedReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="font-serif text-xl text-stone-900">Review Moderation</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-stone-400 hover:text-stone-600 text-sm font-semibold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-sm">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-stone-400">Customer</span>
                <p className="font-medium text-stone-900">{selectedReview.name} ({selectedReview.email})</p>
              </div>

              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-stone-400">Rating & Title</span>
                <p className="font-semibold text-stone-800">★ {selectedReview.rating}/5 — {selectedReview.title}</p>
              </div>

              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-stone-400">Comment</span>
                
                 <ProductEditor 
                 onChange={(e)=>{
                  setComment(e)
                 }} 
                 className="text-[11px] text-stone-500 leading-normal" value={selectedReview.comment}/>
              </div>

              {selectedReview.image_url && (
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-stone-400">Attached Media</span>
                  <div className="mt-2 h-24 w-24 overflow-hidden rounded-lg border border-stone-200">
                    <img src={selectedReview.image_url} alt="Review attachment" className="h-full w-full object-cover" />
                  </div>
                </div>
              )}

              <div className="pt-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-stone-400">Update Status</span>
                <div className="mt-2 flex gap-2">
                  <button
                    onClick={() => { handleStatusChange(selectedReview.id, 'approved'); setIsModalOpen(false); }}
                    className="flex-1 rounded-lg  py-2 bg-emerald-50 text-amber-700 border border-emerald-200 shadow hover:bg-emerald-700 hover:text-white  transition"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => { handleStatusChange(selectedReview.id, 'pending'); setIsModalOpen(false); }}
                    className="flex-1 rounded-lg bg-amber-50 text-amber-700 border border-amber-200 hover:text-white  hover:bg-amber-500"
        
                  >
                    Pending
                  </button>
                  <button
                    onClick={() => { handleStatusChange(selectedReview.id, 'rejected'); setIsModalOpen(false); }}
                    className="flex-1 rounded-lg bg-rose-50 text-amber-700 border border-rose-200 shadow hover:bg-rose-700 hover:text-white transition"
                  >
                    Reject
                  </button>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminReviews;